import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './schemas/book.schema';
import { FindOptionsWhere, MoreThan, Not, Repository } from 'typeorm';
import { UpdateBookDto } from '../book/dto/update-book.dto';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { FinedNonDto } from './dto/findenondto';
import { Category } from 'src/category/schemas/category';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const bookData = await this.bookRepository.create(createBookDto);
    bookData.categories = createBookDto.categoryId.map((id) => ({
      ... new Category(),
      id,
    }));

    console.log("book:",bookData)
    return this.bookRepository.save(bookData);
  }

  // async findAll(): Promise<Book[]> {
  //   return this.bookRepository.find();
  // }

  async findOne(id: number): Promise<Book> {
    const bookData = await this.bookRepository.findOneBy({ id });
    console.log("sag seah")
    if (!bookData) {
      throw new HttpException('book not found', 404);
    }
    return bookData;
  }

  async updateBook(id: number, UpdateBookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.findOne(id);
    const bookData = this.bookRepository.merge(existingBook, UpdateBookDto);
    return await this.bookRepository.save(bookData);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async finedNon(non: FinedNonDto) {
    const {
      title,
      id,
      author,
      categoryId,
      price,
      lowerPrice,
      higherPrice,
      userId,
    } = non;
    const nonFind: FindOptionsWhere<Book> = {
      ...(title ? { title } : {}),
      ...(id ? { id } : {}),
      ...(author ? { author } : {}),
      ...(categoryId ? {} : {}),
      ...(price ? { price } : {}),
      ...(lowerPrice ? { price: MoreThan(lowerPrice) } : {}),
      ...(higherPrice ? { price: Not(MoreThan(higherPrice)) } : {}),
      ...(userId ? { userId } : {}),
    };

    return this.bookRepository.find({
      where: nonFind,
    });
  }
}
