import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GuardsService } from './guards.service';

@Injectable()
export class WatchPagesGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.pagesWatch(user);

    if (userGroup === true) {
      return true;
    } else {
      response.redirect('/guard');
      return false;
    }
  }
}

@Injectable()
export class WatchUsersGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.usersWatch(user);

    if (userGroup === true) {
      return true;
    } else {
      response.redirect('/guard');
      return false;
    }
  }
}

@Injectable()
export class WatchGroupsGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.groupsWatch(user);

    if (userGroup === true) {
      return true;
    } else {
      response.redirect('/guard');
      return false;
    }
  }
}
