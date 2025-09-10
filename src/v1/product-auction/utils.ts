import {
  ProductAuctionParams,
  ProductAuctionHttpRequestBody,
  ProductAuctionHttpResponseBody,
  ProductAuctionData,
} from './types';

export const translateProductAuctionParamsToProductAuctionHttpRequestBody = (
  params: ProductAuctionParams
): ProductAuctionHttpRequestBody => ({
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
  inventories: params.inventories.map((inventory) => ({
    inventory_id: inventory.inventoryId,
    num_ads: inventory.numAds,
    inventory_items: inventory.inventoryItems?.map((item) => ({
      item_id: item.itemId,
      item_group_id: item.itemGroupId,
    })),
    categories: inventory.categories && [...inventory.categories],
    search_query: inventory.searchQuery,
    search_metadata: inventory.searchMetadata && {
      synonyms: inventory.searchMetadata.synonyms && [
        ...inventory.searchMetadata.synonyms,
      ],
    },
    custom_item_pool: inventory.customItemPool && {
      items: inventory.customItemPool.items.map((item) => ({
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
        score: item.score && {
          quality_score: item.score.qualityScore,
        },
      })),
    },
    filtering: inventory.filtering && {
      category: inventory.filtering.category && {
        operator: inventory.filtering.category.operator,
        categories: [...inventory.filtering.category.categories],
      },
      location: inventory.filtering.location && {
        locations: [...inventory.filtering.location.locations],
      },
      brand: inventory.filtering.brand && {
        brand_ids: inventory.filtering.brand.brandIds,
      },
      delivery: inventory.filtering.delivery && {
        delivery_option: inventory.filtering.delivery.deliveryOption,
        delivery_options: inventory.filtering.delivery.deliveryOptions && [
          ...inventory.filtering.delivery.deliveryOptions,
        ],
      },
      price: inventory.filtering.price && {
        min_price: inventory.filtering.price.minPrice,
        max_price: inventory.filtering.price.maxPrice,
      },
      sale_price: inventory.filtering.salePrice && {
        min_sale_price: inventory.filtering.salePrice.minSalePrice,
        max_sale_price: inventory.filtering.salePrice.maxSalePrice,
      },
      rating: inventory.filtering.rating && {
        min: inventory.filtering.rating.min,
        max: inventory.filtering.rating.max,
      },
      review_count: inventory.filtering.reviewCount && {
        min: inventory.filtering.reviewCount.min,
        max: inventory.filtering.reviewCount.max,
      },
      color: inventory.filtering.color && {
        colors: [...inventory.filtering.color.colors],
      },
      gender: inventory.filtering.gender && {
        genders: [...inventory.filtering.gender.genders],
      },
      size: inventory.filtering.size && {
        sizes: [...inventory.filtering.size.sizes],
      },
      material: inventory.filtering.material && {
        materials: [...inventory.filtering.material.materials],
      },
      pattern: inventory.filtering.pattern && {
        patterns: [...inventory.filtering.pattern.patterns],
      },
      condition: inventory.filtering.condition && {
        conditions: [...inventory.filtering.condition.conditions],
      },
      age_group: inventory.filtering.ageGroup && {
        age_groups: [...inventory.filtering.ageGroup.ageGroups],
      },
    },
  })),
  page_id: params.pageId,
  deduplication_setting: params.deduplicationSetting && {
    per_request: params.deduplicationSetting.perRequest && {
      method: params.deduplicationSetting.perRequest.method,
      criteria: params.deduplicationSetting.perRequest.criteria,
    },
  },
});

export const translateProductAuctionHttpResponseBodyToProductAuctionData = (
  data: ProductAuctionHttpResponseBody
): ProductAuctionData => ({
  requestId: data.request_id,
  decisions: data.decisions?.map((decision) => ({
    inventoryId: decision.inventory_id,
    decidedItems: decision.decided_items?.map((item) => ({
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
  })),
});
