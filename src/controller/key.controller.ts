import { Response, Request, NextFunction } from "express";
import allkeys from "../model/activeApiKeys.json";
import path from "path";
import fs from "fs";
let oldkeys = fs.readFileSync(
  path.join(__dirname, "..", "model", "activeApiKeys.json"),
  {
    encoding: "utf8",
  }
);
export function generateApiKey(apikey = "") {
  let acceptedChars: any[] = [
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
//
export function getHostName(req: Request, res: Response) {
  console.log(req.protocol);
}

//
export async function addApiKey(req: Request, res: Response) {
  try {
    // let { prod } = req.params;
    // console.log(prod);
    fs.readFile(
      path.join(__dirname, "..", "model", "activeApiKeys.json"),
      { encoding: "utf8" },
      (err, oldKeys) => {
        if (err) throw err;
        let theOldKeys = JSON.parse(oldKeys);
        let apikey = generateApiKey();
        let json = [
          ...theOldKeys,
          {
            host: req.hostname,
            key: apikey,
          },
        ];
        fs.writeFileSync(
          path.join(__dirname, "..", "model", "activeApiKeys.json"),
          JSON.stringify(json),
          { encoding: "utf8" }
        );
        res.status(201).json({ key: apikey });
      }
    );
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
}

export function verifyKey(req: Request, res: Response, next: NextFunction) {
  interface API {
    host: string;
    key: string;
    production?: boolean;
  }
  const apikey = req.headers["x-api-key"];
  let validkey = allkeys.find((key: API) => {
    return key.key === apikey;
  });
  let fromCorrectHost = allkeys.find((users: API) => {
    return users.host === apikey;
  });
  if (!validkey) {
    res.json("valid api key needed to access this route.");
  } else {
    next();
  }
}
