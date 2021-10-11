import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../types/group';
import { Model } from 'mongoose';
import { GuardsService } from './guards.service';

@Injectable()
export class DeletePagesGuard implements CanActivate {
  constructor(private guardService: GuardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    const userGroup = await this.guardService.pagesDelete(user);

    if (userGroup === true) {
      return true;
    } else {
      response.redirect('/guard');
      return false;
    }
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

    if (userGroup === true) {
      return true;
    } else {
      response.redirect('/guard');
      return false;
    }
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

    if (userGroup === true) {
      return true;
    } else {
      response.redirect('/guard');
      return false;
    }
  }
}
