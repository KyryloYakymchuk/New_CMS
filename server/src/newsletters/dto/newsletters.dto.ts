import { IsNotEmpty } from "class-validator";

export class CreateJobDTO {
  @IsNotEmpty()
  title: string;
  recipientUsers: Record<string, any>;
  recipientGroups: Record<string, any>;
}

export class GetJobDTO {
  jobID: string;
}

export class EditJobDTO {
  jobID: string;
}

export class DeleteJobDTO {
  jobID: string;
}
