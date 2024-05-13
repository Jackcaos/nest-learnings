import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Body,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation } from "@nestjs/swagger";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptors";
import { GrantPermissionDto } from "./dto/permissionDTO";
import { PermissionService } from "./permission.service";
import { ContextProvider } from "src/providers/context.provider";

@Controller("permission")
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post(":id")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(AuthUserInterceptor)
  @ApiOperation({ summary: "用户授权" })
  @HttpCode(HttpStatus.OK)
  async grantPermission(@Param("id") id: number, @Body() grantPermissionDto: GrantPermissionDto) {
    const user = ContextProvider.getUser();
    await this.permissionService.grantPermissionByUserId(user.id, id, grantPermissionDto);
  }
}
