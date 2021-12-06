import { AuctionParams } from '../auction/types';

export const MOCK_BASE_URL = 'http://mock';

export const AUCTION_PARAMS: AuctionParams = {
  requestId: 'test_request_id',
  sessionId: 'test_session_id',
  user: {
    userId: 'test_user_id',
    yearOfBirth: 1994,
    gender: 'MALE',
    interests: ['outdoor', 'music'],
  },
  device: {
    os: 'ios',
    osVersion: '14.1',
    advertisingId: '7acefbed-d1f6-4e4e-aa26-74e93dd017e4',
    uniqueDeviceId: 'test_device_id',
    model: 'iPhone 7',
    ip: '127.0.0.1',
  },
  inventory: {
    inventoryId: 'my_inventory',
    type: 'HOME',
    numItems: 50,
    items: ['test_item_id_1', 'test_item_id_2'],
    categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
    searchQuery: 'test_query',
  },
  options: {
    requireItemMetadata: true,
    requireScore: true,
  },
};
