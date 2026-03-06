---
name: sync-proto
description: Sync TypeScript types with rmp-infra proto definitions
version: 1.0.0
requires:
  - Access to rmp-infra repository (searched dynamically)
  - yarn
---

# Proto Type Sync Skill

Sync TypeScript types with the latest proto definitions from rmp-infra.

## Syntax

```
/sync-proto
```

## Instructions for Claude

**IMPORTANT:** Execute each step as a SEPARATE tool call.

### Step 0: Locate rmp-infra Repository

Dynamically find the rmp-infra repository by searching parent directories:

```bash
# Start from current directory and search upward
current_dir="$PWD"
rmp_infra_path=""

# Search up to 5 levels up from current directory
for i in {1..5}; do
  parent_dir=$(cd "$current_dir" && cd .. && pwd)

  # Check if rmp-infra exists in parent directory
  if [ -d "$parent_dir/rmp-infra" ]; then
    rmp_infra_path="$parent_dir/rmp-infra"
    break
  fi

  # Move to parent directory for next iteration
  current_dir="$parent_dir"

  # Stop if we've reached root
  if [ "$current_dir" = "/" ]; then
    break
  fi
done

# Check if rmp-infra was found
if [ -z "$rmp_infra_path" ]; then
  echo "ERROR: rmp-infra repository not found in parent directories"
  echo "Please ensure rmp-infra is cloned in a parent directory of decision-api-client-js"
  exit 1
fi

# Verify it's a git repository
if [ ! -d "$rmp_infra_path/.git" ]; then
  echo "ERROR: Found rmp-infra directory but it's not a git repository: $rmp_infra_path"
  exit 1
fi

echo "Found rmp-infra repository at: $rmp_infra_path"
```

### Step 1: Check Proto Definitions

Read the latest proto commit info:
```bash
cd "$rmp_infra_path"
git log -1 --oneline protocol/api/adcloud/rmp/decision/v1/public/
```

### Step 2: Read Proto Files

Read the key proto files to understand types. Use the `$rmp_infra_path` variable found in Step 0:

- Read: `$rmp_infra_path/protocol/api/adcloud/rmp/decision/v1/public/api/service.proto`
- Read: `$rmp_infra_path/protocol/api/adcloud/rmp/decision/v1/public/messages/messages.proto`
- Read: `$rmp_infra_path/protocol/api/adcloud/rmp/decision/v1/entities/decision.proto`

### Step 3: Compare with Current Types

For each endpoint (productAuction, brandAuction, displayAuction):
- Read current types.ts file
- Compare proto message definitions with TypeScript types
- Identify: new fields, removed fields, type changes, deprecated fields

### Step 4: Update TypeScript Types

For any differences found:
- Edit types.ts files to add/update/remove fields
- Edit utils.ts files to handle new field mappings
- Update external.ts for shared types

### Step 5: Run Tests

```bash
yarn test
```

If tests fail, fix the issues and re-run.

### Step 6: Generate Documentation

```bash
yarn docs
```

### Step 7: Review Changes

```bash
git status
git diff
```

Show summary of what was changed.

## Endpoints to Check

1. **product-auction** (`DecideAdProducts`)
   - Types: `src/v1/product-auction/types.ts`
   - Utils: `src/v1/product-auction/utils.ts`
   - Proto: `DecisionProductsRequest`, `DecisionProductsResponse`

2. **brand-auction** (`DecideAdBrands`)
   - Types: `src/v1/brand-auction/types.ts`
   - Utils: `src/v1/brand-auction/utils.ts`
   - Proto: `DecisionBrandsRequest`, `DecisionBrandsResponse`

3. **display-auction** (`DecideAdDisplay`)
   - Types: `src/v1/display-auction/types.ts`
   - Utils: `src/v1/display-auction/utils.ts`
   - Proto: `DecisionDisplayRequest`, `DecisionDisplayResponse`

## Field Mapping Reference

Proto field names (snake_case) → TypeScript (camelCase):
- `request_id` → `requestId`
- `channel_type` → `channelType`
- `num_ads` → `numAds`
- `track_id` → `trackId`
- `user_id` → `userId`
- `session_id` → `sessionId`
- `custom_id` → `customId`
- `inventory_id` → `inventoryId`
- `item_id` → `itemId`
- `item_group_id` → `itemGroupId`
- `search_query` → `searchQuery`
- `search_metadata` → `searchMetadata`
- `custom_item_pool` → `customItemPool`
- `page_id` → `pageId`
- `deduplication_setting` → `deduplicationSetting`
- `per_request` → `perRequest`
- `os_version` → `osVersion`
- `advertising_id` → `advertisingId`
- `unique_device_id` → `uniqueDeviceId`
- `persistent_id` → `persistentId`
- `shipping_charge` → `shippingCharge`
- `amount_micro` → `amountMicro`
- `price_amount` → `priceAmount`
- `quality_score` → `qualityScore`
- `decided_items` → `decidedItems`
- `auction_result` → `auctionResult`
- `ad_account_id` → `adAccountId`
- `campaign_id` → `campaignId`
- `win_price` → `winPrice`
- `imp_trackers` → `impTrackers`
- `click_trackers` → `clickTrackers`
- `track_id` → `trackId`

## Notes

- Always preserve optional field markers (`?`) when updating types
- Maintain consistent formatting with existing code style
- Update both request and response types when proto changes
- Keep HttpRequestBody and HttpResponseBody in sync with their camelCase counterparts
- Run tests after each update to ensure no breaking changes
