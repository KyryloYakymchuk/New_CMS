import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class loginCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      throw new HttpException("Don`t authorized!", HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
