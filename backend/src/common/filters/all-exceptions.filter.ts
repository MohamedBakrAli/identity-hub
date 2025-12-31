import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppLogger } from '../../shared/logger/logger.service';

/**
 * Global exception filter that catches all unhandled exceptions.
 * Transforms exceptions into a consistent JSON error response format.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  /**
   * Handles caught exceptions and sends a standardized error response.
   * @param exception - The caught exception (HttpException or unknown error)
   * @param host - Provides access to the request/response context
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as { message?: string }).message ??
          'Internal server error');

    const stack = exception instanceof Error ? exception.stack : undefined;

    this.logger.error(message, stack);
    response.status(status).json({ error: { message } });
  }
}
