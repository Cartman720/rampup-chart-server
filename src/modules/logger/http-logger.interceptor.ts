import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WinstonLoggerService } from './logger.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private logger: WinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const date = Date.now();
    const response = http.getResponse();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const endDate = Date.now() - date;
      this.logger.log(
        `${request.method} ${request.url} ${statusCode} ${endDate} ms - ${contentLength || ''} `,
      );
    });

    return next.handle().pipe(
      catchError((err: Error) => {
        this.logger.error(err.stack);
        throw err;
      }),
    );
  }
}
