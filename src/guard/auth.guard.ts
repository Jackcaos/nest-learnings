import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const whiteList = ["/user/login"]; // 白名单路径
    const request = context.switchToHttp().getRequest();
    if (whiteList.includes(request.path)) {
      return true;
    }

    return !!request.session?.user?.id;
  }
}
