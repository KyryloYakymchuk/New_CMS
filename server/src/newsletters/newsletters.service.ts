import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

import { Job } from "../types/job";
import { QueryDTO } from "../shared/dto/shared.dto";
import { MailerService } from "../shared/mailer/mailer.service";
import { User } from "../types/user";
import { CreateJobDTO, GetJobDTO } from "./dto/newsletters.dto";

@Injectable()
export class NewslettersService {
  constructor(
    @InjectModel("Job") private jobModel: Model<Job>,
    @InjectModel("User") private userModel: Model<User>,
    private schedulerRegistry: SchedulerRegistry,
    private mailerService: MailerService
  ) {}

  async findJobByID(userDTO: GetJobDTO): Promise<Record<string, any>> {
    const job = await this.jobModel.findOne({ userDTO });

    if (!job) throw new HttpException("Job not found!", HttpStatus.NO_CONTENT);

    return job;
  }

  async findJobs(userDTO: QueryDTO): Promise<Record<string, any>> {
    const { limit, offset, sortField, sortParameter } = userDTO;

    const jobs = await this.jobModel
      .find()
      .sort({ [sortField]: sortParameter })
      .limit(!!limit ? limit : 10)
      .skip(!!offset ? offset : 0);

    if (!jobs)
      throw new HttpException("Jobs not found!", HttpStatus.NO_CONTENT);

    const jobsCount = await this.jobModel.find();

    return { count: jobsCount.length, jobs };
  }

  async createJob(userDTO: CreateJobDTO) {
    const { title, recipientUsers, recipientGroups } = userDTO;
    const job = await this.jobModel.findOne({ title });

    const date = new Date();
    const dateTime = date.getTime();
    const validTime = dateTime + 60 * 5 * 1000;

    if (dateTime > validTime)
      throw new HttpException(
        "Minimal timeout is 5 minutes",
        HttpStatus.BAD_REQUEST
      );

    if (job)
      throw new HttpException(
        "Job with this name is already exists",
        HttpStatus.CONFLICT
      );

    userDTO["date"] = date;

    const newJob = new this.jobModel(userDTO);
    await newJob.save();

    const mailerJob = new CronJob(date, () => {
      let recipientsStr: string;
      if (recipientUsers && recipientUsers.length) {
        recipientUsers.map(async (userID, idx) => {
          if (idx < 40) {
            const user = await this.userModel.findOne({ userID });
            if (!user)
              throw new HttpException(
                `Selected user ${userID} is not found!`,
                HttpStatus.BAD_REQUEST
              );

            recipientsStr += `${user.email} `;
          }
        });
      } else if (recipientGroups && recipientGroups.length) {
        recipientGroups.map(async (groupID, idx) => {
          if (idx < 40) {
          }
        });
      } else
        throw new HttpException(
          "You must choose recipients!",
          HttpStatus.CONFLICT
        );

      this.mailerService.sendMail({
        to: recipientsStr,
        subject: "test email",
        text: "<h1>here will be an email</h1>>",
      });
    });
  }
}
