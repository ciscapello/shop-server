"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const morgan_1 = __importDefault(require("morgan"));
const error_controller_1 = __importDefault(require("./controllers/error.controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api', products_route_1.default);
app.use(error_controller_1.default);
exports.default = app;
