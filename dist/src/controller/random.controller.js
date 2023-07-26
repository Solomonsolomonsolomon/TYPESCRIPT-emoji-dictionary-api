"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomEmojis = exports.random = void 0;
const emojidictionary_json_1 = __importDefault(require("./../model/emojidictionary.json"));
function random(req, res) {
    return res.status(400).json(`incorrect endpoint
    correct enpoint is  /random/:number .NB:'you must specify a number'
    
    `);
}
exports.random = random;
function getRandomEmojis(req, res) {
    try {
        const value = req.params.num;
        const num = +value;
        let randomlySelectedEmojis = [];
        if (isNaN(num)) {
            throw new Error("please enter a valid number");
        }
        if (num > emojidictionary_json_1.default.length) {
            throw new Error(`you requested for ${num} random emojis  but only ${emojidictionary_json_1.default.length} emojis are present.please reduce number`);
        }
        for (let i = 0; i < num; i++) {
            randomlySelectedEmojis.push(emojidictionary_json_1.default[Math.floor(Math.random() * emojidictionary_json_1.default.length + 1)]);
        }
        res.status(200).json(randomlySelectedEmojis);
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
}
exports.getRandomEmojis = getRandomEmojis;
//# sourceMappingURL=random.controller.js.map