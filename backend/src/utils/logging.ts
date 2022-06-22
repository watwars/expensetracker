import winston from 'winston';
import 'winston-daily-rotate-file';

import { envVariables } from '../env';

const { combine, timestamp, json } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  dirname: './logs',
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  level: 'info',
});

const errorFileRotateTransport = new winston.transports.DailyRotateFile({
  dirname: './logs',
  filename: '%DATE%-error.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  level: 'error',
});

const consoleTransport = new winston.transports.Console();

const transports =
  envVariables.ENV == 'dev'
    ? [consoleTransport]
    : [fileRotateTransport, errorFileRotateTransport];

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports,
});
