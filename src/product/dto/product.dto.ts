import { IsNumber,IsEnum, IsNotEmpty, IsString, IsBoolean ,IsArray} from "class-validator";

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
    @IsEnum(['Kg','Litre','Packets'])
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
    @IsEnum(['grocerry','dairy','toiletries','others','soft drinks','instant food','cooking essential'])
    category: string;

    @IsNotEmpty()
    @IsArray()
    keywords: string[];

}
