import axios from 'axios';
import { AxiosFn, Context, TranslationFn } from '../types';

import * as errors from './errors';

export const translateError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) return new errors.NetworkError();

    const status = error.response.status;
    const message = JSON.stringify(
      error.response?.data?.message || error.response?.data || ''
    );

    if (status === 400) return new errors.BadRequestError(message);
    if (status === 401) return new errors.UnauthorizedError(message);
    if (status === 403) return new errors.ForbiddenError(message);
    if (status === 404) return new errors.NotFoundError(message);
    if (status >= 500) return new errors.InternalServerError(message);

    return new errors.UnknownError(`status: ${status}, message: ${message}`);
  }

  return error;
};

export const apiFn = <
  Params = unknown,
  HttpResponse = unknown,
  Result = unknown
>(
  context: Context,
  axiosFn: AxiosFn<Params, HttpResponse>,
  translateFn: TranslationFn<Params, HttpResponse, Result>
) => {
  return async (params: Params) => {
    try {
      const response = await axiosFn({ params, context });
      return translateFn({ response, context, params });
    } catch (error) {
      throw translateError(error);
    }
  };
};

//Todo: Add a utility function to translate between camelCase and snake_case
