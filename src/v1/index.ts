import Axios from 'axios';
import auction from './auction';
import creativeAuction from './creative-auction';
import creativeAuctionBulk from './creative-auction-bulk';
import recommendation from './recommendation';

import { Client, Context, CreateClientOptions } from './types';

/**
 * Creates a new instance of API client.
 * Example
 * ```typescript
 * const client = v1.createClient({
 *   apiKey: process.env.RMP_DECISION_API_KEY,
 *   platformId: process.env.RMP_PLATFORM_ID,
 * });
 * ```
 *
 * @category Client
 */
export function createClient(options: CreateClientOptions): Client {
  const { baseURL, region = 'sel', platformId, apiKey } = options;

  const url = baseURL ?? `https://dcsn-${region}.rmp-api.moloco.com`;

  const axios = Axios.create({
    baseURL: `${url}/rmp/decision/v1`,
    headers: {
      'x-api-key': apiKey,
    },
  });

  const context: Context = {
    axios,
    platformId,
  };

  return {
    auction: auction(context),
    creativeAuction: creativeAuction(context),
    creativeAuctionBulk: creativeAuctionBulk(context),
    recommendation: recommendation(context),
  };
}

// export error types
/**
 * @category Error
 */
export * as errors from './utils/errors';

// export common data types
export * from './types/external';
