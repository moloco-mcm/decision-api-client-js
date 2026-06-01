import {
  ReservedDisplayAuctionHttpResponseBody,
  ReservedDisplayAuctionParams,
} from '../types';
import {
  translateReservedDisplayAuctionParamsToReservedDisplayAuctionHttpRequestBody,
  translateReservedDisplayAuctionHttpResponseBodyToReservedDisplayAuctionData,
} from '../utils';

describe('reserved-display-auction/utils', () => {
  test('translateReservedDisplayAuctionParamsToReservedDisplayAuctionHttpRequestBody', () => {
    const params: ReservedDisplayAuctionParams = {
      requestId: 'test_request_id',
      channelType: 'APP',
      domain: 'test_domain',
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
          targeting: {
            keyValues: [
              {
                keyId: 'key1',
                valueIds: ['value1', 'value2'],
              },
            ],
          },
        },
      ],
      pageId: 'test_page_id',
      personalizationMode: 'STANDARD',
      responseSetting: {
        lineItemMetadataFields: ['ALIAS'],
      },
    };

    expect(
      translateReservedDisplayAuctionParamsToReservedDisplayAuctionHttpRequestBody(
        params
      )
    ).toMatchObject({
      request_id: 'test_request_id',
      channel_type: 'APP',
      domain: 'test_domain',
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
          targeting: {
            key_values: [
              {
                key_id: 'key1',
                value_ids: ['value1', 'value2'],
              },
            ],
          },
        },
      ],
      page_id: 'test_page_id',
      personalization_mode: 'STANDARD',
      response_setting: {
        line_item_metadata_fields: ['ALIAS'],
      },
    });
  });

  test('translateReservedDisplayAuctionHttpResponseBodyToReservedDisplayAuctionData', () => {
    const data: ReservedDisplayAuctionHttpResponseBody = {
      request_id: 'test_request_id',
      decisions: [
        {
          inventory_id: 'test_inventory_id',
          ads: [
            {
              asset: {
                id: 'test_asset_id',
                banner: {
                  media_type: 'IMAGE',
                  image_url: 'http://test-banner-image-url',
                  alt_text: 'test alt text',
                },
                custom_text: {
                  text: 'test custom text',
                  color: '#000000',
                  background_color: '#FFFFFF',
                  display_title: 'Custom Title',
                },
                headline: {
                  text: 'test headline',
                  color: '#000000',
                  background_color: '#FFFFFF',
                  display_title: 'Headline Title',
                },
                metadata: {
                  attributes: {
                    key1: 'value1',
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
              landing_page: {
                type: 'CUSTOM_URL',
                custom_url_setting: {
                  url: 'http://test-landing-page-url',
                },
              },
              ad_info: {
                ad_account_id: 'test_ad_account_id',
                line_item_id: 'test_line_item_id',
                order_id: 'test_order_id',
                line_item_metadata: {
                  alias: 'test_line_item_alias',
                },
              },
            },
          ],
        },
      ],
      invalid_input_warnings: [
        {
          warning_message: 'test warning',
          inventory_id: 'test_inventory_id',
        },
      ],
    };

    expect(
      translateReservedDisplayAuctionHttpResponseBodyToReservedDisplayAuctionData(
        data
      )
    ).toMatchObject({
      requestId: 'test_request_id',
      decisions: [
        {
          inventoryId: 'test_inventory_id',
          ads: [
            {
              asset: {
                id: 'test_asset_id',
                banner: {
                  mediaType: 'IMAGE',
                  imageUrl: 'http://test-banner-image-url',
                  altText: 'test alt text',
                },
                customText: {
                  text: 'test custom text',
                  color: '#000000',
                  backgroundColor: '#FFFFFF',
                  displayTitle: 'Custom Title',
                },
                headline: {
                  text: 'test headline',
                  color: '#000000',
                  backgroundColor: '#FFFFFF',
                  displayTitle: 'Headline Title',
                },
                metadata: {
                  attributes: {
                    key1: 'value1',
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
              landingPage: {
                type: 'CUSTOM_URL',
                customUrlSetting: {
                  url: 'http://test-landing-page-url',
                },
              },
              adInfo: {
                adAccountId: 'test_ad_account_id',
                lineItemId: 'test_line_item_id',
                orderId: 'test_order_id',
                lineItemMetadata: {
                  alias: 'test_line_item_alias',
                },
              },
            },
          ],
        },
      ],
      invalidInputWarnings: [
        {
          warningMessage: 'test warning',
          inventoryId: 'test_inventory_id',
        },
      ],
    });
  });
});
