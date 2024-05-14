import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("RequestLogger");

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log("middleware in");
    // const { method, originalUrl, body, query, params } = req;
    // const logMessage = `Incoming ${method} request to ${originalUrl}. Params: ${JSON.stringify(params)}. Query: ${JSON.stringify(query)}. Body: ${JSON.stringify(body)}`;
    // this.logger.log(logMessage);

    next();
    this.logger.log("middleware out");
  }
}
