import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  DisplayAuctionParams,
  DisplayAuctionHttpRequestBody,
  DisplayAuctionHttpResponseBody,
  DisplayAuctionData,
} from './types';
import {
  translateDisplayAuctionHttpResponseBodyToDisplayAuctionData,
  translateDisplayAuctionParamsToDisplayAuctionHttpRequestBody,
} from './utils';

const postDisplayAuction: AxiosFn<
  DisplayAuctionParams,
  DisplayAuctionHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: DisplayAuctionHttpRequestBody =
    translateDisplayAuctionParamsToDisplayAuctionHttpRequestBody(params);

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/display-auction`,
    data,
  });
};

const translatePostDisplayAuctionResponse: TranslationFn<
  DisplayAuctionParams,
  DisplayAuctionHttpResponseBody,
  DisplayAuctionData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateDisplayAuctionHttpResponseBodyToDisplayAuctionData(data);
};

export const displayAuction = (context: Context) =>
  apiFn(context, postDisplayAuction, translatePostDisplayAuctionResponse);

export default displayAuction;
