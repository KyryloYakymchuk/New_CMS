import { IsNotEmpty } from "class-validator";
import { Request } from "express";
import { QueryDTO } from "../../shared/dto/shared.dto";

export class GetLogsDTO extends QueryDTO {
  from: string;
  to: string;
}

export class LoggerDTO {
  @IsNotEmpty()
  req: Request;
  @IsNotEmpty()
  module: string;
}
