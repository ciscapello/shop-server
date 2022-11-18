"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const router = express_1.default.Router();
router.route("/").get(products_controller_1.getAllProducts);
// router.route("/:id").get(getActor).patch(updateActor).delete(deleteActor);
exports.default = router;
