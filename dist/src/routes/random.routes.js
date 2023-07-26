"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const random_controller_1 = require("./../controller/random.controller");
const router = (0, express_1.Router)();
router.get('/random', random_controller_1.random);
router.get('/random/:num', random_controller_1.getRandomEmojis);
exports.default = router;
//# sourceMappingURL=random.routes.js.map