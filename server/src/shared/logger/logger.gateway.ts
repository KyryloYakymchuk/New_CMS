import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Injectable, Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { Request } from "express";

import { LoggerService } from "../../logger/logger.service";

@Injectable()
@WebSocketGateway()
export class LoggerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private loggerService: LoggerService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("LoggerGateway");

  async logAction(req: Request, module: string): Promise<void> {
    const payload = { req, module };
    const newLog = await this.loggerService.saveLog(payload);
    this.server.emit("msgToClient", newLog);
  }

  afterInit(server: Server): void {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]): void {
    client.emit("connect-to-serv", "connected successs");
    this.logger.log(`Client connected: ${client.id}`);
  }
}
