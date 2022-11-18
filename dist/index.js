"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: "./config.env" });
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT;
const DB = process.env.DB.replace("<password>", process.env.PASSWORD);
mongoose_1.default.connect(DB).then(() => {
    console.log("Database is connected 🥳");
});
app_1.default.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
