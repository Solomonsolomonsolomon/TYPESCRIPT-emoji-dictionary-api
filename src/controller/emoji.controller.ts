import { Request, Response } from "express";
import emojis from "./../model/emojidictionary.json";
export const allEmojis = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      emojis,
      status: 200,
      msg: "request for all emojis successful",
    });
  } catch (error: object | any) {
    res.status(500).json({ err: error.message });
  }
};

export const singleEmoji = (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    let singleEmojiDetails = emojis.find((emoji) => {
      return emoji._id === _id;
    });
    if (singleEmojiDetails) {
      res.status(200).json(singleEmojiDetails);
    } else {
      throw new Error("emoji either doesnt exist or has been deleted");
    }
  } catch (error: object | any) {
    res.status(400).json({ err: error.message });
  }
};
