import { DecidedItem } from '../types/external';
import { Filtering, FilteringHttpRequestBody } from '../types/common';
export type AuctionParams = {
  requestId: string;
  channelType?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE';
  domain?: string;
  sessionId?: string;
  customId?: string;
  user?: {
    userId?: string;
    yearOfBirth?: number;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
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
  inventory: {
    inventoryId: string;
    numItems: number;
    items?: string[];
    categories?: string[];
    searchQuery?: string;
    searchMetadata?: {
      synonyms?: string[];
    };
  };
  pageId?: string;
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
};

export type AuctionHttpRequestBody = {
  request_id: string;
  channel_type?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE';
  domain?: string;
  session_id?: string;
  custom_id?: string;
  user?: {
    user_id?: string;
    year_of_birth?: number;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
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
  inventory: {
    inventory_id: string;
    num_items: number;
    items?: string[];
    categories?: string[];
    search_query?: string;
    search_metadata?: {
      synonyms?: string[];
    };
  };
  page_id?: string;
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
};

export type AuctionHttpResponseBody = {
  request_id: string;
  decided_items: {
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
};

export type AuctionData = {
  requestId: string;
  decidedItems: DecidedItem[];
};
