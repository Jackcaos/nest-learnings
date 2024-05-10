import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "../user/user.entity";
import { UserLoginDto } from "./dto/user-login.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "注册用户" })
  @HttpCode(HttpStatus.OK)
  @Post()
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.userService.createUser(userRegisterDto);
  }

  @Post("login")
  @ApiOperation({ summary: "用户登录" })
  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({ id: user.id, name: user.name });

    return {
      user,
      token,
    };
  }
}
