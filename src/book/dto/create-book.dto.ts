import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Category } from 'src/category/schemas/category';
import { Orders } from 'src/order/schema/order';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty({ message: 'what is your name author' })
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
    readonly categoryId: number [];

  @IsEmpty({ message: 'we need your id' })
  user: User;

  @IsEmpty()
  categories: Category[];

  // @IsEmpty()
  // sell: Orders[];
}
