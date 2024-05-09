import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { UserRegisterDto } from "./dto/userDTO";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUser() {
    return "hello user!";
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async registerUser(userRegisterDto: UserRegisterDto): Promise<User> {
    userRegisterDto.password = await bcrypt.hash(userRegisterDto.password, 10);
    return await this.userRepository.save(userRegisterDto);
  }
}
