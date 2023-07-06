import { Router, Request, Response } from "express";
export const testApi = (req: Request, res: Response) => {
  res.send(`api status:ONLINE.
    You connected with ip ${req.ip} 
    ${new Date()}
    #DOCUMENTATION
    several routes are available
    / -this is test route 
    /emoji -gets all emojis
    /emoji/:_id -get details for a specific emoji by emoji _id
    /random/:number -returns n random emojis where n = number
    /search :POST -D search 
`);
};
