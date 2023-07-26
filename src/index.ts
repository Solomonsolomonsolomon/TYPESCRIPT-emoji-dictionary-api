import express, { Application, Request, Response, Router } from "express";
import cluster, { Cluster, Worker } from "cluster";
import cors, { CorsOptions, CorsRequest } from "cors";
import http from "http";
import { cpus } from "os";
import { startServer } from "./middleware/cluster.middleware";
import testRoute from "./routes/root.route";
import randomRoute from "./routes/random.routes";
import emojiRoute from "./routes/emojis.routes";
import searchRoute from "./routes/search.routes";
import keysRoute from "./routes/keys.routes";
import { WrongRoute } from "./controller/error.controller";
import { addApiKey } from "./controller/key.controller";
import {
  apiKeyRequestLimit,
  apiRateLimiter,
} from "./middleware/ratelimit.middleware";
const port: string | number = process.env.PORT || 3000;
const app: Application = express();
const server = http.createServer(app);
app.use(express.json());
import { getHostName, verifyKey } from "./controller/key.controller";
app.use(cors());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
app.get("/h", getHostName);
app.use(testRoute);
app.use(keysRoute);
app.use(verifyKey);
app.use("/emoji", apiRateLimiter(5), emojiRoute);
app.use(apiRateLimiter(5), randomRoute);
app.use(apiRateLimiter(5), searchRoute);
app.use(WrongRoute);

startServer(server, port).then((e) => {
  console.log("### all threads loaded");
});
