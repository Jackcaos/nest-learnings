import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { UserRegisterDto, UserLoginDto } from "./dto/userDTO";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async registerUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const { name, account } = userRegisterDto;
    const lists = await this.findUserByNameOrAccount({ name, account });
    if (lists.length > 0) {
      throw new Error("用户名或账户已存在");
    }

    userRegisterDto.password = await bcrypt.hash(userRegisterDto.password, 10);
    return await this.userRepository.save(userRegisterDto);
  }

  async findUserByNameOrAccount(
    options: Partial<{ name: string; account: string }>,
  ): Promise<User[]> {
    const user = await this.userRepository.find({
      where: [
        {
          name: options.name,
        },
        {
          account: options.account,
        },
      ],
    });

    return user;
  }

  async checkUserLogin(userLoginDto: UserLoginDto): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        account: userLoginDto.account,
      },
    });
    const res = await bcrypt.compare(userLoginDto.password, user.password);

    return res ? user : null;
  }
}
