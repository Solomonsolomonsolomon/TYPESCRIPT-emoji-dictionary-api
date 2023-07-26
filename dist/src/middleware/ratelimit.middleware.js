"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyRequestLimit = exports.apiRateLimiter = void 0;
const limiter = require("express-rate-limit");
function apiRateLimiter(max) {
    return limiter({
        max,
        message: "you have exceeded the maximum of " +
            max +
            " api calls per route in 5 minutes.please wait and try again later or visit another route",
        windowMs: 1000 * 60 * 5,
        standardHeaders: true,
        legacyHeaders: false,
    });
}
exports.apiRateLimiter = apiRateLimiter;
function apiKeyRequestLimit() {
    return limiter({
        max: 1,
        message: "you can request for an api key only once in 30m",
        windowMs: 1000 * 60 * 30,
        standardHeaders: true,
        legacyHeaders: false,
    });
}
exports.apiKeyRequestLimit = apiKeyRequestLimit;
//# sourceMappingURL=ratelimit.middleware.js.map