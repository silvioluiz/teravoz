import winston from 'winston';
const {format, createLogger, transports} = require('winston');


const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.label({ label: '[my-label]' }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.File({ 
        filename: 'error.log', 
        level: 'error',
        prettyPrint: true,                                                                                                                                                                                                               
        handleExceptions: true 
      }),
     new transports.File({ 
        filename: 'full.log',
        prettyPrint: true,                                                                                                                                                                                                               
        handleExceptions: true 
      })
    ]
  });
  
  module.exports = logger;