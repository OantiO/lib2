import { Module } from '@nestjs/common';
import { Category } from './schemas/category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
