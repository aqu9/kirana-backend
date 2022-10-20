import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({enum:['Kg','Litre','Packets']})
  type_of_quantity:string;

  @Prop() 
  is_packed_item: boolean;

  @Prop()
  description: string;

  @Prop()
  additional_field: string;

  @Prop()
  is_visible : boolean;

  @Prop({ enum:['grocerry','dairy','toiletries','others']})
  category:  string;

  @Prop()
  keywords: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
