import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger("LoggerInterceptor");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log("interceptor in");
    // const req = context.switchToHttp().getRequest();
    // const method = req.method;
    // const url = req.url;
    // const now = Date.now();

    // this.logger.log(`[${method}] ${url} - Request`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log("interceptor out");
        // this.logger.log(`[${method}] ${url} - Response (${Date.now() - now}ms)`);
      }),
    );
  }
}
