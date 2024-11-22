import { Book } from 'src/book/schemas/book.schema';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  ageFilter: number;

  @ManyToMany(() => Book, (book) => book.categories)
  @JoinTable()
  books: Book[];
}
