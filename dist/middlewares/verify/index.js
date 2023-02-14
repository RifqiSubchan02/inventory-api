"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("@/helpers");
dotenv_1.default.config();
const { errorResponse } = helpers_1.myResponse;
const admin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const accessToken = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '');
        const payloadToken = jsonwebtoken_1.default.verify(accessToken, process.env.TOKEN_SECRET);
        req.user = payloadToken;
        next();
    }
    catch (error) {
        errorResponse({ res, message: 'Access denied', status: 401, error });
    }
};
exports.default = { admin };
