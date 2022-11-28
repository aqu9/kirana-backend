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
  //   if(Object.keys(query).length===0)
  //   return await this.productModel.find().limit(5)

  //   const queryParam =[];

  //  if(query.name){
  //  queryParam.push({name:{"$regex":query.name,"$options":"i"}})
  //  }

  //   if(query.category){
  //   	queryParam.push({category:{"$regex":query.category,"$options":"i"}})
  //   }

  //   const product=await this.productModel.find({"$or": queryParam})
  //   if(product.length===0){
  //     throw new NotFoundException('Data Not Found');
  //   }
  //   return product;

// =========================================================================================================================================================
console.log("get call")
const pageSize = query.pageSize ? parseInt(query.pageSize) :2
const search = query.search ? query.search : ""
const page = query.page? parseInt(query.page) : 1
const skip = pageSize * (page - 1)
const dbQuery = [{
  $lookup: {
    from: "categories",
    localField: "category",
    foreignField: "_id",
    as: "category"
  }
}, {
  $unwind: {
    path: "$category",
    preserveNullAndEmptyArrays: true
  }
}, {
  $lookup: {
    from: "categories",
    localField: "category.parentCategory",
    foreignField: "_id",
    as: "category.parentCategory",
  }
},
  {
    $match: {
      $or:[
        {name: { $regex: search,  $options: "i", }},
        {"category.categoryName": { $regex: search,  $options: "i", }},
        {"category.parentCategory.categoryName": { $regex: search,  $options: "i", }},

      ]
    },
  },
  {
      $project: {
        _id: 1,
        name: 1,
        rating: 1,
        price: 1,
        stock: 1,
        logo_link: 1,
        type_of_quantity: 1,
        description: 1,
        additional_field: 1,
        is_visible: 1,
        is_veg: 1,
        imageLink:1,
       "category.categoryName":1,
       "category.parentCategory.categoryName":1
      }
}, { '$facet'    : {
  metadata: [ { $count: "total" }, { $addFields: { page: page} } ],
  data: [ { $skip: skip}, { $limit: pageSize } ] // add projection here wish you re-shape the docs
} }
]

let product
  const queryResult=await this.productModel.aggregate(dbQuery)
  product = queryResult[0]
  product.metadata = queryResult[0].metadata[0]
  product.metadata.noOfPage = Math.ceil(product.metadata.total  / pageSize)
  return product






//=============================================================================================================================


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
