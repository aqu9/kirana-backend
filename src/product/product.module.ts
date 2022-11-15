import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, categorySchema } from 'database_Manager';
import { config } from 'dotenv';

config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'product', schema: ProductSchema },{ name: 'category', schema: categorySchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
