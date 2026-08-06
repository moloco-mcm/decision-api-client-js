import { Filtering, FilteringHttpRequestBody } from '../types/common';
import { CampaignMetadata } from '../types/external';
import {
  BrandAuctionParams,
  BrandAuctionHttpRequestBody,
  BrandAuctionHttpResponseBody,
  BrandAuctionData,
} from './types';

const translateFiltering = (
  filtering: Filtering
): FilteringHttpRequestBody => ({
  category: filtering.category && {
    operator: filtering.category.operator,
    categories: [...filtering.category.categories],
  },
  location: filtering.location && {
    locations: [...filtering.location.locations],
  },
  brand: filtering.brand && {
    brand_ids: filtering.brand.brandIds,
  },
  delivery: filtering.delivery && {
    delivery_option: filtering.delivery.deliveryOption,
    delivery_options: filtering.delivery.deliveryOptions && [
      ...filtering.delivery.deliveryOptions,
    ],
  },
  price: filtering.price && {
    min_price: filtering.price.minPrice,
    max_price: filtering.price.maxPrice,
  },
  sale_price: filtering.salePrice && {
    min_sale_price: filtering.salePrice.minSalePrice,
    max_sale_price: filtering.salePrice.maxSalePrice,
  },
  rating: filtering.rating && {
    min: filtering.rating.min,
    max: filtering.rating.max,
  },
  review_count: filtering.reviewCount && {
    min: filtering.reviewCount.min,
    max: filtering.reviewCount.max,
  },
  color: filtering.color && {
    colors: [...filtering.color.colors],
  },
  gender: filtering.gender && {
    genders: [...filtering.gender.genders],
  },
  size: filtering.size && {
    sizes: [...filtering.size.sizes],
  },
  material: filtering.material && {
    materials: [...filtering.material.materials],
  },
  pattern: filtering.pattern && {
    patterns: [...filtering.pattern.patterns],
  },
  condition: filtering.condition && {
    conditions: [...filtering.condition.conditions],
  },
  age_group: filtering.ageGroup && {
    age_groups: [...filtering.ageGroup.ageGroups],
  },
});

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
  inventories: params.inventories.map((inventory) => ({
    inventory_id: inventory.inventoryId,
    num_ads: inventory.numAds,
    items: inventory.items && [...inventory.items],
    categories: inventory.categories && [...inventory.categories],
    search_query: inventory.searchQuery,
    video: inventory.video && {
      format: inventory.video.format,
    },
    targeting: inventory.targeting && {
      key_values: inventory.targeting.keyValues?.map((keyValue) => ({
        key_id: keyValue.keyId,
        value_ids: keyValue.valueIds && [...keyValue.valueIds],
      })),
    },
    filtering: inventory.filtering && translateFiltering(inventory.filtering),
  })),
  page_id: params.pageId,
  personalization_mode: params.personalizationMode,
  response_setting: params.responseSetting && {
    campaign_metadata_fields: params.responseSetting.campaignMetadataFields && [
      ...params.responseSetting.campaignMetadataFields,
    ],
  },
  deduplication_setting: params.deduplicationSetting && {
    per_request: params.deduplicationSetting.perRequest && {
      method: params.deduplicationSetting.perRequest.method,
      criteria: params.deduplicationSetting.perRequest.criteria,
    },
    per_inventory: params.deduplicationSetting.perInventory && {
      criteria: params.deduplicationSetting.perInventory.criteria,
    },
  },
  filtering: params.filtering && translateFiltering(params.filtering),
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
        winPriceAdvertiser: ad.auction_result.win_price_advertiser && {
          currency: ad.auction_result.win_price_advertiser.currency,
          amountMicro: ad.auction_result.win_price_advertiser.amount_micro,
        },
        campaignMetadata: ad.auction_result.campaign_metadata && {
          adOperationType: ad.auction_result.campaign_metadata
            .ad_operation_type as CampaignMetadata['adOperationType'],
          alias: ad.auction_result.campaign_metadata.alias,
          adPayer: ad.auction_result.campaign_metadata.ad_payer,
        },
      },
      asset: ad.asset && {
        id: ad.asset.id,
        banner: ad.asset.banner && {
          ...(ad.asset.banner.media_type && {
            mediaType: ad.asset.banner.media_type,
          }),
          ...(ad.asset.banner.image_url && {
            imageUrl: ad.asset.banner.image_url,
          }),
          ...(ad.asset.banner.video_url && {
            videoUrl: ad.asset.banner.video_url,
          }),
          ...(ad.asset.banner.video_thumbnail_url && {
            videoThumbnailUrl: ad.asset.banner.video_thumbnail_url,
          }),
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
        trackId: ad.asset.track_id,
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
        trackId: item.track_id,
      })),
    })),
  })),
  invalidInputWarnings: data.invalid_input_warnings?.map((warning) => ({
    warningMessage: warning.warning_message,
    inventoryId: warning.inventory_id,
  })),
});
