import {
  CreativeAuctionBulkData,
  CreativeAuctionBulkHttpRequestBody,
  CreativeAuctionBulkHttpResponseBody,
  CreativeAuctionBulkParams,
} from './types';

export const translateCreativeAuctionBulkParamsToCreativeAuctionBulkHttpRequestBody =
  (params: CreativeAuctionBulkParams): CreativeAuctionBulkHttpRequestBody => ({
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
    inventories: params.inventories.map((inventory) => ({
      inventory_id: inventory.inventoryId,
      items: inventory.items && [...inventory.items],
      categories: inventory.categories && [...inventory.categories],
      search_query: inventory.searchQuery,
    })),
    page_id: params.pageId,
  });

export const translateCreativeAuctionBulkHttpResponseBodyToCreativeAuctionBulkData =
  (data: CreativeAuctionBulkHttpResponseBody): CreativeAuctionBulkData => ({
    requestId: data.request_id,
    results: data.results?.map((result) => ({
      auctionResult: result.auction_result && {
        adAccountId: result.auction_result.ad_account_id,
        campaignId: result.auction_result.campaign_id,
        winPrice: result.auction_result.win_price && {
          currency: result.auction_result.win_price.currency,
          amountMicro: result.auction_result.win_price.amount_micro,
        },
      },
      creatives: result.creatives.map((creative) => ({
        banner: creative.banner && {
          creativeId: creative.banner.creative_id,
          imageUrl: creative.banner.image_url,
          impTrackers: [...creative.banner.imp_trackers],
          clickTrackers: [...creative.banner.click_trackers],
        },
      })),
      items: result.items?.map((item) => ({
        itemId: item.item_id,
        impTrackers: [...item.imp_trackers],
        clickTrackers: [...item.click_trackers],
      })),
    })),
  });
