import { Injectable, CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger("AuthGuardLogger");

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log("guard in");
    const whiteList = ["/user/login"]; // 白名单路径
    const request = context.switchToHttp().getRequest();
    if (whiteList.includes(request.path)) {
      return true;
    }
    this.logger.log("guard out");
    return !!request.session?.user?.id;
  }
}
