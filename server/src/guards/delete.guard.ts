import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

import { GuardsService } from "./guards.service";

@Injectable()
export class DeletePagesGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.pagesDelete(user);

    if (!userGroup) response.redirect("/guard");

    return !!userGroup;
  }
}

@Injectable()
export class DeleteUsersGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.usersDelete(user);

    if (!userGroup) response.redirect("/guard");

    return !!userGroup;
  }
}

@Injectable()
export class DeleteGroupsGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.groupsDelete(user);

    if (!userGroup) response.redirect("/guard");

    return !!userGroup;
  }
}
