import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity/product.entity';
import { User } from '../user/entities/user.entity/user.entity'; // Pastikan pathnya benar
import { LogService } from '../log/log.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // Menggunakan repository untuk akses DB
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Menggunakan repository untuk akses User
    private readonly logService: LogService,
  ) {}

  async createProduct(
    name: string,
    description: string,
    price: number,
    sellerId: number,
  ) {
    const seller = await this.userRepository.findOne({
      where: { id: sellerId },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    const product = this.productRepository.create({
      name,
      description,
      price,
      seller,
    });
    await this.logService.saveLog(
      'user-activity-logs',
      `User ${sellerId} (${seller.username}) created product ${product.name}`,
      sellerId,
    );

    return this.productRepository.save(product); // Simpan produk ke database
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async purchaseProduct(buyerId: number, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Logika pembelian
    await this.logService.saveLog(
      'user-activity-logs',
      `User ${buyerId} purchased product ${product.name}`,
      buyerId,
    );
    return { buyerId, productId }; // Ini hanya contoh
  }
}
