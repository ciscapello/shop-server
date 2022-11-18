"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require("pg");
const pool = new Pool({
    user: "postgres",
    password: process.env.PASSWORD,
    host: "localhost",
    port: 5432,
});
exports.default = pool;
