import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT, 10),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsTableName: 'migrations',
  synchronize: true, // This should be false as the ideal is to use migrations, but for this hometext purpose it will be true
  entities: [
    __dirname + '/src/**/entities/*.entity{.ts,.js}',
    __dirname + '/src/**/*.entity{.ts,.js}',
  ],
  migrations: [join(__dirname, '/src/migrations/*{.ts,.js}')],
};

export { config };
export default new DataSource(config);
