import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Book } from 'src/book/schemas/book.schema';
import { Orders } from 'src/order/schema/order';
//import { Role } from '../Roles/role.enum';
export type UserRoleType = 'admin' | 'user';
@Entity({})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  age: number;
  
  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;
  
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
  
  @OneToMany(() => Orders, (order) => order.user)
  order: Orders[];

  @Column('enum', {
    enum: ['admin', 'user'],
    array: true,
  })
  role: UserRoleType[];
}
