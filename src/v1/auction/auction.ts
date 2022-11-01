import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  AuctionParams,
  AuctionHttpRequestBody,
  AuctionHttpResponseBody,
  AuctionData,
} from './types';
import {
  translateAuctionHttpResponseBodyToAuctionResult,
  translateAuctionParamsToAuctionHttpRequestBody,
} from './utils';

const postAuction: AxiosFn<AuctionParams, AuctionHttpResponseBody> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: AuctionHttpRequestBody =
    translateAuctionParamsToAuctionHttpRequestBody(params);

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/auction`,
    data,
  });
};

const translatePostAuctionResponse: TranslationFn<
  AuctionParams,
  AuctionHttpResponseBody,
  AuctionData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateAuctionHttpResponseBodyToAuctionResult(data);
};

export const auction = (context: Context) =>
  apiFn(context, postAuction, translatePostAuctionResponse);

export default auction;
