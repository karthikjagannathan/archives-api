"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// route root
const express_1 = __importDefault(require("express"));
const health_route_1 = __importDefault(require("./health.route"));
const router = express_1.default.Router();
// index routes
router.get('/', (req, res) => {
    res.send(`root: ${req.hostname} api`);
});
router.use('/health', health_route_1.default);
exports.default = router;
