import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

import { Job } from "../types/job";
import { QueryDTO } from "../shared/dto/shared.dto";
import { MailerService } from "../shared/mailer/mailer.service";
import { User } from "../types/user";
import {
  CreateJobDTO,
  DeleteJobDTO,
  EditJobDTO,
  GetJobDTO,
} from "./dto/newsletters.dto";

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

  async createJob(userDTO: CreateJobDTO): Promise<string> {
    const { name, date, letter } = userDTO;
    let { recipientUsers, recipientGroups } = userDTO;
    const allRecipientUsers = userDTO.recipientUsers;
    const allRecipientGroups = userDTO.recipientGroups;
    const job = await this.jobModel.findOne({ name });

    const dateTime = new Date(date).getTime();
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
    while (allRecipientUsers?.length > 0 || allRecipientGroups?.length > 0) {
      recipientUsers = allRecipientUsers?.splice(0, 40);
      recipientGroups = allRecipientGroups?.splice(0, 40);
      let j = 0;
      const task = new CronJob("*/1 * * * *", async () => {
        if (j == 0) task.stop();
        if (recipientUsers && recipientUsers.length) {
          let i = 0;
          for (const recipient in recipientUsers) {
            if (i < 40 && recipientUsers.hasOwnProperty(recipient)) {
              const user = await this.userModel.findOne({
                userID: recipientUsers[recipient],
              });
              if (!user)
                throw new HttpException(
                  `Selected user ${recipientUsers[recipient]} is not found!`,
                  HttpStatus.BAD_REQUEST
                );
              await this.mailerService.sendMail({
                from: '"CMS" <ochkodym@gmail.com>',
                to: user.email,
                subject: "test email",
                template: "../server/src/mail/templates/newsletter.hbs",
                context: {
                  letter,
                },
              });
            }
          }
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
        j++;
      });

      await task.start();
    }

    return "Job created successfully";
  }

  async deleteJob(
    userDTO: DeleteJobDTO,
    queryDTO: QueryDTO
  ): Promise<Record<string, any>> {
    await this.jobModel.findOneAndDelete({ userDTO });

    const { limit, offset, sortField, sortParameter } = queryDTO;

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

  async updateJob(userDTO: EditJobDTO): Promise<string> {
    const { name, date, recipientUsers, recipientGroups, jobID } = userDTO;
    const job = await this.jobModel.findOne({ name });

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

    const newJob = await this.jobModel.findOneAndUpdate({ jobID }, userDTO);

    const mailerJob = new CronJob(date, async () => {
      let recipientsStr: string = "";
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

      await this.mailerService.sendMail({
        from: '"CMS" <ochkodym@gmail.com>',
        to: recipientsStr,
        subject: "test email",
        text: newJob.letter,
      });
    });
    await mailerJob.start();
    return "Job updated successfully";
  }
}
