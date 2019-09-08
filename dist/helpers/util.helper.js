"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log = __importStar(require("./log.helper"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLogger = (moduleName) => {
    const logger = log.logger(moduleName);
    return logger;
};
exports.getLogger = getLogger;
