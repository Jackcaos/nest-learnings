import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GrantPermissionDto } from "./dto/permissionDTO";
import { Permission } from "./permission.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class PermissionService {
  constructor(
    private userService: UserService,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async grantPermissionByUserId(
    createdUserId: number,
    userId: number,
    grantPermissionDto: GrantPermissionDto,
  ) {
    return await this.permissionRepository.save({
      userId,
      permission: grantPermissionDto.permission,
      createUserId: createdUserId,
      updateUserId: createdUserId,
    });
  }
}
