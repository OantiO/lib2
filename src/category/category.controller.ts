import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthenticationGard } from '../auth/Roles/roles.guard';
import { CreateCategoryDto } from './dto/create-category-dto';
import { SelectOneCategory } from './dto/select-one-category';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { Role } from 'src/auth/Roles/role.enum';
import { Roles } from 'src/auth/Roles/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/newcategory')
  @Roles(Role.admin)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return {
        success: true,
        newCategory,
        message: 'newCategory Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async GetCategorys(@Query() query: SelectOneCategory) {
    return this.categoryService.findoneorall(query);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGard)
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const changed = await this.categoryService.updateCategory(
        +id,
        updateCategoryDto,
      );
      return {
        success: true,
        changed,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
