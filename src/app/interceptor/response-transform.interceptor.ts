import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {ResponseWrapperDto} from "../../shared/dto/response-wrapper.dto";
import {map, Observable} from "rxjs";
import {Response} from "express";

export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ResponseWrapperDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseWrapperDto<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle()
      .pipe(
        map((data) => ({
          statusCode: response.statusCode,
          statusMessage: response.statusMessage ?? "Success",
          data: data
        }))
      );
  }

}