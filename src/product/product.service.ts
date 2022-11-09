import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductDocument } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addProduct(body) {
    const createProduct  = new this.productModel(body);
    return createProduct.save();

  }
  
  async getAllProduct(query) {
    if(Object.keys(query).length===0)
    return await this.productModel.find().limit(5)

    const queryParam =[];

   //f(query.name){
   // queryParam.push({name:{"$regex":query.name,"$options":"i"}})
   //

    console.log(query);
    if(query.category){
    	queryParam.push({category:query.category})
    }
    console.log(queryParam);
    const product=await this.productModel.find({"$and": queryParam})
    if(product.length===0){
      throw new NotFoundException('Data Not Found');
    }
    return product;
   }
}
