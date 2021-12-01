import { rest } from 'msw';

import { setupServer } from '../../../mocks/v1/server';
import {
  ForbiddenError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors';
import { createClient } from '..';
import { KNOWN_PLATFORM_ID, REGISTERED_API_KEY } from '../../../mocks/v1/data';
import { AUCTION_PARAMS, MOCK_BASE_URL } from './consts';

const server = setupServer(MOCK_BASE_URL);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('client should throw the correct type of error', () => {
  test('should throw UnauthorizedError when api key is not provided', async () => {
    const client = createClient({
      baseURL: `${MOCK_BASE_URL}`,
      apiKey: '',
      platformId: KNOWN_PLATFORM_ID,
    });
    await expect(client.auction(AUCTION_PARAMS)).rejects.toThrow(
      UnauthorizedError
    );
  });

  test('should throw ForbiddenError when wrong api key is provided', async () => {
    const client = createClient({
      baseURL: `${MOCK_BASE_URL}`,
      apiKey: 'wrong-key',
      platformId: KNOWN_PLATFORM_ID,
    });
    await expect(client.auction(AUCTION_PARAMS)).rejects.toThrow(
      ForbiddenError
    );
  });

  test('should throw NotFoundError when wrong platform id is provided', async () => {
    const client = createClient({
      baseURL: `${MOCK_BASE_URL}`,
      apiKey: REGISTERED_API_KEY,
      platformId: 'unknown_platform_id',
    });
    await expect(client.auction(AUCTION_PARAMS)).rejects.toThrow(NotFoundError);
  });

  test('should throw NetworkError when network error is occurred', async () => {
    server.use(
      rest.post(
        `${MOCK_BASE_URL}/rmp/decision/v1/platforms/:platformId/auction`,
        (_req, res) => {
          return res.networkError('failed to connect');
        }
      )
    );

    const client = createClient({
      baseURL: `${MOCK_BASE_URL}`,
      apiKey: REGISTERED_API_KEY,
      platformId: KNOWN_PLATFORM_ID,
    });
    await expect(client.auction(AUCTION_PARAMS)).rejects.toThrow(NetworkError);
  });
});
