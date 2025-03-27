import { testFiltering, testFilteringHttpRequestBody } from '../../utils';
import { DisplayAuctionHttpResponseBody, DisplayAuctionParams } from '../types';
import {
  translateDisplayAuctionParamsToDisplayAuctionHttpRequestBody,
  translateDisplayAuctionHttpResponseBodyToDisplayAuctionData,
} from '../utils';

describe('display-auction/utils', () => {
  test('translateDisplayAuctionParamsToDisplayAuctionHttpRequestBody', () => {
    const params: DisplayAuctionParams = {
      requestId: 'test_request_id',
      channelType: 'APP',
      domain: 'test_domain',
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
        items: ['test_item_id_1', 'test_item_id_2'],
        categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
        searchQuery: 'test_query',
      },
      pageId: 'test_page_id',
      filtering: testFiltering,
    };

    expect(
      translateDisplayAuctionParamsToDisplayAuctionHttpRequestBody(params)
    ).toMatchObject({
      request_id: 'test_request_id',
      channel_type: 'APP',
      domain: 'test_domain',
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
        items: ['test_item_id_1', 'test_item_id_2'],
        categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
        search_query: 'test_query',
      },
      page_id: 'test_page_id',
      filtering: testFilteringHttpRequestBody,
    });
  });

  test('translateAuctionHttpResponseBodyToAuctionResult', () => {
    const data: DisplayAuctionHttpResponseBody = {
      request_id: 'test_request_id',
      auction_result: {
        ad_account_id: 'test_ad_account_id',
        campaign_id: 'test_campaign_id',
        win_price: {
          currency: 'USD',
          amount_micro: '100',
        },
      },
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
    };

    expect(
      translateDisplayAuctionHttpResponseBodyToDisplayAuctionData(data)
    ).toMatchObject({
      requestId: 'test_request_id',
      auctionResult: {
        adAccountId: 'test_ad_account_id',
        campaignId: 'test_campaign_id',
        winPrice: {
          currency: 'USD',
          amountMicro: '100',
        },
      },
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
    });
  });
});
