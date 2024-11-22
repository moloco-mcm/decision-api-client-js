import {
  CreativeAuctionBulkHttpResponseBody,
  CreativeAuctionBulkParams,
} from '../types';
import {
  translateCreativeAuctionBulkHttpResponseBodyToCreativeAuctionBulkData,
  translateCreativeAuctionBulkParamsToCreativeAuctionBulkHttpRequestBody,
} from '../utils';

describe('creative-auction/utils', () => {
  test('translateCreativeAuctionBulkParamsToCreativeAuctionBulkHttpRequestBody', () => {
    const params: CreativeAuctionBulkParams = {
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
      inventories: [
        {
          inventoryId: 'my_inventory',
          items: ['test_item_id_1', 'test_item_id_2'],
          categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
          searchQuery: 'test_query',
        },
      ],
      pageId: 'test_page_id',
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
      translateCreativeAuctionBulkParamsToCreativeAuctionBulkHttpRequestBody(
        params
      )
    ).toStrictEqual({
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
      inventories: [
        {
          inventory_id: 'my_inventory',
          items: ['test_item_id_1', 'test_item_id_2'],
          categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
          search_query: 'test_query',
        },
      ],
      page_id: 'test_page_id',
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

  test('translateCreativeAuctionBulkHttpResponseBodyToCreativeAuctionBulkData', () => {
    const data: CreativeAuctionBulkHttpResponseBody = {
      request_id: 'test_request_id',
      results: [
        {
          auction_result: {
            ad_account_id: 'test_ad_account_id',
            campaign_id: 'test_campaign_id',
            win_price: {
              currency: 'USD',
              amount_micro: '100',
            },
          },
          creatives: [
            {
              banner: {
                creative_id: 'test_creative_id',
                image_url: 'http://test-creative-image-url',
                imp_trackers: [
                  'https://mock-imp-tracker-1',
                  'https://mock-imp-tracker-2',
                ],
                click_trackers: [
                  'https://mock-click-tracker-1',
                  'https://mock-click-tracker-2',
                ],
              },
            },
          ],
          items: [
            {
              item_id: 'test-item-id',
              imp_trackers: [
                'https://mock-imp-tracker-1',
                'https://mock-imp-tracker-2',
              ],
              click_trackers: [
                'https://mock-click-tracker-1',
                'https://mock-click-tracker-2',
              ],
            },
          ],
        },
      ],
    };

    expect(
      translateCreativeAuctionBulkHttpResponseBodyToCreativeAuctionBulkData(
        data
      )
    ).toStrictEqual({
      requestId: 'test_request_id',
      results: [
        {
          auctionResult: {
            adAccountId: 'test_ad_account_id',
            campaignId: 'test_campaign_id',
            winPrice: {
              currency: 'USD',
              amountMicro: '100',
            },
          },
          creatives: [
            {
              banner: {
                creativeId: 'test_creative_id',
                imageUrl: 'http://test-creative-image-url',
                impTrackers: [
                  'https://mock-imp-tracker-1',
                  'https://mock-imp-tracker-2',
                ],
                clickTrackers: [
                  'https://mock-click-tracker-1',
                  'https://mock-click-tracker-2',
                ],
              },
            },
          ],
          items: [
            {
              itemId: 'test-item-id',
              impTrackers: [
                'https://mock-imp-tracker-1',
                'https://mock-imp-tracker-2',
              ],
              clickTrackers: [
                'https://mock-click-tracker-1',
                'https://mock-click-tracker-2',
              ],
            },
          ],
        },
      ],
    });
  });
});
