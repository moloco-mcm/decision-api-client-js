import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  ReservedDisplayAuctionParams,
  ReservedDisplayAuctionHttpRequestBody,
  ReservedDisplayAuctionHttpResponseBody,
  ReservedDisplayAuctionData,
} from './types';
import {
  translateReservedDisplayAuctionHttpResponseBodyToReservedDisplayAuctionData,
  translateReservedDisplayAuctionParamsToReservedDisplayAuctionHttpRequestBody,
} from './utils';

const postReservedDisplayAuction: AxiosFn<
  ReservedDisplayAuctionParams,
  ReservedDisplayAuctionHttpResponseBody
> = (args) => {
  const {
    params,
    context: { axios, platformId },
  } = args;

  const data: ReservedDisplayAuctionHttpRequestBody =
    translateReservedDisplayAuctionParamsToReservedDisplayAuctionHttpRequestBody(
      params
    );

  return axios.request({
    method: 'POST',
    url: `/platforms/${platformId}/reserved-display-ads`,
    data,
  });
};

const translatePostReservedDisplayAuctionResponse: TranslationFn<
  ReservedDisplayAuctionParams,
  ReservedDisplayAuctionHttpResponseBody,
  ReservedDisplayAuctionData
> = (args) => {
  const {
    response: { data },
  } = args;

  return translateReservedDisplayAuctionHttpResponseBodyToReservedDisplayAuctionData(
    data
  );
};

export const reservedDisplayAuction = (context: Context) =>
  apiFn(
    context,
    postReservedDisplayAuction,
    translatePostReservedDisplayAuctionResponse
  );

export default reservedDisplayAuction;
