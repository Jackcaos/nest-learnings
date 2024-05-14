import { BadRequestException, Injectable, Logger, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  private logger = new Logger("ValidateUserPipe");

  transform(value: any) {
    this.logger.log("pipe in");
    if (!value.name || typeof value.name !== "string") {
      throw new BadRequestException("校验用户名失败");
    }
    if (!value.age || typeof +value.age !== "number") {
      throw new BadRequestException("校验用户年龄失败");
    }

    value.name = "hello " + value.name;
    this.logger.log("pipe out");
    return value;
  }
}
