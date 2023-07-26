"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongRoute = void 0;
function WrongRoute(req, res) {
    res
        .status(404)
        .send(`Oops!! you must have stumbled too far.. route ${req.url} doesnt exist.visit / to find your way back`);
}
exports.WrongRoute = WrongRoute;
//# sourceMappingURL=error.controller.js.map