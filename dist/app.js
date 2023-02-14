"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("@/routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/auth', routes_1.auth);
app.use('/employee', routes_1.employee);
app.use('/warehouse', routes_1.warehouse);
app.use('/product', routes_1.product);
app.use('/brand', routes_1.brand);
app.get('/', (req, res) => res.send('Welcome to My API'));
app.listen(process.env.PORT, () => {
    console.log(`Server Up and Running on Port ${process.env.PORT}`);
});
