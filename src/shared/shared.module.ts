import { Global, Module } from '@nestjs/common';
import { EnvConfigService } from "./service/env-config.service";

@Global()
@Module({
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class SharedModule {}