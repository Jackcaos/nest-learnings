import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";

import { type User } from "../modules/user/user.entity";
import { ContextProvider } from "../providers/context.provider";

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const user = <User>request.user;
    ContextProvider.setUser(user);

    return next.handle();
  }
}
