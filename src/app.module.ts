import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// 模块
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';

import { EnvConfigService } from './shared/service/env-config.service';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production",
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (envConfigService: EnvConfigService) => envConfigService.ormConfig,
      inject: [EnvConfigService]
    })
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
