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
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("@/helpers");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient({ errorFormat: 'minimal' });
const { successResponse, errorResponse } = helpers_1.myResponse;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const employee = yield prisma.employee.findUnique({ where: { email } });
            if (!employee)
                return errorResponse({ res, message: 'Employee not found', status: 404 });
            const isValidPass = yield bcryptjs_1.default.compare(password, employee.password);
            if (!isValidPass)
                return errorResponse({ res, message: 'Password is wrong', status: 400 });
            const accessToken = jsonwebtoken_1.default.sign({ id: employee.id, role: employee.role }, process.env.TOKEN_SECRET);
            successResponse({
                res,
                message: 'Login success',
                status: 200,
                data: { accessToken, role: employee.role },
            });
        }
        catch (error) {
            errorResponse({
                res,
                message: 'Something went wrong',
                status: 500,
                error: error,
            });
        }
    });
}
exports.default = { login };
