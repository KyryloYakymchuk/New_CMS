import { IsEmail, IsNotEmpty } from "class-validator";
import exp from "constants";
import { Transform } from "class-transformer";

export class LoginDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  @Transform((value: string) => value?.replace(" ", ""))
  email: string;
  @IsNotEmpty()
  @Transform((value: string) => value?.replace(" ", ""))
  password: string;
  firstName: string;
  phone?: string;
  lastName: string;
  sex?: string;
  address1?: string;
  address2?: string;
}

export class NewPasswordDTO {
  @IsNotEmpty()
  token: string;
  @IsNotEmpty()
  @Transform((value: string) => value?.replace(" ", ""))
  newPassword: string;
  @IsNotEmpty()
  @Transform((value: string) => value?.replace(" ", ""))
  newPasswordConfirm: string;
}

export class EmailDTO {
  @IsEmail()
  email: string;
}

export class UserIDDTO {
  @IsNotEmpty()
  userID: string;
}

export class GoogleRegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  @Transform((value: string) => value?.replace(" ", ""))
  email: string;
  name?: string;
}

export class UserDTO {

  password: string;
  userMain?: {
    firstName: string;
    lastName: string;
    birthday: Date;
    sex: string;
  }

  contacts?: {
    email: string;
    phone: string;
  }

  shippingAddress?:{
    address1: string;
    address2: string;
  }

  orders?: Array<any>;

  wishlist?: Array<any>;

  viewed?: Array<any>;

  comments?: Array<any>;
}