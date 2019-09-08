"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'sandbox';
}
const morgan_1 = __importDefault(require("morgan")); // log requests to the console (express4)
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors")); // CORS
const helmet_1 = __importDefault(require("helmet")); // Security
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); //swagger
const yamljs_1 = __importDefault(require("yamljs"));
const utils = __importStar(require("./helpers/util.helper"));
const log_helper_1 = require("./helpers/log.helper");
const authHandler = __importStar(require("./middleware/auth.middleware")); // auth
const errorHandler = __importStar(require("./middleware/error.middleware")); // error handler
const routes_1 = __importDefault(require("./routes")); // routes
const app = express_1.default();
const logger = utils.getLogger(__filename);
const host = process.env.HOST || config_1.default.get('host');
const port = process.env.PORT || config_1.default.get('port');
const swaggerDocument = yamljs_1.default.load(`${__dirname}/api/swagger.yaml`);
// middleware
// morgan error stream - process.stderr
app.use(morgan_1.default(config_1.default.get('logging.morgan.logType'), {
    skip(req, res) {
        return res.statusCode < 400;
    },
    stream: process.stderr,
}));
// morgan output stream - process.stdout
app.use(morgan_1.default(config_1.default.get('logging.morgan.logType'), {
    skip(req, res) {
        return res.statusCode >= 400;
    },
    stream: new log_helper_1.LoggerStream(),
}));
// cors
app.options('*', cors_1.default());
app.use(cors_1.default());
// helmet
app.use(helmet_1.default());
// routes
app.use(authHandler.authenticate);
app.use(routes_1.default);
// Swagger API docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// initialize 404 handler
app.use(errorHandler.fofHandler);
// initialize error handler
app.use(errorHandler.errorHandler);
const server = http_1.default.createServer(app).listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info(`SERVER STARTED at http://${host}:${port}`);
}));
server.timeout = 240000;
