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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const helpers_1 = require("@/helpers");
const prisma = new client_1.PrismaClient();
const { successResponse, errorResponse } = helpers_1.myResponse;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { take, skip } = (0, helpers_1.pagination)(req);
            const employees = yield prisma.employee.findMany({
                take: take,
                skip: skip,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
                where: {
                // role: 'USER',
                },
            });
            const totalCount = yield prisma.employee.count();
            successResponse({
                res,
                message: 'Get all employees',
                data: employees,
                status: 200,
                totalCount,
                page: skip,
                pageSize: take,
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
function getDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const employee = yield prisma.employee.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                },
            });
            if (!employee)
                return errorResponse({
                    res,
                    message: 'Employee not found',
                    status: 404,
                });
            successResponse({
                res,
                message: 'Get employee detail',
                data: employee,
                status: 200,
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
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, name, role } = req.body;
        try {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            yield prisma.employee.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role,
                },
            });
            successResponse({ res, message: 'Create employee success', status: 200 });
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
exports.default = { getAll, getDetail, create };
