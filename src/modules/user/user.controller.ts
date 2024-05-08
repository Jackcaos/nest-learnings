import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getHello(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
