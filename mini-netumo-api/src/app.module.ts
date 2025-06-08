import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDefaultConnection } from './database/connection';
import { BullModule } from '@nestjs/bull';
import { redisConfig } from './config/redis.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MonitorModule } from './modules/monitor/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getDefaultConnection()),

    BullModule.forRoot({
      redis: redisConfig.bullQueue,
      defaultJobOptions: {
        lifo: true,
        attempts: 15,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    }),
    UsersModule,
    AuthModule,
    MonitorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
