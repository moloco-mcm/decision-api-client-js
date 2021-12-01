import { DecidedItem } from '../types/external';

export type RecommendationParams = {
  requestId: string;
  sessionId?: string;
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
    ip?: string;
  };
  inventory: {
    inventoryId: string;
    type: string;
    numItems: number;
    items?: string[];
    categories?: string[];
    searchQuery?: string;
  };
  options?: {
    requireItemMetadata?: boolean;
    requireScore?: boolean;
  };
};

export type RecommendationHttpRequestBody = {
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
    ip?: string;
  };
  inventory: {
    inventory_id: string;
    type: string;
    num_items: number;
    items?: string[];
    categories?: string[];
    search_query?: string;
  };
  options?: {
    require_item_metadata?: boolean;
    require_score?: boolean;
  };
};

export type RecommendationHttpResponseBody = {
  request_id: string;
  decided_items: {
    item_id: string;
    // TODO: remove auction_result field once API doc is updated (@sjhan-moloco)
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
    metadata?: {
      item?: {
        title: string;
        categories?: string[];
        image_urls?: string[];
        price: {
          currency: string;
          amount: number;
        };
      };
      score?: number;
    };
  }[];
};

export type RecommendationResult = {
  requestId: string;
  // TODO: use separated type once API doc is updated  (@sjhan-moloco)
  decidedItems: DecidedItem[];
};
