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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const helpers_1 = require("@/helpers");
const prisma = new client_1.PrismaClient();
const { successResponse, errorResponse } = helpers_1.myResponse;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { take, skip } = (0, helpers_1.pagination)(req);
            const warehouses = yield prisma.warehouse.findMany({
                take: take,
                skip: skip,
            });
            const totalCount = yield prisma.warehouse.count();
            successResponse({
                res,
                message: 'Get all warehouse',
                data: warehouses,
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
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, address } = req.body;
            yield prisma.warehouse.create({ data: { name, address } });
            successResponse({ res, message: 'Create warehouse success', status: 200 });
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
exports.default = { getAll, create };
