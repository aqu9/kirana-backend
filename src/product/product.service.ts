import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductDocument,CategoryDocumnt } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>, @InjectModel('category') private readonly categoryModel: Model<CategoryDocumnt>) {}

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

   if(query.name){
   queryParam.push({name:{"$regex":query.name,"$options":"i"}})
   }

    if(query.category){
    	queryParam.push({category:{"$regex":query.category,"$options":"i"}})
    }

    const product=await this.productModel.find({"$or": queryParam})
    if(product.length===0){
      throw new NotFoundException('Data Not Found');
    }
    return product;
   }

   async addCategories(body:any) {
    console.log(body)
    try {
      const categories = new this.categoryModel(body)
      console.log(categories,"catgories")
      return categories.save()
      
    } catch (error) {
        console.log(error)
    }
   }
}
