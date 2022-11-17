import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as mongoSchema } from 'mongoose';

export type CategoryDocumnt = Category & Document;

@Schema()
export class Category {
  @Prop()
  categoryName: string;

  @Prop()
  categoryImageLink: string;

  @Prop({ type: [mongoSchema.Types.ObjectId], ref: 'Category', required:false})
  parentCategory: Category[];
}

export const categorySchema = SchemaFactory.createForClass(Category);
