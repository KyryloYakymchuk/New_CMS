import { IsNotEmpty } from "class-validator";

export class CreateJobDTO {
  @IsNotEmpty()
  name: string;
  date: Date;
  letter: string;
  recipientUsers?: Array<any>;
  recipientGroups?: Array<any>;
}

export class GetJobDTO {
  jobID: string;
}

export class EditJobDTO {
  @IsNotEmpty()
  jobID: string;
  name?: string;
  date?: Date;
  letter?: string;
  recipientUsers?: Array<any>;
  recipientGroups?: Array<any>;
}

export class DeleteJobDTO {
  jobID: string;
}
