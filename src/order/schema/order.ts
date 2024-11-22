import { User } from "src/auth/schemas/user.schema";
import { Book } from "src/book/schemas/book.schema";
import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({})
export class Orders {
    @PrimaryGeneratedColumn()
    id : number;

    // @Column({ type: 'timestamptz' }) // Recommended
    // date_time_with_timezone: Date;

    // @ManyToMany(() => User, (user) => user.order)
    // @JoinTable()
    // user: User[];

    @Column()
    totalPrice: number;

    @ManyToMany(() => Book, (book) => book.order)
    @JoinTable()
    book: Book[];

    @ManyToOne(() => User, (user) => user.order)
    user: User;
}