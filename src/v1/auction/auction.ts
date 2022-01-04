import { AxiosFn, Context, TranslationFn } from '../types';
import { apiFn } from '../utils';
import {
  AuctionParams,
  AuctionHttpRequestBody,
  AuctionHttpResponseBody,
  AuctionData,
} from './types';
import { translateAuctionParamsToAuctionHttpRequestBody } from './utils';

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

  return {
    requestId: data.request_id,
    decidedItems: data.decided_items.map((item) => ({
      itemId: item.item_id,
      auctionResult: item.auction_result && {
        adAccountId: item.auction_result.ad_account_id,
        campaignId: item.auction_result.campaign_id,
        winPrice: item.auction_result.win_price && {
          currency: item.auction_result.win_price.currency,
          amountMicro: item.auction_result.win_price.amount_micro,
        },
      },
      impTrackers: [...item.imp_trackers],
      clickTrackers: [...item.click_trackers],
      metadata: item.metadata && {
        item: item.metadata.item && {
          title: item.metadata.item.title,
          categories: item.metadata.item.categories && [
            ...item.metadata.item.categories,
          ],
          imageUrls: item.metadata.item.image_urls && [
            ...item.metadata.item.image_urls,
          ],
          price: {
            currency: item.metadata.item.price.currency,
            amount: item.metadata.item.price.amount,
          },
        },
        score: item.metadata.score,
      },
    })),
  };
};

export const auction = (context: Context) =>
  apiFn(context, postAuction, translatePostAuctionResponse);

export default auction;
