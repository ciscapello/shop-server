"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field']
    },
    price: {
        type: String,
        required: [true, 'Price is required field']
    },
    in_stock: {
        type: Boolean,
        default: false
    },
    image_url: {
        type: String,
        required: [true, 'Image is required field']
    }
}, {
    versionKey: false
});
const Products = mongoose_1.default.model('Products', productsSchema);
exports.default = Products;
