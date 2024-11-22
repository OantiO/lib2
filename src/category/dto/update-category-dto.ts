import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsNumber()
  @IsNotEmpty()
  readonly ageFilter: number;

  @IsEmpty()
  book;
}
