import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

/**
 * Custom logger wrapper for per-service logging.
 *
 * @example
 * constructor(private readonly logger: AppLogger) {}
 */
@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private readonly logger: Logger;

  constructor(@Inject(INQUIRER) parentClass: object) {
    // get the context from the injecting class name
    this.logger = new Logger(parentClass?.constructor?.name ?? 'App');
  }

  log(message: string) {
    this.logger.log(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  fatal(message: string) {
    this.logger.fatal(message);
  }
}
