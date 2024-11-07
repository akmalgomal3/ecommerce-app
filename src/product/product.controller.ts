import {
  Request,
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard) // Guard untuk melindungi rute ini
  @Post('create')
  async create(
    @Request() req,
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
    },
  ) {
    return this.productService.createProduct(
      body.name,
      body.description,
      body.price,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('purchase')
  async purchase(@Request() req, @Body() body: { productId: number }) {
    return this.productService.purchaseProduct(req.user.id, body.productId);
  }
}
