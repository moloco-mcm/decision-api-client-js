import {
  CreativeAuctionParams,
  CreativeAuctionHttpRequestBody,
  CreativeAuctionHttpResponseBody,
  CreativeAuctionData,
} from './types';

export const translateCreativeAuctionParamsToCreativeAuctionHttpRequestBody = (
  params: CreativeAuctionParams
): CreativeAuctionHttpRequestBody => ({
  request_id: params.requestId,
  session_id: params.sessionId,
  user: params.user && {
    user_id: params.user.userId,
    year_of_birth: params.user.yearOfBirth,
    gender: params.user.gender,
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
    items: params.inventory.items && [...params.inventory.items],
    categories: params.inventory.categories && [...params.inventory.categories],
    search_query: params.inventory.searchQuery,
  },
  page_id: params.pageId,
});

export const translateCreativeAuctionHttpResponseBodyToCreativeAuctionData = (
  data: CreativeAuctionHttpResponseBody
): CreativeAuctionData => ({
  requestId: data.request_id,
  auctionResult: data.auction_result && {
    adAccountId: data.auction_result.ad_account_id,
    campaignId: data.auction_result.campaign_id,
    winPrice: data.auction_result.win_price && {
      currency: data.auction_result.win_price.currency,
      amountMicro: data.auction_result.win_price.amount_micro,
    },
  },
  banner: data.banner && {
    creativeId: data.banner.creative_id,
    imageUrl: data.banner.image_url,
    impTrackers: [...data.banner.imp_trackers],
    clickTrackers: [...data.banner.click_trackers],
  },
  items: data.items?.map((item) => ({
    itemId: item.item_id,
    impTrackers: [...item.imp_trackers],
    clickTrackers: [...item.click_trackers],
  })),
});
