import { Document } from "mongoose";

export interface Page extends Document {
  pageID: string;
  alias: string;
  content: string;
  pageTitle: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  menuTitle: string;
}
