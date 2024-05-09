import { Controller, Get, Post, Body, HttpCode, HttpStatus, Session } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserRegisterDto, UserLoginDto } from "./dto/userDTO";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { EnvConfigService } from "../../shared/service/env-config.service";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private envConfigService: EnvConfigService,
  ) {}

  @Get()
  async getHello(@Session() Session): Promise<User[]> {
    console.log("session", Session.user);
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: "注册用户" })
  @HttpCode(HttpStatus.OK)
  @Post()
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.userService.registerUser(userRegisterDto);
  }

  @ApiOperation({ summary: "用户登录" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() userLoginDto: UserLoginDto, @Session() session) {
    const res = await this.userService.checkUserLogin(userLoginDto);
    if (res) {
      session.user = { id: res.id, name: res.name };
    }
    return {
      code: 200,
      msg: res ? "登录成功" : "用户账户或密码错误",
    };
  }
}
