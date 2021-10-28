import { IsEmail, IsNotEmpty } from "class-validator";
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
  phone?: string;
  name?: string;
  lastname?: string;
  birthday?: Date;
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

export class SocialNetworkRegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  @Transform((value: string) => value?.replace(" ", ""))
  contacts: {
    email: string;
  };
  userMain: {
    firstName: string;
    lastName: string;
  };

  birthday?: Date;
  sex?: string;
  phone?: string;
  address1?: string;
  address2?: string;
}
