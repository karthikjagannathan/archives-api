"use strict";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
File and console logging using Morgan and Winston
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("config"));
const logger = (fileName) => winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.label({ label: path_1.default.basename(fileName) }), winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.format.json(), winston_1.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)),
    transports: [new winston_1.transports.Console(config_1.default.get('logging.winston.console'))],
    exitOnError: false,
});
exports.logger = logger;
// create a stream object with a 'write' function that will be used by `morgan`
class LoggerStream {
    write(message) {
        logger('stdout').info(message); // use the 'info' log level so the output will be picked up by both transports (file and console)
    }
}
exports.LoggerStream = LoggerStream;
