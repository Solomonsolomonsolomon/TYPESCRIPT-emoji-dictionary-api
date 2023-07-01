import express, { Application, Request, Response, Router } from "express";
import testRoute from "./routes/root.route";
import emojiRoute from "./routes/emojis.routes";
const port: string | number = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/hello", (req: Request, res: Response): any => {
  res.send("hello there");
});
app.use("/", testRoute);
app.use("/emoji", emojiRoute);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function name(values: Record<string, any>): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    resolve();
  });
}
