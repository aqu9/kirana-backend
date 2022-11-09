import { IsNumber,IsEnum, IsNotEmpty, IsString, IsBoolean ,IsArray} from "class-validator";
import { categories,typeOfQuantity } from "database_Manager";
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
    @IsString()
    @IsEnum(categories)
    category: string;

    @IsNotEmpty()
    @IsArray()
    keywords: string[];

}
