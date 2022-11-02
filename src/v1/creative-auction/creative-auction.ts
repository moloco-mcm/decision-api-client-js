import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  CreativeAuctionParams,
  CreativeAuctionHttpRequestBody,
  CreativeAuctionHttpResponseBody,
  CreativeAuctionData,
} from './types';
import {
  translateCreativeAuctionHttpResponseBodyToCreativeAuctionData,
  translateCreativeAuctionParamsToCreativeAuctionHttpRequestBody,
} from './utils';

const postCreativeAuction: AxiosFn<
  CreativeAuctionParams,
  CreativeAuctionHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: CreativeAuctionHttpRequestBody =
    translateCreativeAuctionParamsToCreativeAuctionHttpRequestBody(params);

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/creative-auction`,
    data,
  });
};

const translatePostCreativeAuctionResponse: TranslationFn<
  CreativeAuctionParams,
  CreativeAuctionHttpResponseBody,
  CreativeAuctionData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateCreativeAuctionHttpResponseBodyToCreativeAuctionData(data);
};

export const creativeAuction = (context: Context) =>
  apiFn(context, postCreativeAuction, translatePostCreativeAuctionResponse);

export default creativeAuction;
