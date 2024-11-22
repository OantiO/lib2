import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Request,
    UseGuards,
  } from '@nestjs/common';
import { OrdersDto } from './dto/ordersdto';
import { BookController } from 'src/book/book.controller';
import { Book } from 'src/book/schemas/book.schema';
import { BookService } from 'src/book/book.service';
import { AuthenticationGard } from 'src/auth/Roles/roles.guard';
import { Roles } from 'src/auth/Roles/roles.decorator';
import { Role } from 'src/auth/Roles/role.enum';
import { OrderService } from './order.services';
import { User } from 'src/auth/schemas/user.schema';
import { AuthenticationGard2 } from 'src/book/Authors.id/AuthorGard';

  @Controller('orders')
  export class OrdersController {
    constructor(private OrderService: OrderService){}

    // @Post()
    // @Roles(Role.user)
    // @UseGuards(AuthenticationGard2)
    // async 


    @Post()
    @Roles(Role.user)
    @UseGuards(AuthenticationGard2)
    async create(@Body() orderDto: OrdersDto, @Request() req) {
      try {
        const profile = req.user;
        const userId = profile.id;
        orderDto.user = userId;
        console.log("info order", orderDto)
        const orderInfo =  this.OrderService.create(orderDto);
        return{
          success: true,
          orderInfo,
          message: 'we take your order',

        }
      } catch (error) {
        return {
          success: false,
          message: "we soof sorry"
        };
      }
      }
       
      
  }