import { IsNotEmpty } from "class-validator";

export class EditVariantsDTO {
  @IsNotEmpty()
  variantID: string;
  itemID: string;
  name?: string;
  quantity?: string;
  werehouse?: string;
  price?: string;
  discount?: string;
  tax?: string;
}

export class AddVariantDTO {
  @IsNotEmpty()
  itemID: string;
}

export class DeleteVariantDTO {
  @IsNotEmpty()
  variantID: string;
  @IsNotEmpty()
  itemID: string;
}
