"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cluster_middleware_1 = require("./middleware/cluster.middleware");
const root_route_1 = __importDefault(require("./routes/root.route"));
const random_routes_1 = __importDefault(require("./routes/random.routes"));
const emojis_routes_1 = __importDefault(require("./routes/emojis.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const keys_routes_1 = __importDefault(require("./routes/keys.routes"));
const error_controller_1 = require("./controller/error.controller");
const ratelimit_middleware_1 = require("./middleware/ratelimit.middleware");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
const key_controller_1 = require("./controller/key.controller");
app.use((0, cors_1.default)());
app.set("trust proxy", 1);
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/h", key_controller_1.getHostName);
app.use(root_route_1.default);
app.use(keys_routes_1.default);
app.use(key_controller_1.verifyKey);
app.use("/emoji", (0, ratelimit_middleware_1.apiRateLimiter)(5), emojis_routes_1.default);
app.use((0, ratelimit_middleware_1.apiRateLimiter)(5), random_routes_1.default);
app.use((0, ratelimit_middleware_1.apiRateLimiter)(5), search_routes_1.default);
app.use(error_controller_1.WrongRoute);
(0, cluster_middleware_1.startServer)(server, port).then((e) => {
    console.log("### all threads loaded");
});
//# sourceMappingURL=index.js.map