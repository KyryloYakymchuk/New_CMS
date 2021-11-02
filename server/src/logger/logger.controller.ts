import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { LoggerService } from "./logger.service";
import { GetLogsDTO } from "./dto/logger.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("logger")
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  async getLogs(@Query() userDTO: GetLogsDTO): Promise<Record<string, any>> {
    return this.loggerService.getLogs(userDTO);
  }
}
