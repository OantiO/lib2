import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { AuthenticationGard } from './auth/Roles/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { dataSourceOptions } from '../db/data-source';
import { User } from './auth/schemas/user.schema';
import { Book } from './book/schemas/book.schema';
import { CategoryModule } from './category/category.module';
import { Category } from './category/schemas/category';
import { OrdersModule } from './order/order.module';
import { Orders } from './order/schema/order';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USERNAME,
      entities: [User, Book, Category, Orders],
      synchronize: true,
    }),

    JwtModule.register({
      global: true,
      secret: 'ASDMKLAMDKLSAMDKLSAMDKLSAMDLKMASLDMSALMDL',
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BookModule,
    AuthModule,
    CategoryModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationGard],
})
export class AppModule {}
