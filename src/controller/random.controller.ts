import emojis from "./../model/emojidictionary.json";
import { Request, Response } from "express";

export function random(req: Request, res: Response): object {
  return res.status(400).json(`incorrect endpoint
    correct enpoint is  /random/:number .NB:'you must specify a number'
    
    `);
}

export function getRandomEmojis(req: Request, res: Response) {
  try {
    const value: string = req.params.num;
    const num: number = +value;
    let randomlySelectedEmojis = [];
    if (isNaN(num)) {
      throw new Error("please enter a valid number");
    }
    if (num > emojis.length) {
      throw new Error(
        `you requested for ${num} random emojis  but only ${emojis.length} emojis are present.please reduce number`
      );
    }
    for (let i = 0; i < num; i++) {
      randomlySelectedEmojis.push(
        emojis[Math.floor(Math.random() * emojis.length + 1)]
      );
    }
    res.status(200).json(randomlySelectedEmojis);
  } catch (error: any) {
    res.status(400).json({ err: error.message });
  }
}
