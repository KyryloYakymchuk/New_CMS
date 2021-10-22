import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, VerifiedCallback, Strategy } from "passport-jwt";

import { FauthService } from "./fauth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: FauthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException("Unauthorized!", HttpStatus.UNAUTHORIZED),
        false
      );
    }

    return done(null, user, payload.iat);
  }
}
