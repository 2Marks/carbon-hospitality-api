/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { HttpError, HttpConnectionError } from "./errors";
import { logger } from "./logger";

interface HTTPProps {
  url: string;
  baseURL?: string;
  data?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  headers?: object;
}

enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
interface HTTPWrapperProps {
  method: HttpMethods;
  url: string;
  baseURL?: string;
  data?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  headers?: object;
}

export const httpService = {
  async get(params: HTTPProps) {
    return httpWrapper({ method: HttpMethods.GET, ...params });
  },

  async post(params: HTTPProps) {
    return httpWrapper({ method: HttpMethods.POST, ...params });
  },

  async put(params: HTTPProps) {
    return httpWrapper({ method: HttpMethods.PUT, ...params });
  },

  async patch(params: HTTPProps) {
    return httpWrapper({ method: HttpMethods.PATCH, ...params });
  },

  async delete(params: HTTPProps) {
    return httpWrapper({ method: HttpMethods.DELETE, ...params });
  },
};

async function httpWrapper(params: HTTPWrapperProps) {
  try {
    const dataProp = params.method === HttpMethods.GET ? "params" : "data";
    const response = await axios({
      url: params.url,
      method: params.method,
      ...(params.baseURL && { baseURL: params.baseURL }),
      ...(params.data && { [dataProp]: params.data }),
      ...(params.headers && { headers: params.headers }),
    });
    const data = response.data as any;

    //support api that do not follow hateaos
    return data.hasOwnProperty("data") ? data.data : data;
  } catch (error) {
    const { response } = error;

    if (!response || response === undefined) {
      throw new HttpConnectionError({
        message: `No response sent from ${params.url} `,
      });
    }
    logger.error(response.data);
    throw new HttpError({
      message: response.data.message || response.data.error,
      status: response.status,
      ...(response.data.errorType && { errorType: response.data.errorType }),
      error: response.data.errors,
    });
  }
}
