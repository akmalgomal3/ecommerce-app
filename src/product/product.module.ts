import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity/product.entity';
import { User } from '../user/entities/user.entity/user.entity';
import { LogModule } from '../log/log.module'; // Pastikan pathnya benar

@Module({
  imports: [  // Pastikan ProductModule mengimpor TypeOrmModule untuk Product dan User
    TypeOrmModule.forFeature([Product, User]),  // Mengimpor entitas Product dan User
    LogModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
