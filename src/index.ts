import express, { Application, Request, Response, Router } from "express";
import cluster, { Cluster, Worker } from "cluster";
import cors, { CorsOptions, CorsRequest } from "cors";
import http from "http";
import { cpus } from "os";
import { startServer } from "./middleware/cluster.middleware.ts";
import testRoute from "./routes/root.route.ts";
import randomRoute from "./routes/random.routes.ts";
import emojiRoute from "./routes/emojis.routes.ts";
import searchRoute from "./routes/search.routes.ts";
import keysRoute from "./routes/keys.routes.ts";
import { WrongRoute } from "./controller/error.controller.ts";
import { addApiKey } from "./controller/key.controller.ts";
import {
  apiKeyRequestLimit,
  apiRateLimiter,
} from "./middleware/ratelimit.middleware.ts";
const port: string | number = process.env.PORT || 3000;
const app: Application = express();
const server = http.createServer(app);
app.use(express.json());
import { getHostName, verifyKey } from "./controller/key.controller.ts";
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
