import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { UserLoginDto } from "./dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 创建token令牌
  async createAccessToken(user: { id: number; name: string }) {
    const token = await this.jwtService.signAsync({
      userId: user.id,
      role: user.name,
      type: "ACCESS_TOKEN",
    });
    console.log("token", token);
    return {
      accessToken: token,
    };
  }

  // 校验用户信息
  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userService.findUserByNameOrAccount({
      account: userLoginDto.account,
    });
    if (user.length === 0) {
      throw new BadRequestException("用户不存在");
    }

    const res = await bcrypt.compare(userLoginDto.password, user[0].password);
    if (!res) {
      throw new BadRequestException("用户密码错误");
    }

    return user[0];
  }
}
