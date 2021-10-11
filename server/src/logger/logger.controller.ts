import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { GetLogsDTO } from "./dto/logger.dto";
import { LoggerGateway } from "../shared/logger/logger.gateway";
import { AuthGuard } from "@nestjs/passport";

@Controller("logger")
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getLogs(@Query() userDTO: GetLogsDTO) {
    return this.loggerService.getLogs(userDTO);
  }
}
