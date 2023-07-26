"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEmoji = void 0;
const emojidictionary_json_1 = __importDefault(require("./../model/emojidictionary.json"));
const searchEmoji = (req, res) => {
    var _a;
    const { search } = req.body;
    try {
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.search) {
            const searchResult = emojidictionary_json_1.default.filter((emoji) => {
                return (emoji.name.toLowerCase().includes(search.toLowerCase()) ||
                    emoji.emoji.includes(search) ||
                    emoji.tags.includes(search));
            });
            if (searchResult.length < 1) {
                throw new Error("no result found");
            }
            else {
                res.status(200).json(searchResult);
            }
        }
        else {
            throw new Error("-D  `search` param missing");
        }
    }
    catch (err) {
        res.json({ err: err.message });
    }
};
exports.searchEmoji = searchEmoji;
//# sourceMappingURL=search.controller.js.map