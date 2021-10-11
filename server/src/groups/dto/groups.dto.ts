import { IsNotEmpty } from "class-validator";

export class AddGroupDTO {
  @IsNotEmpty()
  name: string;
  permissions?: any;
}

export class EditGroupDTO {
  @IsNotEmpty()
  groupID: string;
  name?: string;
  permissions?: any;
}

export class DeleteGroupDTO {
  groupID: string;
}

export class TokenDTO {
  @IsNotEmpty()
  token: string;
}
