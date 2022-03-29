import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

type Exception = NotFoundException | InternalServerErrorException;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: WinstonLoggerService) {}

  catch(_exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = _exception.getStatus ? _exception.getStatus() : 500;
    const content: any = _exception.getResponse
      ? _exception.getResponse()
      : null;

    response.status(status);
    response.send(content);

    this.logger.error(
      `${request.method} ${request.url} ${status} ms -\n${_exception}`,
    );
  }
}
