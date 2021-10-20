import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  get(name: string) {
    const config = process.env[name];

    if (typeof config != "undefined" && config != "undefined") {
      return config;
    }

    return "undefined";
  },
};
