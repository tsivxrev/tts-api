import { createLogger, format, transports } from 'winston';

const { printf } = format;

const myFormat = printf(({
  level,
  message,
  label,
  timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

const transport = [
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: format.json(),
  }),
  new transports.File({
    filename: 'logs/application-info.log',
    level: 'info',
    format: format.json(),
  }),
  new transports.Console({
    level: 'info',
    format: format.combine(format.colorize(), myFormat),
    handleExceptions: true,
  }),
];

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
  transports: transport,
});

const streamLogs = (offset = 1) => {
  const options = {
    from: new Date() - (24 * 60 * 60 * 1000) * offset,
    until: new Date(),
    start: 0,
    order: 'desc',
  };
  return new Promise((resolve, reject) => {
    logger.query(options, (err, results) => {
      if (err) { reject(err); }
      resolve(JSON.stringify(results, null, '\t'));
    });
  });
};

export default { logger, streamLogs };
