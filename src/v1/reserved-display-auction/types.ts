import {
  InvalidInputWarning,
  ReservedAsset,
  ReservedDisplayAdInfo,
  ReservedLandingPage,
} from '../types/external';

export type ReservedDisplayAuctionParams = {
  requestId: string;
  channelType?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE';
  domain?: string;
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
    targeting?: {
      keyValues?: {
        keyId: string;
        valueIds?: string[];
      }[];
    };
  }[];
  pageId?: string;
};

export type ReservedDisplayAuctionHttpRequestBody = {
  request_id: string;
  channel_type?: 'APP' | 'SITE' | 'DESKTOP_SITE' | 'MOBILE_SITE';
  domain?: string;
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
    targeting?: {
      key_values?: {
        key_id: string;
        value_ids?: string[];
      }[];
    };
  }[];
  page_id?: string;
};

export type ReservedDisplayAuctionHttpResponseBody = {
  request_id: string;
  decisions?: {
    inventory_id: string;
    ads?: {
      asset?: {
        id: string;
        banner?: {
          media_type?: 'IMAGE' | 'VIDEO';
          image_url?: string;
          alt_text?: string;
        };
        custom_text?: {
          text: string;
          color?: string;
          background_color?: string;
          display_title?: string;
        };
        headline?: {
          text: string;
          color?: string;
          background_color?: string;
          display_title?: string;
        };
        metadata?: {
          attributes?: Record<string, string>;
        };
        imp_trackers: string[];
        click_trackers: string[];
        track_id?: string;
      };
      landing_page?: {
        type: string;
        custom_url_setting?: {
          url: string;
        };
      };
      ad_info?: {
        ad_account_id: string;
        line_item_id: string;
      };
    }[];
  }[];
  invalid_input_warnings?: {
    warning_message: string;
    inventory_id: string;
  }[];
};

export type ReservedDisplayAuctionData = {
  requestId: string;
  decisions?: {
    inventoryId: string;
    ads?: {
      asset?: ReservedAsset;
      landingPage?: ReservedLandingPage;
      adInfo?: ReservedDisplayAdInfo;
    }[];
  }[];
  invalidInputWarnings?: InvalidInputWarning[];
};
