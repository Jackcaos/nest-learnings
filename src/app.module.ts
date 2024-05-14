import { Module, MiddlewareConsumer } from "@nestjs/common";
import { APP_GUARD, APP_FILTER } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as cookieSession from "cookie-session";
// 模块
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./modules/user/user.module";
// 中间件
import { LoggerMiddleware } from "./middlewares/logger.middleware";
// 服务
import { EnvConfigService } from "./shared/service/env-config.service";
// 守卫
import { AuthGuard } from "./guard/auth.guard";
// 异常过滤器
import { BadRequestExceptionFilter } from "./exception/BadRequestExceptionFilter";

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (envConfigService: EnvConfigService) => envConfigService.ormConfig,
      inject: [EnvConfigService],
    }),
  ],
  controllers: [],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          name: "nest-session-id",
          keys: ["test-secret"],
          maxAge: 5 * 60 * 1000, // 过期时间, 单位毫秒。这里设置5分钟
          cookie: {
            // 过期时间, 单位毫秒。这里设置5分钟
            maxAge: 5 * 60 * 1000,
            // cookie是否签名
            signed: true,
          },
        }),
        LoggerMiddleware,
      )
      .forRoutes("*");
  }
}
