import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  BrandAuctionParams,
  BrandAuctionHttpRequestBody,
  BrandAuctionHttpResponseBody,
  BrandAuctionData,
} from './types';
import {
  translateBrandAuctionHttpResponseBodyToBrandAuctionData,
  translateBrandAuctionParamsToBrandAuctionHttpRequestBody,
} from './utils';

const postBrandAuction: AxiosFn<
  BrandAuctionParams,
  BrandAuctionHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: BrandAuctionHttpRequestBody =
    translateBrandAuctionParamsToBrandAuctionHttpRequestBody(params);

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/brand-auction`,
    data,
  });
};

const translatePostBrandAuctionResponse: TranslationFn<
  BrandAuctionParams,
  BrandAuctionHttpResponseBody,
  BrandAuctionData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateBrandAuctionHttpResponseBodyToBrandAuctionData(data);
};

export const brandAuction = (context: Context) =>
  apiFn(context, postBrandAuction, translatePostBrandAuctionResponse);

export default brandAuction;
