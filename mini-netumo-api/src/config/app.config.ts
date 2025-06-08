import { config } from 'dotenv';
config();

export const appConfig = {
  appName: process.env.APP_NAME || 'nestjs',

  baseUrl: process.env.APP_URL || 'http://localhost:3000',

  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,

  environment: process.env.APP_ENV || 'production',
};
