import { RecommendationHttpResponseBody, RecommendationParams } from '../types';
import {
  translateRecommendationParamsToRecommendationHttpRequestBody,
  translateRecommendationHttpResponseBodyToRecommendationResult,
} from '../utils';

describe('recommendation/utils', () => {
  test('translateRecommendationParamsToRecommendationHttpRequestBody', () => {
    const params: RecommendationParams = {
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
        numItems: 10,
        items: ['test_item_id_1', 'test_item_id_2'],
        categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
        searchQuery: 'test_query',
      },
      options: {
        requireItemMetadata: true,
        requireScore: true,
      },
    };

    expect(
      translateRecommendationParamsToRecommendationHttpRequestBody(params)
    ).toMatchObject({
      request_id: 'test_request_id',
      session_id: 'test_session_id',
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
        ip: '127.0.0.1',
      },
      inventory: {
        inventory_id: 'my_inventory',
        type: 'HOME',
        num_items: 10,
        items: ['test_item_id_1', 'test_item_id_2'],
        categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
        search_query: 'test_query',
      },
      options: {
        require_item_metadata: true,
        require_score: true,
      },
    });
  });

  test('translateRecommendationHttpResponseBodyToRecommendationResult', () => {
    const data: RecommendationHttpResponseBody = {
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
          metadata: {
            item: {
              title: 'test_item_title',
              categories: ['category1', 'category2'],
              image_urls: ['https://image-url'],
              price: {
                currency: 'USD',
                amount: 100,
              },
            },
            score: 10,
          },
        },
      ],
    };

    expect(
      translateRecommendationHttpResponseBodyToRecommendationResult(data)
    ).toMatchObject({
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
          metadata: {
            item: {
              title: 'test_item_title',
              categories: ['category1', 'category2'],
              imageUrls: ['https://image-url'],
              price: {
                currency: 'USD',
                amount: 100,
              },
            },
            score: 10,
          },
        },
      ],
    });
  });
});
