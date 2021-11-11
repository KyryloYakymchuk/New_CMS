import { IsNotEmpty, IsNotIn } from "class-validator";

export class AddGroupDTO {
  @IsNotEmpty()
  @IsNotIn(["Admin", "User"])
  name: string;
  permissions?: any;
}

export class EditGroupDTO {
  @IsNotEmpty()
  groupID: string;
  @IsNotIn(["Admin", "User"])
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
