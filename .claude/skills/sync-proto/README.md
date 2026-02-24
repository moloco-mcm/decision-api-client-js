# Proto Type Sync Skill

## Overview

The `sync-proto` skill automates the synchronization of TypeScript types in this repository with the proto definitions maintained in the `rmp-infra` repository. As the public Decision API evolves, proto definitions are updated in rmp-infra, and this skill helps keep the TypeScript client library in sync.

## Why This Exists

**Problem:**
- Manual comparison between proto files and TypeScript types is tedious and error-prone
- Easy to miss new fields, removed fields, or type changes
- No automated way to detect when types are out of sync
- Developers need to manually track proto changes across repositories

**Solution:**
This skill automates the comparison process by:
1. Dynamically locating the rmp-infra repository
2. Reading the latest proto definitions
3. Comparing them with current TypeScript types
4. Updating TypeScript files when differences are found
5. Running tests and generating documentation

## Usage

```bash
/sync-proto
```

The skill will:
1. Find the rmp-infra repository (searching parent directories)
2. Read proto definitions from `protocol/api/adcloud/rmp/decision/v1/public/`
3. Compare with TypeScript types in `src/v1/{endpoint}/types.ts`
4. Update types if differences are found
5. Run tests (`yarn test`)
6. Generate documentation (`yarn docs`)
7. Show a summary of changes

## How It Works

### Repository Discovery

The skill dynamically searches for the rmp-infra repository by looking in parent directories (up to 5 levels up from the current directory). This approach:
- Works across different developer machine configurations
- Doesn't require hardcoded paths
- Assumes rmp-infra and decision-api-client-js are sibling directories (or in nearby parent directories)
- Fails gracefully with a clear error message if rmp-infra is not found

### Proto Files

The skill reads three key proto files:
1. `service.proto` - Service definitions (RPC endpoints)
2. `messages.proto` - Request/response message definitions
3. `decision.proto` - Shared entity definitions

### Endpoints Checked

The skill checks synchronization for three endpoints:
1. **product-auction** - `DecideAdProducts` (product recommendations)
2. **brand-auction** - `DecideAdBrands` (brand ads)
3. **display-auction** - `DecideAdDisplay` (display ads)

For each endpoint, it compares:
- Request types (proto → TypeScript)
- Response types (proto → TypeScript)
- Field mappings in utils (snake_case → camelCase)

### Field Mapping

Proto uses `snake_case` for field names, while TypeScript uses `camelCase`:
- Proto: `request_id` → TypeScript: `requestId`
- Proto: `num_ads` → TypeScript: `numAds`
- Proto: `track_id` → TypeScript: `trackId`

The skill maintains these mappings in `utils.ts` files.

## Architecture

```
.claude/skills/sync-proto/
├── SKILL.md     # Skill definition with step-by-step instructions for Claude
└── README.md    # This file - developer documentation
```

The skill is intentionally simple:
- No complex scripts or parsing logic
- Claude reads proto files directly using Read tool
- Claude compares manually with TypeScript types
- Claude updates files using Edit tool
- Straightforward workflow: read → compare → update → test → docs

## Extending the Skill

### Adding New Endpoints

To add a new endpoint to the sync skill:

1. Add the endpoint to the "Endpoints to Check" section in `SKILL.md`:
   ```markdown
   4. **new-endpoint** (`ServiceName`)
      - Types: `src/v1/new-endpoint/types.ts`
      - Utils: `src/v1/new-endpoint/utils.ts`
      - Proto: `RequestMessageName`, `ResponseMessageName`
   ```

2. Update Step 3 (Compare with Current Types) to include the new endpoint

3. Ensure the new endpoint follows the same structure:
   - `types.ts` - Type definitions (Params, HttpRequestBody, HttpResponseBody, Data)
   - `utils.ts` - Conversion utilities (toHttpRequestBody, fromHttpResponseBody)

### Adding New Field Mappings

When new proto fields are added:

1. The skill will detect them automatically in Step 3 (Compare)
2. Add the snake_case → camelCase mapping to the "Field Mapping Reference" section in `SKILL.md`
3. The skill will update both types.ts and utils.ts accordingly

### Troubleshooting

**rmp-infra repository not found:**
- Ensure rmp-infra is cloned in a parent directory of decision-api-client-js
- The skill searches up to 5 levels up from the current directory
- Typical setup: `/path/to/projects/rmp-infra` and `/path/to/projects/decision-api-client-js`

**Tests fail after sync:**
- Check if proto introduced breaking changes
- Review the diff (`git diff`) to see what was updated
- Update test fixtures if needed
- Consult the proto change commit message for migration guidance

**Types don't match proto:**
- Ensure you're reading the latest proto files (check git status in rmp-infra)
- Verify proto field types match TypeScript type mappings
- Check if there are deprecated fields that should be removed

## Contributing

When updating this skill:

1. Keep the skill simple - avoid adding complex parsing or scripting
2. Follow the existing pattern of step-by-step instructions
3. Test the skill with both in-sync and out-of-sync scenarios
4. Update this README with any new patterns or troubleshooting tips
5. Document any new field mappings in SKILL.md

## Dependencies

- **rmp-infra repository** - Source of proto definitions (must be accessible in parent directories)
- **yarn** - For running tests and generating documentation
- **Claude's built-in tools** - Read, Edit, Bash (no additional scripts needed)

## See Also

- [RMP Decision API Reference](https://moloco-rmp.readme.io/reference)
- [decision-api-client-js Documentation](https://moloco-rmp.github.io/decision-api-client-js)
- Proto definitions in rmp-infra: `protocol/api/adcloud/rmp/decision/v1/public/`
