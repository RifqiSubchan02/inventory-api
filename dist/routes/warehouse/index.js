"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("@/controllers");
const middlewares_1 = require("@/middlewares");
const router = (0, express_1.Router)();
router.get('/', controllers_1.warehouse.getAll);
router.post('/', middlewares_1.validator.warehouse.create, middlewares_1.validator.validate, controllers_1.warehouse.create);
exports.default = router;
