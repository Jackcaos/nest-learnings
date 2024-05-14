import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { EnvConfigService } from "../../shared/service/env-config.service";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptors";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private envConfigService: EnvConfigService,
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(AuthUserInterceptor)
  @Get()
  async getHello(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get("hello")
  async hello(name: string, age: number) {
    return `hello ${age}, you are ${age} years old`;
  }
}
