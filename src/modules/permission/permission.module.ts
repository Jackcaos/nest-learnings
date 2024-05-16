import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), UserModule],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
