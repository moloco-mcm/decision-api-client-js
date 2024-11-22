import { AuctionHttpResponseBody, AuctionParams } from '../types';
import {
  translateAuctionParamsToAuctionHttpRequestBody,
  translateAuctionHttpResponseBodyToAuctionResult,
} from '../utils';

describe('auction/utils', () => {
  test('translateAuctionParamsToAuctionHttpRequestBody', () => {
    const params: AuctionParams = {
      requestId: 'test_request_id',
      sessionId: 'test_session_id',
      customId: 'test_custom_id',
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
        persistentId: 'test_persistent_id',
      },
      inventory: {
        inventoryId: 'my_inventory',
        numItems: 10,
        items: ['test_item_id_1', 'test_item_id_2'],
        categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
        searchQuery: 'test_query',
        searchMetadata: {
          synonyms: ['vehicle', 'automobile'],
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
          brandId: 'test_brand_id',
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

    expect(
      translateAuctionParamsToAuctionHttpRequestBody(params)
    ).toMatchObject({
      request_id: 'test_request_id',
      session_id: 'test_session_id',
      custom_id: 'test_custom_id',
      user: {
        user_id: 'test_user_id',
        year_of_birth: 1994,
        gender: 'MALE',
        interests: ['outdoor', 'music'],
      },
      device: {
        os: 'ios',
        os_version: '14.1',
        advertising_id: '7acefbed-d1f6-4e4e-aa26-74e93dd017e4',
        unique_device_id: 'test_device_id',
        model: 'iPhone 7',
        persistent_id: 'test_persistent_id',
      },
      inventory: {
        inventory_id: 'my_inventory',
        num_items: 10,
        items: ['test_item_id_1', 'test_item_id_2'],
        categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
        search_query: 'test_query',
        search_metadata: {
          synonyms: ['vehicle', 'automobile'],
        },
      },
      page_id: 'test_page_id',
      custom_item_pool: {
        items: [
          {
            id: 'test_item_id_1',
            context: {
              shipping_charge: { currency: 'USD', amount_micro: '100' },
              distance: 10,
              discount: {
                rate: 0.1,
                price_amount: { currency: 'USD', amount_micro: '10' },
              },
            },
            score: { quality_score: 10 },
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
          brand_id: 'test_brand_id',
        },
        delivery: {
          delivery_option: 'test_delivery_option',
        },
        price: {
          min_price: 10,
          max_price: 100,
        },
        sale_price: {
          min_sale_price: 10,
          max_sale_price: 100,
        },
      },
    });
  });

  test('translateAuctionHttpResponseBodyToAuctionResult', () => {
    const data: AuctionHttpResponseBody = {
      request_id: 'test_request_id',
      decided_items: [
        {
          item_id: 'test_item_id',
          auction_result: {
            ad_account_id: 'test_ad_account_id',
            campaign_id: 'test_campaign_id',
            win_price: {
              currency: 'USD',
              amount_micro: '100',
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
          track_id: 'test_track_id',
        },
      ],
    };

    expect(translateAuctionHttpResponseBodyToAuctionResult(data)).toMatchObject(
      {
        requestId: 'test_request_id',
        decidedItems: [
          {
            itemId: 'test_item_id',
            auctionResult: {
              adAccountId: 'test_ad_account_id',
              campaignId: 'test_campaign_id',
              winPrice: {
                currency: 'USD',
                amountMicro: '100',
              },
            },
            impTrackers: [
              'https://mock-imp-tracker-1',
              'https://mock-imp-tracker-2',
            ],
            clickTrackers: [
              'https://mock-click-tracker-1',
              'https://mock-click-tracker-2',
            ],
            trackId: 'test_track_id',
          },
        ],
      }
    );
  });
});
