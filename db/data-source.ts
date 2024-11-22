import { User } from 'src/auth/schemas/user.schema';
import { Book } from 'src/book/schemas/book.schema';
import { Orders } from 'src/order/schema/order';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(<string>process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USERNAME,
  entities: [User, Book,Orders],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
