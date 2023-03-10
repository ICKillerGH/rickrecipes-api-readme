import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class JwtUserToBodyInterceptor implements NestInterceptor {
  constructor(
    private propertyId: string = 'userId',
    private defaultValue: number = 0
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as {userId: number};

    request.body[this.propertyId] = user?.userId ?? this.defaultValue;

    return next.handle();
  }

}
