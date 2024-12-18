import { AuctionResult, AdItem, Asset, LandingPage } from '../types/external';

export type BrandAuctionParams = {
  requestId: string;
  channelType?:
    | 'UNKNOWN_CHANNEL_TYPE'
    | 'APP'
    | 'SITE'
    | 'DESKTOP_SITE'
    | 'MOBILE_SITE';
  domain?: string;
  sessionId?: string;
  customId?: string;
  user?: {
    userId?: string;
    yearOfBirth?: number;
    // TODO: update other api to use gender enum
    gender?: 'UNKNOWN_GENDER' | 'MALE' | 'FEMALE' | 'OTHER';
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
    items?: string[];
    categories?: string[];
    searchQuery?: string;
  };
  pageId?: string;
  filtering?: {
    category?: {
      operator?: 'OR' | 'AND';
      categories: string[];
    };
    location?: { locations: string[] };
    brand?: { brandId: string };
    delivery?: { deliveryOption: string };
    price?: { minPrice: number; maxPrice: number };
    salePrice?: { minSalePrice: number; maxSalePrice: number };
  };
};

export type BrandAuctionHttpRequestBody = {
  request_id: string;
  channel_type?:
    | 'UNKNOWN_CHANNEL_TYPE'
    | 'APP'
    | 'SITE'
    | 'DESKTOP_SITE'
    | 'MOBILE_SITE'
    | 'DOOH';
  domain?: string;
  session_id?: string;
  custom_id?: string;
  user?: {
    user_id?: string;
    year_of_birth?: number;
    gender?: 'UNKNOWN_GENDER' | 'MALE' | 'FEMALE' | 'OTHER';
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
    items?: string[];
    categories?: string[];
    search_query?: string;
  };
  page_id?: string;
  filtering?: {
    category?: {
      operator?: 'OR' | 'AND';
      categories: string[];
    };
    location?: { locations: string[] };
    brand?: { brand_id: string };
    delivery?: { delivery_option: string };
    price?: { min_price: number; max_price: number };
    sale_price?: { min_sale_price: number; max_sale_price: number };
  };
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
          image_url: string;
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
