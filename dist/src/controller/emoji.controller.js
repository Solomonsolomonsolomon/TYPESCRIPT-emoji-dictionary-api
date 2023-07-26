"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleEmoji = exports.allEmojis = void 0;
const emojidictionary_json_1 = __importDefault(require("./../model/emojidictionary.json"));
const allEmojis = (req, res) => {
    try {
        res.status(200).json({
            emojis: emojidictionary_json_1.default,
            status: 200,
            msg: "request for all emojis successful",
        });
    }
    catch (error) {
        res.status(500).json({ err: error.message });
    }
};
exports.allEmojis = allEmojis;
const singleEmoji = (req, res) => {
    try {
        const { _id } = req.params;
        let singleEmojiDetails = emojidictionary_json_1.default.find((emoji) => {
            return emoji._id === _id;
        });
        if (singleEmojiDetails) {
            res.status(200).json(singleEmojiDetails);
        }
        else {
            throw new Error("emoji either doesnt exist or has been deleted");
        }
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
};
exports.singleEmoji = singleEmoji;
//# sourceMappingURL=emoji.controller.js.map