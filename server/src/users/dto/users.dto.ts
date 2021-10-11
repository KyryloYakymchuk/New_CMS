import { IsNotEmpty } from "class-validator";
import { QueryDTO } from "../../shared/dto/shared.dto";
import { Transform } from "class-transformer";

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
