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
 * @category CreativeAdItem
 */
export type CreativeAdItem = {
  itemId: string;
  impTrackers: string[];
  clickTrackers: string[];
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
  apiDomain?: string;
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
}

/**
 * @category Auction
 */
export { AuctionData, AuctionParams } from '../auction/types';

/**
 * @category Recommendation
 */
export {
  RecommendationData,
  RecommendationParams,
} from '../recommendation/types';
