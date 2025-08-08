import { Filtering, FilteringHttpRequestBody } from '../types/common';
import { AuctionResult, AdItem, Asset, LandingPage } from '../types/external';

export type BrandAuctionParams = {
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
    items?: string[];
    categories?: string[];
    searchQuery?: string;
    video?: {
      format?: 'MP4_360P' | 'MP4_720P' | 'HLS';
    };
  }[];
  pageId?: string;
  filtering?: Filtering;
};

export type BrandAuctionHttpRequestBody = {
  request_id: string;
  channel_type?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE' | 'DOOH';
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
    items?: string[];
    categories?: string[];
    search_query?: string;
    video?: {
      format?: 'MP4_360P' | 'MP4_720P' | 'HLS';
    };
  }[];
  page_id?: string;
  filtering?: FilteringHttpRequestBody;
};

export type BrandAuctionHttpResponseBody = {
  request_id: string;
  decisions?: {
    inventory_id: string;
    ads: {
      auction_result?: {
        ad_account_id: string;
        campaign_id: string;
        win_price?: {
          currency: string;
          amount_micro: string;
        };
      };
      asset: {
        id: string;
        banner?: {
          media_type?: 'IMAGE' | 'VIDEO';
          image_url?: string;
          video_url?: string;
          video_thumbnail_url?: string;
        };
        logo?: {
          image_url: string;
        };
        headline?: {
          text: string;
        };
        cta?: {
          text: string;
        };
        imp_trackers: string[];
        click_trackers: string[];
      };
      landing_page?: {
        type: string;
        custom_url_setting?: {
          url: string;
        };
        product_detail_setting?: {
          item_id: string;
        };
        product_list_setting?: Record<string, unknown>;
      };
      items?: {
        item_id: string;
        imp_trackers: string[];
        click_trackers: string[];
      }[];
    }[];
  }[];
};

export type BrandAuctionData = {
  requestId: string;
  decisions?: {
    inventoryId: string;
    ads: {
      auctionResult?: AuctionResult;
      asset?: Asset;
      landingPage?: LandingPage;
      items?: AdItem[];
    }[];
  }[];
};
