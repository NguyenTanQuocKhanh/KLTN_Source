import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { get } from 'lodash';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errors: any =
      get(exception, 'response.errors', get(exception, 'response')) || {};
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      errors = {
        ...errors,
        message: exception.message,
      };
    } else if (httpStatus === HttpStatus.BAD_REQUEST) {
      errors = get(exception, 'response', {});
    } else if (httpStatus === HttpStatus.UNPROCESSABLE_ENTITY) {
      errors = {
        message: get(Object.values(errors), '[0]'),
      };
    }
    delete errors.statusCode;
    delete errors.status;
    const responseBody = {
      statusCode: httpStatus,
      errors: { ...errors },
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    console.log('');
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
