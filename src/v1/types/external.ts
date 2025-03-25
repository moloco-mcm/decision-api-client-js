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
};

/**
 * @category AdItem
 */
export type AdItem = {
  itemId: string;
  impTrackers: string[];
  clickTrackers: string[];
};

/**
 * @category Asset
 */
export type Asset = {
  id: string;
  banner?: {
    imageUrl: string;
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
   */
  auction: (params: AuctionParams) => Promise<AuctionData>;
  /**
   * Send an auction request for creative ads. Throws one of the errors defined in {@link v1.errors}.
   */
  creativeAuction: (
    params: CreativeAuctionParams
  ) => Promise<CreativeAuctionData>;
  /**
   * Send an bulk auction request for creative ads. Throws one of the errors defined in {@link v1.errors}.
   */
  creativeAuctionBulk: (
    params: CreativeAuctionBulkParams
  ) => Promise<CreativeAuctionBulkData>;
  /**
   * Send a recommendation request. Throws one of the errors defined in {@link v1.errors}.
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
