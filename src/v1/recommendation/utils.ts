import {
  RecommendationParams,
  RecommendationHttpRequestBody,
  RecommendationHttpResponseBody,
  RecommendationData,
} from './types';

export const translateRecommendationParamsToRecommendationHttpRequestBody = (
  params: RecommendationParams
): RecommendationHttpRequestBody => ({
  request_id: params.requestId,
  session_id: params.sessionId,
  user: params.user && {
    user_id: params.user.userId,
    interests: params.user.interests && [...params.user.interests],
  },
  device: params.device && {
    os: params.device.os,
    os_version: params.device.osVersion,
    advertising_id: params.device.advertisingId,
    unique_device_id: params.device.uniqueDeviceId,
    model: params.device.model,
    ip: params.device.ip,
  },
  inventory: {
    inventory_id: params.inventory.inventoryId,
    num_items: params.inventory.numItems,
    items: params.inventory.items && [...params.inventory.items],
    categories: params.inventory.categories && [...params.inventory.categories],
    search_query: params.inventory.searchQuery,
    search_metadata: params.inventory.searchMetadata && {
      synonyms: params.inventory.searchMetadata.synonyms && [
        ...params.inventory.searchMetadata.synonyms,
      ],
    },
  },
});

export const translateRecommendationHttpResponseBodyToRecommendationResult = (
  data: RecommendationHttpResponseBody
): RecommendationData => ({
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
    trackId: item.track_id,
  })),
});
