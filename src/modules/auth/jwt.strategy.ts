import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvConfigService } from "../../shared/service/env-config.service";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    envConfigService: EnvConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfigService.jwtConfig.secret,
    });
  }

  async validate(args: { id: number; name: string; type: string }): Promise<User> {
    if (args.type !== "ACCESS_TOKEN") {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      id: args.id,
      name: args.name,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
