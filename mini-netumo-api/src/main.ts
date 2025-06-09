import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { configService } from './config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/cors.config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    trustProxy: true,
    bodyLimit: 1024 * 1024 * 1024,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
  });

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    }),
  );

  const port = configService.getPort();
  const logger = new Logger('bootstrap');

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Mini Netumo API')
    .setDescription('Mini Netumo API.')
    .setVersion('1.0')
    .addTag('netumo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');
  logger.log(`Application started on port ${port}`);
}

void bootstrap();
