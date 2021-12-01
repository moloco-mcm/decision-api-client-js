export type AuctionResult = {
  adAccountId: string;
  campaignId: string;
  winPrice?: {
    currency: string;
    amountMicro: string;
  };
};

// TODO: use separate type for DecidedItem from recommendation api (@sjhan-moloco)
export type DecidedItem = {
  itemId: string;
  auctionResult?: AuctionResult;
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
