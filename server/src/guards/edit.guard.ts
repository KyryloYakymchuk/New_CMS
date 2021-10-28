import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GuardsService } from "./guards.service";

@Injectable()
export class EditPagesGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.pagesEdit(user);

    if (!userGroup) response.redirect("/guard");

    return !!userGroup;
  }
}

@Injectable()
export class EditUsersGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.usersEdit(user);

    if (!userGroup) response.redirect("/guard");

    return !!userGroup;
  }
}

@Injectable()
export class EditGroupsGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.groupsEdit(user);

    if (!userGroup) response.redirect("/guard");

    return !!userGroup;
  }
}
