import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const DEFAULT_CONNECTION = 'default';

type ExtendedDataSourceOptions = DataSourceOptions & {
  connectionLabel?: string;
  seeds?: string[];
  factories?: string[];
};

export const getConnections = (): ExtendedDataSourceOptions[] => [
  {
    connectionLabel: DEFAULT_CONNECTION,

    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, '/../**/*.entity.{ts,js}')],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
];

export const getDefaultConnection = (): ExtendedDataSourceOptions => {
  const found = getConnections().find(
    (conn) => conn.connectionLabel === DEFAULT_CONNECTION,
  );
  if (!found) {
    throw new Error(`No connection found with label ${DEFAULT_CONNECTION}`);
  }
  return found;
};
