import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, VerifiedCallback, Strategy } from "passport-jwt";

import { FauthService } from "./fauth.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private fauthService: FauthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    const fuser = await this.fauthService.validateUser(payload);

    if (!user && !fuser) {
      return done(
        new HttpException("Unauthorized!", HttpStatus.UNAUTHORIZED),
        false
      );
    }

    return done(null, !!user ? user : fuser, payload.iat);
  }
}
