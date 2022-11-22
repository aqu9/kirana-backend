import { Injectable, ForbiddenException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { isValidObjectId, Model, Types  } from 'mongoose';
import { ProductDocument,CategoryDocumnt, Category } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';
import { kMaxLength } from 'buffer';

@Injectable()
export class ProductService {
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>, @InjectModel('Category') private readonly categoryModel: Model<CategoryDocumnt>) {}

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
    // console.log(body)
    const categories = new this.categoryModel(body)
    console.log(categories,"catgories")
    if(!categories)
    {
      throw new UnprocessableEntityException("Something Went Wrong, Please try again after some time");
    }
    const test =await categories.save();
    console.log(test,"--> yee walaa");
    return test;
   }

   async updateCategory(body, id){
        const updateCats = await this.categoryModel.findByIdAndUpdate({_id:id},{...body},{new : true});
        return updateCats.save();

  }

   async getAllCategories(){
    return await this.categoryModel.find()
   }

   async getSubCategoryByCategoryId(id,level){
    console.log(id,level);
    const query = [
      
        {
          $match: {parentCategory: new Types.ObjectId(id)} 
          
        }
        ,
      
      {
        $lookup: {
          from: 'categories',
          localField: "parentCategory",
          foreignField: "_id",
          as: "parentCategory",
        }
        
      }
    ]
    const cateegory = await this.categoryModel.aggregate(query);
    console.log(cateegory);
    return cateegory;
   }

   async getAllParentCategory()
   {
    return await this.categoryModel.find({ parentCategory: { $exists: true,$type: 'array', $eq: [] } });
   }

   async getProductByCategoryId(id){
    const query = [ 
      {
        $match: {category: new Types.ObjectId(id)} 
        
      }
    ];
    return await this.productModel.aggregate(query);
   }

}
