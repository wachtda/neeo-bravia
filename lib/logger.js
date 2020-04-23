const winston = require('winston');
const readableTimeFormat = winston.format.combine(
    winston.format.label({ label: '[my-label]' }),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'debug', format: winston.format.simple() }),
        new winston.transports.File({ filename: 'bravia-controller.err', level: 'error', format: readableTimeFormat }),
        new winston.transports.File({ filename: 'bravia-controller.log', format: readableTimeFormat }),
    ]
});
module.exports = logger;