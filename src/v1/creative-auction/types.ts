import { AuctionResult, Banner, CreativeAdItem } from '../types/external';

export type CreativeAuctionParams = {
  requestId: string;
  sessionId?: string;
  customId?: string;
  user?: {
    userId?: string;
    yearOfBirth?: number;
    gender?: string;
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
      operator?: string;
      categories: string[];
    };
    location?: { locations: string[] };
    brand?: { brandId: string };
    delivery?: { deliveryOption: string };
    price?: { minPrice: number; maxPrice: number };
    salePrice?: { minSalePrice: number; maxSalePrice: number };
  };
};

export type CreativeAuctionHttpRequestBody = {
  request_id: string;
  session_id?: string;
  user?: {
    user_id?: string;
    year_of_birth?: number;
    gender?: string;
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
      operator?: string;
      categories: string[];
    };
    location?: { locations: string[] };
    brand?: { brand_id: string };
    delivery?: { delivery_option: string };
    price?: { min_price: number; max_price: number };
    sale_price?: { min_sale_price: number; max_sale_price: number };
  };
};

export type CreativeAuctionHttpResponseBody = {
  request_id: string;
  auction_result?: {
    ad_account_id: string;
    campaign_id: string;
    win_price?: {
      currency: string;
      amount_micro: string;
    };
  };
  banner?: {
    creative_id: string;
    image_url: string;
    imp_trackers: string[];
    click_trackers: string[];
  };
  items?: {
    item_id: string;
    imp_trackers: string[];
    click_trackers: string[];
  }[];
};

export type CreativeAuctionData = {
  requestId: string;
  auctionResult?: AuctionResult;
  banner?: Banner;
  items?: CreativeAdItem[];
};
