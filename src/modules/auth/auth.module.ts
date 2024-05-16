import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PublicStrategy } from "./public.strategy";
import { EnvConfigService } from "../../shared/service/env-config.service";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        secret: envConfigService.jwtConfig.secret,
        signOptions: {
          expiresIn: envConfigService.jwtConfig.expire,
        },
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PublicStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
