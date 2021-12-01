import { AxiosInstance, AxiosResponse } from 'axios';

export type APIFunction = (params: unknown, context: Context) => unknown;

export type Context = {
  axios: AxiosInstance;
  platformId: string;
};

export type AxiosFn<Params, HttpResponse> = (args: {
  context: Context;
  params: Params;
}) => Promise<AxiosResponse<HttpResponse>>;

export type TranslationFn<Params, HttpResponse, Result> = (args: {
  context: Context;
  params: Params;
  response: AxiosResponse<HttpResponse>;
}) => Result;
