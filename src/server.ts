import * as http from "http";
import { env, logger } from "./app/helpers";
import App from "./app";

const server = http.createServer(App);
const APP_PORT = env.get("APP_PORT");

server.listen(APP_PORT, async () => {
  logger.info(
    `CARBON HOSPITALITY API SERVER STARTED SUCCESSFULLY ON PORT ${APP_PORT} ✅`
  );
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
  logger.error("error occured");
});
