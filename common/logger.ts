import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';

class Logger {
  private static instance: WinstonLogger;

  private constructor() {}

  public static getInstance(): WinstonLogger {
    if (!Logger.instance) {
      Logger.instance = createLogger({
        level: 'info',
        format: format.combine(
          format.timestamp(),
          format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
          }),
        ),
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'application.log' }),
        ],
      });
    }
    return Logger.instance;
  }
}

// Export the singleton instance
export const logger = Logger.getInstance();
