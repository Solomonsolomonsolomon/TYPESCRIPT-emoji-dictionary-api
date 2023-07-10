import { Request, Response } from "express";

export function WrongRoute(req: Request, res: Response) {
  res
    .status(404)
    .send(
      `Oops!! you must have stumbled too far.. route ${req.url} doesnt exist.visit / to find your way back`
    );
}
