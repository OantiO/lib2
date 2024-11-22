import { User } from 'src/auth/schemas/user.schema';
import { Category } from 'src/category/schemas/category';
import { Orders } from 'src/order/schema/order';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// export enum Category2 {
//   ADVENTURE = 'Adventure',
//   CALSSICS = 'Classics',
//   CRIME = 'Crime',
//   FANTASY = 'Fantasy',
// }

@Entity({})
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;
  
  @Column()
  description: string;
  
  @Column()
  author: string;
  
  @Column()
  price: number;

  // @Column()
  // categoryId: Number;
  
  @ManyToOne(() => User, (user) => user.books)
  user: User;
  
  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Orders, (orders) => orders.book)
  @JoinTable()
  order: Orders[];
}
