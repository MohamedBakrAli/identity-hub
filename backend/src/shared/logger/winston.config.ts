import { AppConfig } from '../../config/app.config';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

const logLevel = AppConfig.isProduction ? 'info' : 'debug';

/**
 * Log information interface.
 */
interface LogInfo extends winston.Logform.TransformableInfo {
  timestamp?: string;
  context?: string;
}

/**
 * Winston module options.
 */
export const winstonConfig: WinstonModuleOptions = {
  level: logLevel,
  transports: [
    // Console transport
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf((info) => {
          const { timestamp, level, message, context } = info as LogInfo;
          return `${timestamp ?? ''} [${level}]${context ? ` [${context}]` : ''}: ${String(message)}`;
        }),
      ),
    }),
    // File transport
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    // Error transport
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};
