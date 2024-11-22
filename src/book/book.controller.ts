import {
  Request,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

//import { AuthGuard } from '@nestjs/passport';
import { AuthenticationGard } from 'src/auth/Roles/roles.guard';
import { AuthenticationGard2 } from './Authors.id/AuthorGard';
import { FinedNonDto } from './dto/findenondto';
import { Role } from 'src/auth/Roles/role.enum';
import { Roles } from 'src/auth/Roles/roles.decorator';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthenticationGard2)
  async create(@Body() createBookDto: CreateBookDto, @Request() req) {
    try {
      const autherInformation = req.user;
      const autherId = autherInformation.id;
      createBookDto.user = autherId;

      const newBook =  await this.bookService.createBook(createBookDto);

      return {
        success: true,
        newBook,
        message: 'book Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    try {
      const data = await this.bookService.findOne(+id);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  @Roles(Role.admin)
  @UseGuards(AuthenticationGard)
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      const bookUpdate = await this.bookService.updateBook(+id, updateBookDto);
      return {
        //success: true,
        bookUpdate,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Roles(Role.admin)
  @UseGuards(AuthenticationGard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    try {
      await this.bookService.remove(+id);
      return {
        success: true,
        message: 'book deleted Successfully',      
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
@Roles(Role.user)
  async GetNonBook(@Query() query: FinedNonDto) {
    return this.bookService.finedNon(query);
  }
}
