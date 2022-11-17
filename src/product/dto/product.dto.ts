import { IsNumber,IsEnum, IsNotEmpty, IsString, IsBoolean ,IsArray, IsOptional, IsMongoId, ArrayMinSize, ArrayUnique} from "class-validator";
import { categories,typeOfQuantity } from "database_Manager";
import { ObjectId, Schema as mongoSchema } from 'mongoose';

export class ProductDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    rating:number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: string;

    @IsString()
    logo_link?: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(typeOfQuantity)
    type_of_quantity: string;

    @IsString()
    description?: string;

    @IsString()
    additional_field: string;

    @IsNotEmpty()
    @IsBoolean()
    is_visible: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    is_veg: boolean;
    
    @IsNotEmpty()
    @IsMongoId({each:true})
    @ArrayMinSize(1)
    category: ObjectId[];

    @IsNotEmpty()
    @IsArray()
    keywords: string[];

}

export class CategoryDto{

    @IsNotEmpty()
    @IsString()
    categoryName: string;

    @IsNotEmpty()
    @IsString()
    categoryImageLink:string;

    @IsOptional()
    @IsMongoId({each: true})
    @ArrayUnique({each:true})
    @ArrayMinSize(0)
    parentCategory?: ObjectId[];



}
