import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";

@Injectable()
export class PublicStrategy extends PassportStrategy(Strategy, "public") {
  constructor() {
    super();
  }

  authenticate(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.success({ [Symbol.for("isPublic")]: true });
  }
}
