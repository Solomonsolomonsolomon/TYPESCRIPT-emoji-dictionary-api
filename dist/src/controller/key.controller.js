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
exports.verifyKey = exports.addApiKey = exports.getHostName = exports.generateApiKey = void 0;
const activeApiKeys_json_1 = __importDefault(require("../model/activeApiKeys.json"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let oldkeys = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "model", "activeApiKeys.json"), {
    encoding: "utf8",
});
function generateApiKey(apikey = "") {
    let acceptedChars = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "e",
        "m",
        "o",
        "j",
        "i",
        "_",
        "d",
        "i",
        "c",
        "t",
        "i",
        "o",
        "n",
        "a",
        "r",
        "y",
        "_",
        "a",
        "p",
        "i",
        "_",
        "b",
        "y",
        "_",
        "s",
        "o",
        "l",
        "o",
        "m",
        "o",
        "n",
        "_",
        "f",
        "o",
        "r",
        "_",
        "h",
        "i",
        "l",
        "a",
        "r",
        "y",
        "_",
        "A",
    ];
    for (let i = 0; i < 25; i++) {
        let random = Math.floor(Math.random() * acceptedChars.length);
        apikey += acceptedChars[random];
    }
    return apikey;
}
exports.generateApiKey = generateApiKey;
//
function getHostName(req, res) {
    console.log(req.protocol);
}
exports.getHostName = getHostName;
//
function addApiKey(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let { prod } = req.params;
            // console.log(prod);
            fs_1.default.readFile(path_1.default.join(__dirname, "..", "model", "activeApiKeys.json"), { encoding: "utf8" }, (err, oldKeys) => {
                if (err)
                    throw err;
                let theOldKeys = JSON.parse(oldKeys);
                let apikey = generateApiKey();
                let json = [
                    ...theOldKeys,
                    {
                        host: req.hostname,
                        key: apikey,
                    },
                ];
                fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", "model", "activeApiKeys.json"), JSON.stringify(json), { encoding: "utf8" });
                res.status(201).json({ key: apikey });
            });
        }
        catch (err) {
            res.status(500).json({ err: err.message });
        }
    });
}
exports.addApiKey = addApiKey;
function verifyKey(req, res, next) {
    const apikey = req.headers["x-api-key"];
    let validkey = activeApiKeys_json_1.default.find((key) => {
        return key.key === apikey;
    });
    let fromCorrectHost = activeApiKeys_json_1.default.find((users) => {
        return users.host === apikey;
    });
    if (!validkey) {
        res.json("valid api key needed to access this route.");
    }
    else {
        next();
    }
}
exports.verifyKey = verifyKey;
//# sourceMappingURL=key.controller.js.map