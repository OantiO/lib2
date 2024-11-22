import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Orders } from './schema/order';
import { Book } from '../book/schemas/book.schema';
import { OrdersDto } from './dto/ordersdto';
import dataSource from 'db/data-source';
import { title } from 'process';

@Injectable()
export class OrderService {
    constructor(
    @InjectRepository(Orders)
    // private bookRepo: Repository<Book>,
    private ordersRepository: Repository<Orders>,
    ){}


    async create(orderDto: OrdersDto): Promise<Orders> {
        const newOrder = await this.ordersRepository.create(orderDto);
        newOrder.book = orderDto.bookId.map((id) => ({
            ...new Book(),
            id,
                }));
        for (const sumer in orderDto.bookId){
            console.log("sumer:", orderDto.bookId[sumer])
            let bookIds = parseInt(sumer);
            console.log("numbrik",typeof bookIds, bookIds)
            console.log("sumer",typeof sumer, sumer)

            const users = await dataSource
            .getRepository(Book)
            .createQueryBuilder("book")
            .getMany()
            console.log("summer",Book);
            console.log("lastone:", users)
                }

        return await this.ordersRepository.save(newOrder);
    }

}