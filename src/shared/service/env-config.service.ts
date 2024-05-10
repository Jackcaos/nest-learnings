import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type TypeOrmModuleOptions } from "@nestjs/typeorm";
import { isNil } from "lodash";
import { JWTConfig } from "../interface/env-config.interface";

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + " does not exist in config service");
    }

    return value;
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    if (isNaN(Number(value))) {
      throw new Error(key + " is not a number");
    }

    return Number(value);
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.trim();
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + " parse to boolean error");
    }
  }

  get ormConfig(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.getString("DB_HOST"),
      port: this.getNumber("DB_PORT"),
      username: this.getString("DB_USERNAME"),
      password: this.getString("DB_PASSWORD"),
      database: this.getString("DB_DATABASE"),
      synchronize: this.getBoolean("DB_SYNCHRONIZE"),
      logging: this.getBoolean("DB_LOGGING"),
      entities: [__dirname + "/../../modules/**/*.entity{.ts,.js}"],
    };
  }

  get jwtConfig(): JWTConfig {
    return {
      secret: this.getString("JWT_SECRET"),
      expire: this.getString("JWT_EXPIRE"),
    };
  }

  get nodeEnv(): string {
    return this.getString("NODE_ENV");
  }
}
