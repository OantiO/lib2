import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { OrdersController } from './order.controller';
import { Orders } from './schema/order';
import { OrderService } from './order.services';


@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Orders])],
  providers: [OrderService],
  controllers: [OrdersController],
})
export class OrdersModule {}
