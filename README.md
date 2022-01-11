# MOLOCO RMP Decision API Client for JavaScript

JavaScript/TypeScript library for MOLOCO RMP Decision API

## Installation

```shell
npm install @moloco-rmp/decision-api-client --save
```

```shell
yarn add @moloco-rmp/decision-api-client
```

## Examples

### Setting API Credentials and Platform ID

Please contact your MOLOCO account manager to get your RMP Decision API Key and Platform ID

```javascript
export const client = v1.createClient({
  apiKey: process.env.RMP_DECISION_API_KEY,
  platformId: process.env.RMP_PLATFORM_ID,
});
```

### Getting auction result

```javascript
import { client } from '../common/decision-api-client';
import usParser from 'ua-parser-js';

const { session, headers } = req;
const ua = usParser(headers['user-agent']);

client.auction({
    requestId: randomString(),
    inventory: {
      inventoryId: 'CATEGORY_HOME',
      numItems: 10,
      items: ['product-id-1', 'product-id-2'],
      categories: ['Sports & Fitness > Athletic Clothing > Shoes'],
    },
    user: {
      userId: session.user.id,
      yearOfBirth: session.user.yearOfBirth,
      gender: session.user.gender,
    },
    device: {
      os: ua.os.name,
      osVersion: ua.os.version,
      model: ua.device.model,
      ip: req.socket.remoteAddress,
    },
  });
);
```

### Getting recommendation result

```javascript
client.recommendation({
    requestId: randomString(),
    inventory: {
      inventoryId: 'CATEGORY_HOME',
      numItems: 10,
      items: ['product-id-1', 'product-id-2'],
      categories: ['Sports & Fitness > Athletic Clothing > Shoes'],
    },
    user: {
      userId: session.user.id,
      yearOfBirth: session.user.yearOfBirth,
      gender: session.user.gender,
    },
    device: {
      os: ua.os.name,
      osVersion: ua.os.version,
      model: ua.device.model,
      ip: req.socket.remoteAddress,
    },
  });
);
```

### Handling errors

```javascript
import { client } from '../common/decision-api-client';
import { v1 } from '@moloco-rmp/decision-api-client';

client.auction({ ... })
  .catch((error) => {
    console.error(error.message);
    if (error instanceof v1.errors.InternalServerError) {
      ...
    } else if (error instanceof v1.errors.BadRequestError) {
      ...
    } else if (error instanceof v1.errors.ForbiddenError) {
      ...
    } else if (error instanceof v1.errors.NetworkError) {
      ...
    } else if (error instanceof v1.errors.NotFoundError) {
      ...
    } else if (error instanceof v1.errors.UnauthorizedError) {
      ...
    } else if (error instanceof v1.errors.UnknownError) {
    }
  });
```

## Documentation

[RMP Decision API Reference](https://moloco-rmp.readme.io/reference)

© Moloco, Inc. 2022 All rights reserved. Released under Apache 2.0 License
