import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class QueryParamsToBodyInterceptor implements NestInterceptor {
  constructor(private paramsMappping: Record<string, string>) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    for(let [paramKey, bodyKey] of Object.entries(this.paramsMappping)) {
      request.body[bodyKey] = request.query[paramKey];
    }

    return next.handle();
  }

}
