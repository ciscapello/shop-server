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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_model_1 = __importDefault(require("../models/products.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.find();
    res.status(200).json({
        status: 'success',
        results: products.length,
        body: products
    });
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let product;
    if (mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        product = yield products_model_1.default.findById(req.params.id);
    }
    if (!product) {
        next(new appError_1.default('HUEVA', 400));
        // return res.status(400).json({
        //   status: 'failed',
        //   body: 'Invalid ID'
        // });
    }
    res.status(200).json({
        status: 'success',
        body: product
    });
});
exports.getProduct = getProduct;
exports.createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_model_1.default.create(req.body);
    res.status(200).json({
        status: 'success',
        data: newProduct
    });
}));
// export const updateProduct = (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: "This request yet not have response",
//   });
// };
// export const deleteProduct = (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: "This request yet not have response",
//   });
// };
