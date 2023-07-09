const limiter = require("express-rate-limit");

export function apiRateLimiter(max: number) {
  return limiter({
    max,
    message:
      "you have exceeded the maximum of " +
      max +
      " api calls in x minutes.please wait and try again later",
    windowMs: 1000 * 60 * 5,
    standardHeaders: true,
    legacyHeaders: false,
  });
}

export function apiKeyRequestLimit() {
  console.log("ahhh", "working");
  return limiter({
    max: 1,
    message: "you can request for an api key only once in 30m",
    windowMs: 1000 * 60 * 30,
    standardHeaders: true,
    legacyHeaders: false,
  });
}
