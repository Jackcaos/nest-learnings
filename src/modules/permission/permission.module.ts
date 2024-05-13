import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { UserService } from "../user/user.service";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { User } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Permission, User])],
  providers: [PermissionService, UserService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
