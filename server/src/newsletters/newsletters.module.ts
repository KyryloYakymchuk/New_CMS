import { Module } from "@nestjs/common";
import { NewslettersController } from "./newsletters.controller";
import { NewslettersService } from "./newsletters.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "../shared/shared.module";
import { UserSchema } from "../models/user.schema";
import { GroupSchema } from "../models/group.schema";
import { JobSchema } from "../models/job.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Job", schema: JobSchema },
      { name: "User", schema: UserSchema },
      { name: "Group", schema: GroupSchema },
    ]),
    SharedModule,
  ],
  controllers: [NewslettersController],
  providers: [NewslettersService],
})
export class NewslettersModule {}
