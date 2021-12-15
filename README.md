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
const client = v1.createClient({
  apiKey: process.env.RMP_DECISION_API_KEY,
  platformId: process.env.RMP_PLATFORM_ID,
});
```

### Getting auction result

```javascript
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

## Documentation

[RMP Decision API Reference](https://moloco-rmp.readme.io/reference)
