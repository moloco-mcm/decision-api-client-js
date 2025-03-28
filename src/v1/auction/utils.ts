import {
  AuctionParams,
  AuctionHttpRequestBody,
  AuctionHttpResponseBody,
  AuctionData,
} from './types';

export const translateAuctionParamsToAuctionHttpRequestBody = (
  params: AuctionParams
): AuctionHttpRequestBody => ({
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
  page_id: params.pageId,
  custom_item_pool: params.customItemPool && {
    items:
      params.customItemPool.items &&
      params.customItemPool.items.map((item) => ({
        id: item.id,
        context: item.context && {
          shipping_charge: item.context.shippingCharge && {
            currency: item.context.shippingCharge.currency,
            amount_micro: item.context.shippingCharge.amountMicro,
          },
          distance: item.context.distance,
          discount: item.context.discount && {
            rate: item.context.discount.rate,
            price_amount: item.context.discount.priceAmount && {
              currency: item.context.discount.priceAmount.currency,
              amount_micro: item.context.discount.priceAmount.amountMicro,
            },
          },
        },
        score: item.score && { quality_score: item.score.qualityScore },
      })),
  },
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

export const translateAuctionHttpResponseBodyToAuctionResult = (
  data: AuctionHttpResponseBody
): AuctionData => ({
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
