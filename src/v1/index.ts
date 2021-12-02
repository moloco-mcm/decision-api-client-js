import Axios from 'axios';
import auction from './auction';
import recommendation from './recommendation';
import { Context } from './types';

export type CreateClientOptions = {
  baseURL?: string;
  region?: string;
  platformId: string;
  apiKey: string;
};

export function createClient(options: CreateClientOptions) {
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
    recommendation: recommendation(context),
  };
}

// export error types
export * as errors from './utils/errors';

// export common data types
export * from './types/external';
