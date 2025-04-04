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
  channel_type: params.channelType,
  domain: params.domain,
  session_id: params.sessionId,
  custom_id: params.customId,
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
    persistent_id: params.device.persistentId,
  },
  inventory: {
    inventory_id: params.inventory.inventoryId,
    items: params.inventory.items && [...params.inventory.items],
    categories: params.inventory.categories && [...params.inventory.categories],
    search_query: params.inventory.searchQuery,
  },
  page_id: params.pageId,
  filtering: params.filtering && {
    category: params.filtering.category && {
      operator: params.filtering.category.operator,
      categories: [...params.filtering.category.categories],
    },
    location: params.filtering.location && {
      locations: [...params.filtering.location.locations],
    },
    brand: params.filtering.brand && {
      brand_ids: params.filtering.brand.brandIds,
    },
    delivery: params.filtering.delivery && {
      delivery_option: params.filtering.delivery.deliveryOption,
    },
    price: params.filtering.price && {
      min_price: params.filtering.price.minPrice,
      max_price: params.filtering.price.maxPrice,
    },
    sale_price: params.filtering.salePrice && {
      min_sale_price: params.filtering.salePrice.minSalePrice,
      max_sale_price: params.filtering.salePrice.maxSalePrice,
    },
    rating: params.filtering.rating && {
      min: params.filtering.rating.min,
      max: params.filtering.rating.max,
    },
    review_count: params.filtering.reviewCount && {
      min: params.filtering.reviewCount.min,
      max: params.filtering.reviewCount.max,
    },
    color: params.filtering.color && {
      colors: [...params.filtering.color.colors],
    },
    gender: params.filtering.gender && {
      genders: [...params.filtering.gender.genders],
    },
    size: params.filtering.size && {
      sizes: [...params.filtering.size.sizes],
    },
    material: params.filtering.material && {
      materials: [...params.filtering.material.materials],
    },
    pattern: params.filtering.pattern && {
      patterns: [...params.filtering.pattern.patterns],
    },
    condition: params.filtering.condition && {
      conditions: [...params.filtering.condition.conditions],
    },
    age_group: params.filtering.ageGroup && {
      age_groups: [...params.filtering.ageGroup.ageGroups],
    },
  },
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
