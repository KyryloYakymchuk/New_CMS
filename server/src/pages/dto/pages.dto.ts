import { IsNotEmpty } from "class-validator";
import { Page } from "../../types/page";

export class GetPagesDTO {
  alias?: string;
  name?: string;
  offset?: number;
  limit?: number;
}

export class AddPageDTO {
  @IsNotEmpty()
  alias: string;
  pageTitle: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  menuTitle: string;
}

export class EditPageDTO {
  @IsNotEmpty()
  pageID: string;
  content?: string;
  alias?: string;
  pageTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  menuTitle?: string;
}

export class DeletePageDTO {
  pageID: string;
}

export class CreatePageDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly alias: string;
  @IsNotEmpty()
  readonly content: string;
}

export class UpdatePageDto {
  readonly name: string;
  readonly alias: string;
  readonly content: string;
}

export class ResponsePageDto {
  constructor(page: Page) {
    this.pageID = page.pageID;
    this.alias = page.alias;
    this.content = page.content;
    this.pageTitle = page.pageTitle;
    this.seoKeywords = page.seoKeywords;
    this.seoDescription = page.seoDescription;
    this.seoTitle = page.seoTitle;
    this.menuTitle = page.menuTitle;
  }
  readonly pageID: string;
  readonly alias: string;
  readonly content: string;
  readonly pageTitle: string;
  readonly seoKeywords: string;
  readonly seoDescription: string;
  readonly seoTitle: string;
  readonly menuTitle: string;
}

export class PaginationDTO {
  offset?: number;
  limit?: number;
}
