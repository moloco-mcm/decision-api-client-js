import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  CreativeAuctionBulkData,
  CreativeAuctionBulkHttpRequestBody,
  CreativeAuctionBulkHttpResponseBody,
  CreativeAuctionBulkParams,
} from './types';
import {
  translateCreativeAuctionBulkHttpResponseBodyToCreativeAuctionBulkData,
  translateCreativeAuctionBulkParamsToCreativeAuctionBulkHttpRequestBody,
} from './utils';

const postCreativeAuctionBulk: AxiosFn<
  CreativeAuctionBulkParams,
  CreativeAuctionBulkHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: CreativeAuctionBulkHttpRequestBody =
    translateCreativeAuctionBulkParamsToCreativeAuctionBulkHttpRequestBody(
      params
    );

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/creative-auction-bulk`,
    data,
  });
};

const translatePostCreativeAuctionBulkResponse: TranslationFn<
  CreativeAuctionBulkParams,
  CreativeAuctionBulkHttpResponseBody,
  CreativeAuctionBulkData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateCreativeAuctionBulkHttpResponseBodyToCreativeAuctionBulkData(
    data
  );
};

export const creativeAuctionBulk = (context: Context) =>
  apiFn(
    context,
    postCreativeAuctionBulk,
    translatePostCreativeAuctionBulkResponse
  );

export default creativeAuctionBulk;
