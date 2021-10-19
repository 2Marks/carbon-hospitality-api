import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { componentsAPI } from "./components";
import { errorHandler, endpointNotFoundHandler } from "./middlewares";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.init();
  }

  private init(): void {
    /**
     * init necessary middlewares here
     */
    this.express.use(express.urlencoded({ limit: "2mb", extended: true }));
    this.express.use(express.json({ limit: "2mb" }));
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(compression());
    this.express.use(morgan("dev"));

    // apis
    this.express.use("/api/v1", componentsAPI);

    /**handle 404 not found endpoints
     * handle all errors || exceptions gracefully
     */
    this.express.use(endpointNotFoundHandler, errorHandler);
  }
}

export default new App().express;
