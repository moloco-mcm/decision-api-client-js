import { AuctionParams } from '../auction/types';

export const MOCK_BASE_URL = 'http://mock';

export const AUCTION_PARAMS: AuctionParams = {
  requestId: 'test_request_id',
  channelType: 'APP',
  domain: 'test_domain',
  sessionId: 'test_session_id',
  customId: 'test_custom_id',
  user: {
    userId: 'test_user_id',
    interests: ['outdoor', 'music'],
  },
  device: {
    os: 'ios',
    osVersion: '14.1',
    advertisingId: '7acefbed-d1f6-4e4e-aa26-74e93dd017e4',
    uniqueDeviceId: 'test_device_id',
    model: 'iPhone 7',
    persistentId: 'test_persistent_id',
  },
  inventory: {
    inventoryId: 'my_inventory',
    numItems: 50,
    items: ['test_item_id_1', 'test_item_id_2'],
    categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
    searchQuery: 'test_query',
    searchMetadata: {
      synonyms: ['test_synonym_1', 'test_synonym_2'],
    },
  },
  pageId: 'test_page_id',
  customItemPool: {
    items: [
      {
        id: 'test_item_id_1',
        context: {
          shippingCharge: { currency: 'USD', amountMicro: '100' },
          distance: 10,
          discount: {
            rate: 0.1,
            priceAmount: { currency: 'USD', amountMicro: '10' },
          },
        },
        score: { qualityScore: 10 },
      },
    ],
  },
  filtering: {
    category: {
      operator: 'OR',
      categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
    },
    location: {
      locations: ['test_location_1', 'test_location_2'],
    },
    brand: {
      brandIds: ['test_brand_id_1', 'test_brand_id_2'],
    },
    delivery: {
      deliveryOption: 'test_delivery_option',
    },
    price: {
      minPrice: 10,
      maxPrice: 100,
    },
    salePrice: {
      minSalePrice: 10,
      maxSalePrice: 100,
    },
  },
};
