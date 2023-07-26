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
exports.startServer = void 0;
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
function startServer(serverInstance, port) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            if (cluster_1.default.isPrimary) {
                for (let i in (0, os_1.cpus)()) {
                    cluster_1.default.fork();
                }
            }
            else {
                serverInstance.listen(port, () => {
                    console.log(`Worker thread ${process.pid} started ....${(0, os_1.cpus)().length--} expected`);
                });
            }
        });
    });
}
exports.startServer = startServer;
//# sourceMappingURL=cluster.middleware.js.map