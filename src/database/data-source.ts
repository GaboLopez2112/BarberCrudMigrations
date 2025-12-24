import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5430,
  username: 'admin',
  password: 'admin',
  database: 'relationscrud',

  entities: [__dirname + '/../schemas/*.schema.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],

  synchronize: false,
  logging: true,
};
export const AppDataSource = new DataSource(dataSourceOptions);
