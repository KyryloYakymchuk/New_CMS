import { IsNotEmpty } from "class-validator";

export class EditUserDTO {
  @IsNotEmpty()
  userID: string;
  password?: string;
  group?: string;
  phone?: string;
  name?: string;
  lastname?: string;
  birthday?: Date;
}

export class DeleteUserDTO {
  userID: string;
}
