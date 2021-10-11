import { Document } from 'mongoose';

export class Category extends Document {
  categoryID: string;
  name: string;
  description: string;
  subcategories: Record<any, any>;
  categoryImage: string;
}
