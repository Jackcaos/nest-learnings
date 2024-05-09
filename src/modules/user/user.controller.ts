import { Controller, Get, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiOperation } from "@nestjs/swagger";
import { UserRegisterDto } from "./dto/userDTO";
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
  async getHello(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: "注册用户" })
  @ApiResponse({ status: 200, description: "创建用户", type: User })
  @HttpCode(HttpStatus.OK)
  @Post()
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
    return this.userService.registerUser(userRegisterDto);
  }
}
