import { DecidedItem } from '../types/external';

export type AuctionParams = {
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

export type AuctionHttpRequestBody = {
  request_id: string;
  session_id?: string;
  custom_id?: string;
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
