import { IsNotEmpty } from 'class-validator';
import {Page} from "../../types/page";

export class GetPagesDTO {
  alias?: string;
  name?: string;
}

export class AddPageDTO {
  @IsNotEmpty()
  alias: string;
  @IsNotEmpty()
  name: string;
  content?: string;
}

export class EditPageDTO {
  @IsNotEmpty()
  alias: string;
  name?: string;
  content?: string;
}

export class DeletePageDTO {
  @IsNotEmpty()
  alias: string;
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
    this.id = page.id;
    this.name = page.name;
    this.alias = page.alias;
    this.content = page.content;
  }
  readonly id: string;
  readonly name: string;
  readonly alias: string;
  readonly content: string;
}