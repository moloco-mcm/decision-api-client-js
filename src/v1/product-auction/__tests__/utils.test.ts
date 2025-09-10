import { testFiltering, testFilteringHttpRequestBody } from '../../utils';
import { ProductAuctionHttpResponseBody, ProductAuctionParams } from '../types';
import {
  translateProductAuctionParamsToProductAuctionHttpRequestBody,
  translateProductAuctionHttpResponseBodyToProductAuctionData,
} from '../utils';

describe('product-auction/utils', () => {
  test('translateProductAuctionParamsToProductAuctionHttpRequestBody', () => {
    const params: ProductAuctionParams = {
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
      inventories: [
        {
          inventoryId: 'my_inventory',
          numAds: 1,
          inventoryItems: [
            { itemId: 'test_item_id_1' },
            { itemId: 'test_item_id_2', itemGroupId: 'test_group' },
          ],
          categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
          searchQuery: 'test_query',
          searchMetadata: {
            synonyms: ['shoes', 'footwear'],
          },
          filtering: testFiltering,
        },
      ],
      pageId: 'test_page_id',
      deduplicationSetting: {
        perRequest: {
          method: 'METHOD_WATERFALL',
          criteria: 'CRITERIA_ITEM_ID',
        },
      },
    };

    expect(
      translateProductAuctionParamsToProductAuctionHttpRequestBody(params)
    ).toMatchObject({
      request_id: 'test_request_id',
      channel_type: 'APP',
      domain: 'test_domain',
      session_id: 'test_session_id',
      custom_id: 'test_custom_id',
      user: {
        user_id: 'test_user_id',
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
          num_ads: 1,
          inventory_items: [
            { item_id: 'test_item_id_1' },
            { item_id: 'test_item_id_2', item_group_id: 'test_group' },
          ],
          categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
          search_query: 'test_query',
          search_metadata: {
            synonyms: ['shoes', 'footwear'],
          },
          filtering: testFilteringHttpRequestBody,
        },
      ],
      page_id: 'test_page_id',
      deduplication_setting: {
        per_request: {
          method: 'METHOD_WATERFALL',
          criteria: 'CRITERIA_ITEM_ID',
        },
      },
    });
  });

  test('translateProductAuctionHttpResponseBodyToProductAuctionData', () => {
    const data: ProductAuctionHttpResponseBody = {
      request_id: 'test_request_id',
      decisions: [
        {
          inventory_id: 'test_inventory_id',
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
        },
      ],
    };

    expect(
      translateProductAuctionHttpResponseBodyToProductAuctionData(data)
    ).toMatchObject({
      requestId: 'test_request_id',
      decisions: [
        {
          inventoryId: 'test_inventory_id',
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
        },
      ],
    });
  });
});
