import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ResponseWrapperDto } from "../../shared/dto/response-wrapper.dto";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const statusCode = exception.getStatus();

    const errorResponse: any = exception.getResponse() as any;

    const body: ResponseWrapperDto<any> = {
      statusCode: statusCode,
      statusMessage: errorResponse.error,
      errorMessages: this.getErrorMessages(exception)
    };

    response.status(statusCode)
      .json(body);
  }

  private getErrorMessages(exception: HttpException): string[] | undefined {
    const errorResponse: any = exception.getResponse() as any;

    if (errorResponse.message instanceof Array) {
      return errorResponse.message.map((value: any) => value.toString());
    }

    if (typeof errorResponse.message === "string") {
      return [errorResponse.message];
    }

    return errorResponse.message;
  }

}