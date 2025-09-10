import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  RecommendationParams,
  RecommendationHttpRequestBody,
  RecommendationHttpResponseBody,
  RecommendationData,
} from './types';
import {
  translateRecommendationHttpResponseBodyToRecommendationResult,
  translateRecommendationParamsToRecommendationHttpRequestBody,
} from './utils';

const postRecommendation: AxiosFn<
  RecommendationParams,
  RecommendationHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: RecommendationHttpRequestBody =
    translateRecommendationParamsToRecommendationHttpRequestBody(params);

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/recommendation`,
    data,
  });
};

const translatePostRecommendationResponse: TranslationFn<
  RecommendationParams,
  RecommendationHttpResponseBody,
  RecommendationData
> = (args) => {
  const {
    response: { data },
  } = args;

  translateRecommendationHttpResponseBodyToRecommendationResult(data);

  return translateRecommendationHttpResponseBodyToRecommendationResult(data);
};

export const recommendation = (context: Context) => {
  const fn = apiFn(
    context,
    postRecommendation,
    translatePostRecommendationResponse
  );
  return (params: RecommendationParams) => {
    console.warn(
      'recommendation is deprecated. This API is no longer supported in the current specification.'
    );
    return fn(params);
  };
};

export default recommendation;
