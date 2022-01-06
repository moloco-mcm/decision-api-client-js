import { AuctionData, AuctionParams } from '../auction/types';
import {
  RecommendationData,
  RecommendationParams,
} from '../recommendation/types';

/**
 * @category Item
 */
export type DecidedItem = {
  itemId: string;
  auctionResult?: {
    adAccountId: string;
    campaignId: string;
    winPrice?: {
      currency: string;
      amountMicro: string;
    };
  };
  impTrackers: string[];
  clickTrackers: string[];
  metadata?: {
    item?: {
      title: string;
      categories?: string[];
      imageUrls?: string[];
      price: {
        currency: string;
        amount: number;
      };
    };
    score?: number;
  };
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
   * Send a recommendation request. Throws one of the errors defined in {@link v1.errors}.
   */
  recommendation: (params: RecommendationParams) => Promise<RecommendationData>;
}

/**
 * @category Auction
 */
export { AuctionParams, AuctionData } from '../auction/types';

/**
 * @category Recommendation
 */
export {
  RecommendationParams,
  RecommendationData,
} from '../recommendation/types';
