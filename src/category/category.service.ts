import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThan, Not, Repository } from 'typeorm';
import { Category } from './schemas/category';
import { CreateCategoryDto } from './dto/create-category-dto';
import { SelectOneCategory } from './dto/select-one-category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async findoneorall(finderData: SelectOneCategory) {
    const { id, name, rating, ageFilter, younger, older } = finderData;
    const findeCategory: FindOptionsWhere<Category> = {
      ...(id ? { id } : {}),
      ...(name ? { name } : {}),
      ...(rating ? { rating } : {}),
      ...(ageFilter ? { ageFilter } : {}),
      ...(younger ? { ageFilter: Not(MoreThan(younger)) } : {}),
      ...(older ? { ageFilter: MoreThan(older) } : {}),
    };

    return this.categoryRepository.find({
      where: findeCategory,
    });
  }

  async updateCategory(id: number, dataUpdate: CreateCategoryDto) {
    const categorySelect = await this.categoryRepository.findOneBy({ id });
    const categoryChange = this.categoryRepository.merge(
      categorySelect,
      dataUpdate,
    );
    return await this.categoryRepository.save(categoryChange);
  }
}
