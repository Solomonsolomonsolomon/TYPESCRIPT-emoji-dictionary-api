import express, { Application, Request, Response, Router } from "express";
import testRoute from "./routes/root.route";
import randomRoute from "./routes/random.routes";
import emojiRoute from "./routes/emojis.routes";
import searchRoute from "./routes/search.routes";
import keysRoute from "./routes/keys.routes";
import { addApiKey } from "./controller/key.controller";
import {
  apiKeyRequestLimit,
  apiRateLimiter,
} from "./middleware/ratelimit.middleware";
const port: string | number = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());
import { getHostName, verifyKey } from "./controller/key.controller";
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
app.get("/h", getHostName);
app.use(testRoute);
app.use(keysRoute);
app.use(verifyKey); //VERIFYING API KEY
//app.use(apiRateLimiter(50))
app.use("/emoji", apiRateLimiter(5), emojiRoute);
app.use(apiRateLimiter(5), randomRoute);
app.use(apiRateLimiter(5), searchRoute);

app.use((req, res, next) => {
  res.json("wrong route hittttt");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
