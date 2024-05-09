import { Module, MiddlewareConsumer } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as cookieSession from "cookie-session";

// 模块
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./modules/user/user.module";

import { EnvConfigService } from "./shared/service/env-config.service";

import { AuthGuard } from "./guard/auth.guard";

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
            signed: false,
          },
        }),
      )
      .forRoutes("*");
  }
}
