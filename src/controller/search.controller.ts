import { Request, Response } from "express";

import emojis from "./../model/emojidictionary.json";

export const searchEmoji = (req: Request, res: Response) => {
  const { search } = req.body;
  try {
    if (req.body?.search) {
      const searchResult = emojis.filter((emoji) => {
        return (
          emoji.name.toLowerCase().includes(search.toLowerCase()) ||
          emoji.emoji.includes(search) ||
          emoji.tags.includes(search)
        );
      });
      if (searchResult.length < 1) {
        throw new Error("no result found");
      } else {
        res.status(200).json(searchResult);
      }
    } else {
      throw new Error("-D  `search` param missing");
    }
  } catch (err: any) {
    res.json({ err: err.message });
  }
};
