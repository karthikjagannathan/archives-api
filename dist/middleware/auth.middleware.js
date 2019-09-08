"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const utils = __importStar(require("../helpers/util.helper"));
const logger = utils.getLogger(__filename);
const authenticate = (req, res, next) => {
    if (config_1.default.get('authenticate')) {
        logger.info('authentication');
        // TODO
    }
    else {
        // skip authentication
        logger.info('skip authentication');
        return next();
    }
};
exports.authenticate = authenticate;
