import { AuctionData, AuctionParams } from '../auction/types';
import {
  CreativeAuctionBulkData,
  CreativeAuctionBulkParams,
} from '../creative-auction-bulk/types';
import {
  CreativeAuctionData,
  CreativeAuctionParams,
} from '../creative-auction/types';
import {
  RecommendationData,
  RecommendationParams,
} from '../recommendation/types';
import { BrandAuctionData, BrandAuctionParams } from '../brand-auction/types';
import {
  DisplayAuctionData,
  DisplayAuctionParams,
} from '../display-auction/types';
import {
  ProductAuctionData,
  ProductAuctionParams,
} from '../product-auction/types';
import {
  ReservedDisplayAuctionData,
  ReservedDisplayAuctionParams,
} from '../reserved-display-auction/types';

/**
 * @category CampaignMetadata
 */
export type CampaignMetadata = {
  adOperationType?:
    | 'AD_OPERATION_TYPE_DEFAULT'
    | 'AD_OPERATION_TYPE_SELF_SERVED'
    | 'AD_OPERATION_TYPE_MANAGED';
  alias?: string;
};

/**
 * @category CampaignResponseSetting
 */
export type CampaignResponseSetting = {
  campaignMetadataFields?: ('FIELD_UNKNOWN' | 'AD_OPERATION_TYPE' | 'ALIAS')[];
};

/**
 * @category AuctionResult
 */
export type AuctionResult = {
  adAccountId: string;
  campaignId: string;
  winPrice?: {
    currency: string;
    amountMicro: string;
  };
  campaignMetadata?: CampaignMetadata;
};

/**
 * @category AdItem
 */
export type AdItem = {
  itemId: string;
  impTrackers: string[];
  clickTrackers: string[];
  trackId?: string;
};

/**
 * @category Asset
 */
export type Asset = {
  id: string;
  banner?: {
    mediaType?: 'IMAGE' | 'VIDEO';
    imageUrl?: string;
    videoUrl?: string;
    videoThumbnailUrl?: string;
  };
  logo?: {
    imageUrl: string;
  };
  headline?: {
    text: string;
  };
  cta?: {
    text: string;
  };
  impTrackers: string[];
  clickTrackers: string[];
  trackId?: string;
};

/**
 * @category LandingPage
 */
export type LandingPage = {
  type: string;
  customUrlSetting?: {
    url: string;
  };
  productDetailSetting?: {
    itemId: string;
  };
  productListSetting?: Record<string, unknown>;
};

/**
 * @category ReservedLandingPage
 */
export type ReservedLandingPage = {
  type: string;
  customUrlSetting?: {
    url: string;
  };
};

/**
 * @category ReservedDisplayAdInfo
 */
export type ReservedDisplayAdInfo = {
  adAccountId: string;
  lineItemId: string;
};

/**
 * @category ReservedAsset
 */
export type ReservedAsset = {
  id: string;
  banner?: {
    mediaType?: 'IMAGE' | 'VIDEO';
    imageUrl?: string;
    altText?: string;
  };
  customText?: {
    text: string;
    color?: string;
    backgroundColor?: string;
    displayTitle?: string;
  };
  headline?: {
    text: string;
    color?: string;
    backgroundColor?: string;
    displayTitle?: string;
  };
  metadata?: {
    attributes?: Record<string, string>;
  };
  impTrackers: string[];
  clickTrackers: string[];
  trackId?: string;
};

/**
 * @category InvalidInputWarning
 */
export type InvalidInputWarning = {
  warningMessage: string;
  inventoryId: string;
};

/**
 * @category Banner
 */
export type Banner = {
  creativeId: string;
  imageUrl: string;
  impTrackers: string[];
  clickTrackers: string[];
};

/**
 * @category Item
 */
export type DecidedItem = {
  itemId: string;
  auctionResult?: AuctionResult;
  impTrackers: string[];
  clickTrackers: string[];
  trackId?: string;
};

/**
 * @category Client
 */
export type CreateClientOptions = {
  baseURL?: string;
  region?: string;
  platformId: string;
  apiKey: string;
};

/**
 * @category Client
 */
export interface Client {
  /**
   * Send an auction request. Throws one of the errors defined in {@link v1.errors}.
   * @deprecated Use productAuction instead for multi-inventory support.
   */
  auction: (params: AuctionParams) => Promise<AuctionData>;
  /**
   * Send an auction request for creative ads. Throws one of the errors defined in {@link v1.errors}.
   * @deprecated Use displayAuction instead for similar functionality.
   */
  creativeAuction: (
    params: CreativeAuctionParams
  ) => Promise<CreativeAuctionData>;
  /**
   * Send an bulk auction request for creative ads. Throws one of the errors defined in {@link v1.errors}.
   * @deprecated Use brandAuction for bulk creative auction functionality.
   */
  creativeAuctionBulk: (
    params: CreativeAuctionBulkParams
  ) => Promise<CreativeAuctionBulkData>;
  /**
   * Send a recommendation request. Throws one of the errors defined in {@link v1.errors}.
   * @deprecated This API is no longer supported in the current specification.
   */
  recommendation: (params: RecommendationParams) => Promise<RecommendationData>;
  /**
   * Send a brand auction request. Throws one of the errors defined in {@link v1.errors}.
   */
  brandAuction: (params: BrandAuctionParams) => Promise<BrandAuctionData>;
  /**
   * Send a display auction request. Throws one of the errors defined in {@link v1.errors}.
   */
  displayAuction: (params: DisplayAuctionParams) => Promise<DisplayAuctionData>;
  /**
   * Send a product auction request. Throws one of the errors defined in {@link v1.errors}.
   */
  productAuction: (params: ProductAuctionParams) => Promise<ProductAuctionData>;
  /**
   * Send a reserved display auction request. Throws one of the errors defined in {@link v1.errors}.
   */
  reservedDisplayAuction: (
    params: ReservedDisplayAuctionParams
  ) => Promise<ReservedDisplayAuctionData>;
}

/**
 * @category Auction
 */
export { AuctionData, AuctionParams } from '../auction/types';

/**
 * @category BrandAuction
 */
export { BrandAuctionData, BrandAuctionParams } from '../brand-auction/types';

/**
 * @category Recommendation
 */
export {
  RecommendationData,
  RecommendationParams,
} from '../recommendation/types';

/**
 * @category DisplayAuction
 */
export {
  DisplayAuctionData,
  DisplayAuctionParams,
} from '../display-auction/types';

/**
 * @category ProductAuction
 */
export {
  ProductAuctionData,
  ProductAuctionParams,
} from '../product-auction/types';

/**
 * @category ReservedDisplayAuction
 */
export {
  ReservedDisplayAuctionData,
  ReservedDisplayAuctionParams,
} from '../reserved-display-auction/types';
