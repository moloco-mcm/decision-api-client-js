import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  ProductAuctionParams,
  ProductAuctionHttpRequestBody,
  ProductAuctionHttpResponseBody,
  ProductAuctionData,
} from './types';
import {
  translateProductAuctionHttpResponseBodyToProductAuctionData,
  translateProductAuctionParamsToProductAuctionHttpRequestBody,
} from './utils';

const postProductAuction: AxiosFn<
  ProductAuctionParams,
  ProductAuctionHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: ProductAuctionHttpRequestBody =
    translateProductAuctionParamsToProductAuctionHttpRequestBody(params);

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/product-auction`,
    data,
  });
};

const translatePostProductAuctionResponse: TranslationFn<
  ProductAuctionParams,
  ProductAuctionHttpResponseBody,
  ProductAuctionData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateProductAuctionHttpResponseBodyToProductAuctionData(data);
};

export const productAuction = (context: Context) =>
  apiFn(context, postProductAuction, translatePostProductAuctionResponse);

export default productAuction;
