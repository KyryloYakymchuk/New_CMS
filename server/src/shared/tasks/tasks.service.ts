import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Log } from "../../types/log";

@Injectable()
export class TasksService {
  constructor(@InjectModel("Log") private logModel: Model<Log>) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron("0 0 1 2 *")
  async deleteLogs(): Promise<void> {
    await this.logModel.deleteMany();
    this.logger.debug("Logs was deleted!");
  }
}
