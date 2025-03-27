import {
  BrandAuctionParams,
  BrandAuctionHttpRequestBody,
  BrandAuctionHttpResponseBody,
  BrandAuctionData,
} from './types';

export const translateBrandAuctionParamsToBrandAuctionHttpRequestBody = (
  params: BrandAuctionParams
): BrandAuctionHttpRequestBody => ({
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
    num_ads: params.inventory.numAds,
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

export const translateBrandAuctionHttpResponseBodyToBrandAuctionData = (
  data: BrandAuctionHttpResponseBody
): BrandAuctionData => ({
  requestId: data.request_id,
  decisions: data.decisions?.map((decision) => ({
    inventoryId: decision.inventory_id,
    ads: decision.ads.map((ad) => ({
      auctionResult: ad.auction_result && {
        adAccountId: ad.auction_result.ad_account_id,
        campaignId: ad.auction_result.campaign_id,
        winPrice: ad.auction_result.win_price && {
          currency: ad.auction_result.win_price.currency,
          amountMicro: ad.auction_result.win_price.amount_micro,
        },
      },
      asset: ad.asset && {
        id: ad.asset.id,
        banner: ad.asset.banner && {
          imageUrl: ad.asset.banner.image_url,
        },
        logo: ad.asset.logo && {
          imageUrl: ad.asset.logo.image_url,
        },
        headline: ad.asset.headline && {
          text: ad.asset.headline.text,
        },
        cta: ad.asset.cta && {
          text: ad.asset.cta.text,
        },
        impTrackers: [...ad.asset.imp_trackers],
        clickTrackers: [...ad.asset.click_trackers],
      },
      landingPage: ad.landing_page && {
        type: ad.landing_page.type,
        customUrlSetting: ad.landing_page.custom_url_setting && {
          url: ad.landing_page.custom_url_setting.url,
        },
        productDetailSetting: ad.landing_page.product_detail_setting && {
          itemId: ad.landing_page.product_detail_setting.item_id,
        },
        productListSetting: ad.landing_page.product_list_setting,
      },
      items: ad.items?.map((item) => ({
        itemId: item.item_id,
        impTrackers: [...item.imp_trackers],
        clickTrackers: [...item.click_trackers],
      })),
    })),
  })),
});
