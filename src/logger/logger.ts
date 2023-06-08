import {transports, createLogger, format, addColors} from 'winston';
const {combine, timestamp, printf, colorize} = format;

const formatting = printf(({level, message, timestamp}) => {
  return `[${timestamp}] [${level}]: ${message}`;
});

export const logger = createLogger({
  format: combine(timestamp(), colorize(), formatting),

  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});
