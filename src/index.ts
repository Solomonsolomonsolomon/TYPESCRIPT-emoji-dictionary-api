import express, { Application, Request, Response, Router } from "express";
import testRoute from "./routes/root.route";
import randomRoute from "./routes/random.routes";
import emojiRoute from "./routes/emojis.routes";
import searchRoute from "./routes/search.routes";
const limiter = require("express-rate-limit");
const port: string | number = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());
let limit = limiter({
  max: 3,
  message:
    "you have exceeded the maximum of 50 api calls in 5 minutes.please wait and try again later",
  windowMs: 1000 * 60 * 5,
  standardHeaders: true,
  legacyHeaders: false,
});
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
app.get("/hello", (req: Request, res: Response): any => {
  res.send("hello there");
});
app.use("/", testRoute);
app.use(limit);

app.use("/emoji", emojiRoute);
app.use("/", randomRoute);
app.use("/", searchRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});