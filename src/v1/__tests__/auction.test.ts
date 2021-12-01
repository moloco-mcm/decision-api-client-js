import { setupServer } from '../../../mocks/v1/server';
import { KNOWN_PLATFORM_ID, REGISTERED_API_KEY } from '../../../mocks/v1/data';
import { createClient } from '..';
import { AUCTION_PARAMS, MOCK_BASE_URL } from './consts';

const server = setupServer(MOCK_BASE_URL);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('/auction', () => {
  const client = createClient({
    baseURL: `${MOCK_BASE_URL}`,
    apiKey: REGISTERED_API_KEY,
    platformId: KNOWN_PLATFORM_ID,
  });

  test('should return auction result', async () => {
    const result = await client.auction(AUCTION_PARAMS);

    expect(result).toMatchObject({
      requestId: 'test_request_id',
    });

    result.decidedItems.forEach((item) => {
      expect(item).toMatchObject({
        itemId: expect.any(String),
        // TODO: add more detailed object shape validation if needed
      });
    });
  });
});
