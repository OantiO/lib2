import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsEmpty()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  readonly categoryId: string[];

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
