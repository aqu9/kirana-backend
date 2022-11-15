import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as mongoSchema } from 'mongoose';

export type CategoryDocumnt = Category & Document;

@Schema()
export class Category {
  @Prop()
  categoryName: string;

  @Prop()
  categoryImageLink: string;

  @Prop({ type: mongoSchema.Types.ObjectId, ref: 'category', required:false})
  parentCategory: [this][];
}

export const categorySchema = SchemaFactory.createForClass(Category);
