import { rest } from 'msw';
import * as faker from 'faker';

import {
  AuctionHttpRequestBody,
  AuctionHttpResponseBody,
} from '../../src/v1/auction/types';
import { KNOWN_PLATFORM_ID, REGISTERED_API_KEY } from './data';

type Config = {
  baseURL: string;
};

const auction = (config: Config) => {
  return rest.post<AuctionHttpRequestBody>(
    `${config.baseURL}/platforms/:platformId/auction`,
    (req, res, ctx) => {
      const header = req.headers.get('x-api-key');
      if (!header) {
        return res(ctx.status(401));
      }

      if (header !== REGISTERED_API_KEY) {
        return res(ctx.status(403));
      }

      const { platformId } = req.params;
      if (platformId !== KNOWN_PLATFORM_ID) {
        return res(ctx.status(404));
      }

      const { num_items } = req.body.inventory;

      const response: AuctionHttpResponseBody = {
        request_id: req.body.request_id,
        decided_items: Array(num_items)
          .fill(1)
          .map(() => ({
            item_id: faker.random.alphaNumeric(16),
            auction_result: {
              ad_account_id: faker.random.alphaNumeric(16),
              campaign_id: faker.random.alphaNumeric(16),
              win_price: {
                currency: 'USD',
                amount_micro: `${faker.datatype.number(1000000)}`,
              },
            },
            imp_trackers: [
              'https://mock-imp-tracker-1',
              'https://mock-imp-tracker-2',
            ],
            click_trackers: [
              'https://mock-click-tracker-1',
              'https://mock-click-tracker-2',
            ],
          })),
      };

      return res(ctx.json(response));
    }
  );
};

const recommendation = (config: Config) => {
  return rest.post<AuctionHttpRequestBody>(
    `${config.baseURL}/platforms/:platformId/recommendation`,
    (req, res, ctx) => {
      const header = req.headers.get('x-api-key');
      if (!header) {
        return res(ctx.status(401));
      }

      if (header !== REGISTERED_API_KEY) {
        return res(ctx.status(403));
      }

      const { platformId } = req.params;
      if (platformId !== KNOWN_PLATFORM_ID) {
        return res(ctx.status(404));
      }

      const { num_items } = req.body.inventory;

      const response: AuctionHttpResponseBody = {
        request_id: req.body.request_id,
        decided_items: Array(num_items)
          .fill(1)
          .map(() => ({
            item_id: faker.random.alphaNumeric(16),
            auction_result: {
              ad_account_id: faker.random.alphaNumeric(16),
              campaign_id: faker.random.alphaNumeric(16),
              win_price: {
                currency: 'USD',
                amount_micro: `${faker.datatype.number(1000000)}`,
              },
            },
            imp_trackers: [
              'https://mock-imp-tracker-1',
              'https://mock-imp-tracker-2',
            ],
            click_trackers: [
              'https://mock-click-tracker-1',
              'https://mock-click-tracker-2',
            ],
          })),
      };

      return res(ctx.json(response));
    }
  );
};

export const getHandlers = (options: { baseURL: string }) => {
  const { baseURL } = options;

  const config = {
    baseURL: `${baseURL}/rmp/decision/v1`,
  };

  return [auction(config), recommendation(config)];
};
