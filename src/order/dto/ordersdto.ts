import { IsEmpty, IsNotEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { Book } from "src/book/schemas/book.schema";

export class OrdersDto{

    // @IsEmpty()
    // date_time_with_timezone: Date;

    @IsNotEmpty()
    readonly bookId: number[];
    
    @IsEmpty()
    totalPrice: number;
    
    @IsEmpty()
    user: User;
    
    @IsEmpty()
    book: Book[]
}