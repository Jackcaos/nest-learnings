import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { EnvConfigService } from "../../shared/service/env-config.service";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private envConfigService: EnvConfigService,
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async getHello(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
