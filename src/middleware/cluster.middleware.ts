import cluster from "cluster";
import { cpus } from "os";

import http, { Server } from "http";
export async function startServer(
  serverInstance: Server,
  port: number | string
) {
  return new Promise((resolve) => {
    if (cluster.isPrimary) {
      for (let i in cpus()) {
        cluster.fork();
      }
    } else {
      serverInstance.listen(port, () => {
        console.log(
          `Worker thread ${process.pid} started ....${cpus().length--} expected`
        );
      });
    }
  });
}
