import {
  ReservedDisplayAuctionParams,
  ReservedDisplayAuctionHttpRequestBody,
  ReservedDisplayAuctionHttpResponseBody,
  ReservedDisplayAuctionData,
} from './types';

export const translateReservedDisplayAuctionParamsToReservedDisplayAuctionHttpRequestBody =
  (
    params: ReservedDisplayAuctionParams
  ): ReservedDisplayAuctionHttpRequestBody => ({
    request_id: params.requestId,
    channel_type: params.channelType,
    domain: params.domain,
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
      targeting: inventory.targeting && {
        key_values: inventory.targeting.keyValues?.map((kv) => ({
          key_id: kv.keyId,
          value_ids: kv.valueIds && [...kv.valueIds],
        })),
      },
    })),
    page_id: params.pageId,
  });

export const translateReservedDisplayAuctionHttpResponseBodyToReservedDisplayAuctionData =
  (
    data: ReservedDisplayAuctionHttpResponseBody
  ): ReservedDisplayAuctionData => ({
    requestId: data.request_id,
    decisions: data.decisions?.map((decision) => ({
      inventoryId: decision.inventory_id,
      ads: decision.ads?.map((ad) => ({
        asset: ad.asset && {
          id: ad.asset.id,
          banner: ad.asset.banner && {
            ...(ad.asset.banner.media_type && {
              mediaType: ad.asset.banner.media_type,
            }),
            ...(ad.asset.banner.image_url && {
              imageUrl: ad.asset.banner.image_url,
            }),
            ...(ad.asset.banner.alt_text && {
              altText: ad.asset.banner.alt_text,
            }),
          },
          customText: ad.asset.custom_text && {
            text: ad.asset.custom_text.text,
            color: ad.asset.custom_text.color,
            backgroundColor: ad.asset.custom_text.background_color,
            displayTitle: ad.asset.custom_text.display_title,
          },
          headline: ad.asset.headline && {
            text: ad.asset.headline.text,
            color: ad.asset.headline.color,
            backgroundColor: ad.asset.headline.background_color,
            displayTitle: ad.asset.headline.display_title,
          },
          metadata: ad.asset.metadata && {
            attributes: ad.asset.metadata.attributes,
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
        },
        adInfo: ad.ad_info && {
          adAccountId: ad.ad_info.ad_account_id,
          lineItemId: ad.ad_info.line_item_id,
        },
      })),
    })),
    invalidInputWarnings: data.invalid_input_warnings?.map((warning) => ({
      warningMessage: warning.warning_message,
      inventoryId: warning.inventory_id,
    })),
  });
