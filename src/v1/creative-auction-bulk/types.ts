import { Filtering, FilteringHttpRequestBody } from '../types/common';
import { AuctionResult, Banner, AdItem } from '../types/external';

export type CreativeAuctionBulkParams = {
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
  inventories: {
    inventoryId: string;
    items?: string[];
    categories?: string[];
    searchQuery?: string;
  }[];
  pageId?: string;
  filtering?: Filtering;
};

export type CreativeAuctionBulkHttpRequestBody = {
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
  inventories: {
    inventory_id: string;
    items?: string[];
    categories?: string[];
    search_query?: string;
  }[];
  page_id?: string;
  filtering?: FilteringHttpRequestBody;
};

export type CreativeAuctionBulkHttpResponseBody = {
  request_id: string;
  results?: {
    auction_result?: {
      ad_account_id: string;
      campaign_id: string;
      win_price?: {
        currency: string;
        amount_micro: string;
      };
    };
    creatives?: {
      banner?: {
        creative_id: string;
        image_url: string;
        imp_trackers: string[];
        click_trackers: string[];
      };
    }[];
    items?: {
      item_id: string;
      imp_trackers: string[];
      click_trackers: string[];
    }[];
  }[];
};

export type CreativeAuctionBulkData = {
  requestId: string;
  results?: {
    auctionResult?: AuctionResult;
    creatives?: {
      banner?: Banner;
    }[];
    items?: AdItem[];
  }[];
};
