import { AuctionData, AuctionParams } from '../auction/types';
import {
  RecommendationData,
  RecommendationParams,
} from '../recommendation/types';

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

export type CreateClientOptions = {
  baseURL?: string;
  region?: string;
  platformId: string;
  apiKey: string;
};

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

export { AuctionParams, AuctionData } from '../auction/types';

export {
  RecommendationParams,
  RecommendationData,
} from '../recommendation/types';
