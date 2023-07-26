"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const key_controller_1 = require("../controller/key.controller");
const ratelimit_middleware_1 = require("./../middleware/ratelimit.middleware");
router.get("/getapikey", (0, ratelimit_middleware_1.apiKeyRequestLimit)(), key_controller_1.addApiKey);
exports.default = router;
//# sourceMappingURL=keys.routes.js.map