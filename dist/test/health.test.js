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
const config_1 = __importDefault(require("config"));
const chai = __importStar(require("chai"));
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const chai_1 = require("chai");
const host = process.env.HOST || config_1.default.get('host');
const port = process.env.PORT || config_1.default.get('port');
const url = `http://${host}:${port}`;
describe('/health', () => {
    it('should get success response', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai_1.request(url).get('/health');
        chai_1.expect(response).to.have.status(200);
        chai_1.expect(response.text).to.equal('Server is up!');
    }));
});
