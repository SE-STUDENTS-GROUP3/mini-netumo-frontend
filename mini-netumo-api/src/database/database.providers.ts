import { DataSource } from 'typeorm';
import { DEFAULT_CONNECTION, getDefaultConnection } from './connection';

export const AppDataSource = new DataSource(getDefaultConnection());

export const databaseProviders = [
  {
    provide: DEFAULT_CONNECTION,
    useFactory: async () => {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      return AppDataSource;
    },
  },
];
