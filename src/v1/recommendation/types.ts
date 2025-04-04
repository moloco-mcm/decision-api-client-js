import { DecidedItem } from '../types/external';

export type RecommendationParams = {
  requestId: string;
  sessionId?: string;
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
    ip?: string;
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
};

export type RecommendationHttpRequestBody = {
  request_id: string;
  session_id?: string;
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
    ip?: string;
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
    track_id?: string;
  }[];
};

export type RecommendationData = {
  requestId: string;
  decidedItems: DecidedItem[];
};
