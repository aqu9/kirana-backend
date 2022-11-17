import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as mongoSchema } from 'mongoose';
import { categories,typeOfQuantity } from 'database_Manager/category.config';
import { Category } from './categories';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  rating: number;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop()
  logo_link: string;

  @Prop({enum:typeOfQuantity})
  type_of_quantity:string;

  @Prop() 
  is_packed_item: boolean;

  @Prop()
  description: string;

  @Prop()
  additional_field: string;

  @Prop()
  is_visible : boolean;
  
  @Prop()
  is_veg: boolean;


  @Prop({ type: [mongoSchema.Types.ObjectId], ref: 'Category', required:true})
  category: Category[];

  @Prop()
  keywords: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
