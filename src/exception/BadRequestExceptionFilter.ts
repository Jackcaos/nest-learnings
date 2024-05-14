import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger("BadRequestException");

  catch(exception: BadRequestException, host: ArgumentsHost) {
    this.logger.log("exception-filter in");
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
    this.logger.log("exception-filter out");
  }
}
