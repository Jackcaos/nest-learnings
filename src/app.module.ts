import { Module } from "@nestjs/common";
// import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// 模块
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
// 服务
import { EnvConfigService } from "./shared/service/env-config.service";
// 守卫
// import { AuthGuard } from "./guard/auth.guard";

@Module({
  imports: [
    AuthModule,
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
  providers: [ConfigService],
})
export class AppModule {}
