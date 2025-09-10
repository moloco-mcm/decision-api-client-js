import { Filtering, FilteringHttpRequestBody } from '../types/common';
import { DecidedItem } from '../types/external';

export type ProductAuctionParams = {
  requestId: string;
  channelType?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE';
  domain?: string;
  sessionId?: string;
  customId?: string;
  user?: {
    userId?: string;
    interests?: string[];
  };
  device?: {
    os?: string;
    osVersion?: string;
    advertisingId?: string;
    uniqueDeviceId?: string;
    model?: string;
    persistentId?: string;
  };
  inventories: {
    inventoryId: string;
    numAds?: number;
    inventoryItems?: {
      itemId: string;
      itemGroupId?: string;
    }[];
    categories?: string[];
    searchQuery?: string;
    searchMetadata?: {
      synonyms?: string[];
    };
    customItemPool?: {
      items: {
        id: string;
        context?: {
          shippingCharge?: {
            currency: string;
            amountMicro: string;
          };
          distance?: number;
          discount?: {
            rate?: number;
            priceAmount?: { currency: string; amountMicro: string };
          };
        };
        score?: { qualityScore: number };
      }[];
    };
    filtering?: Filtering;
  }[];
  pageId?: string;
  deduplicationSetting?: {
    perRequest?: {
      method?: 'METHOD_DEFAULT' | 'METHOD_WATERFALL';
      criteria?: 'CRITERIA_DEFAULT' | 'CRITERIA_NONE' | 'CRITERIA_ITEM_ID';
    };
  };
};

export type ProductAuctionHttpRequestBody = {
  request_id: string;
  channel_type?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE';
  domain?: string;
  session_id?: string;
  custom_id?: string;
  user?: {
    user_id?: string;
    interests?: string[];
  };
  device?: {
    os?: string;
    os_version?: string;
    advertising_id?: string;
    unique_device_id?: string;
    model?: string;
    persistent_id?: string;
  };
  inventories: {
    inventory_id: string;
    num_ads?: number;
    inventory_items?: {
      item_id: string;
      item_group_id?: string;
    }[];
    categories?: string[];
    search_query?: string;
    search_metadata?: {
      synonyms?: string[];
    };
    custom_item_pool?: {
      items: {
        id: string;
        context?: {
          shipping_charge?: {
            currency: string;
            amount_micro: string;
          };
          distance?: number;
          discount?: {
            rate?: number;
            price_amount?: { currency: string; amount_micro: string };
          };
        };
        score?: { quality_score: number };
      }[];
    };
    filtering?: FilteringHttpRequestBody;
  }[];
  page_id?: string;
  deduplication_setting?: {
    per_request?: {
      method?: 'METHOD_DEFAULT' | 'METHOD_WATERFALL';
      criteria?: 'CRITERIA_DEFAULT' | 'CRITERIA_NONE' | 'CRITERIA_ITEM_ID';
    };
  };
};

export type ProductAuctionHttpResponseBody = {
  request_id: string;
  decisions?: {
    inventory_id: string;
    decided_items?: {
      item_id: string;
      auction_result?: {
        ad_account_id: string;
        campaign_id: string;
        win_price?: {
          currency: string;
          amount_micro: string;
        };
      };
      imp_trackers: string[];
      click_trackers: string[];
      track_id?: string;
    }[];
  }[];
};

export type ProductAuctionData = {
  requestId: string;
  decisions?: {
    inventoryId: string;
    decidedItems?: DecidedItem[];
  }[];
};
