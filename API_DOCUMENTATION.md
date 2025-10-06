# Spredd Markets Public API Documentation

The Spredd Markets Public API provides programmatic access to prediction market data, allowing external projects and bots to retrieve information about markets, trades, statistics, and more.

## Base URL

```
https://backend.spredd.markets/api/v1
```

## Authentication

The public API endpoints do not require authentication. All endpoints are accessible via HTTP GET requests.

## Rate Limiting

- 1000 requests per hour per IP address
- Burst limit: 100 requests per minute

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "pagination": { /* pagination info for paginated endpoints */ }
}
```

## Endpoints

### 1. Get All Markets

Retrieve a paginated list of all prediction markets with optional filtering.

**Endpoint:** `GET /api/v1/markets`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `status` (optional): Filter by market status (`ACTIVE`, `EXPIRED`, `CLOSED`)
- `resolved` (optional): Filter by resolution status (`true`, `false`)
- `tags` (optional): Comma-separated list of tags to filter by
- `search` (optional): Search in question and description
- `creator` (optional): Filter by creator wallet address

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/markets?page=1&limit=10&status=ACTIVE&tags=crypto,sports"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "Will Bitcoin reach $100k by end of 2024?",
      "description": "Bitcoin price prediction market",
      "status": "ACTIVE",
      "isResolved": false,
      "winningOutcome": null,
      "expiry_date": "2024-12-31T23:59:59.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "contract_address": "0x1234567890abcdef",
      "marketId": "0xabcdef1234567890",
      "tags": ["crypto", "bitcoin"],
      "image": "https://example.com/bitcoin.jpg",
      "creator": {
        "username": "cryptotrader",
        "wallet_address": "0x9876543210fedcba"
      },
      "outcomes": [
        {
          "id": 1,
          "outcome_title": "YES"
        },
        {
          "id": 2,
          "outcome_title": "NO"
        }
      ]
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  }
}
```

### 2. Get Market by ID

Retrieve detailed information about a specific market.

**Endpoint:** `GET /api/v1/markets/{id}`

**Parameters:**
- `id`: Market ID

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/markets/1"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "question": "Will Bitcoin reach $100k by end of 2024?",
    "description": "Bitcoin price prediction market",
    "resolution_criteria": "Based on CoinGecko price at 11:59 PM UTC on Dec 31, 2024",
    "status": "ACTIVE",
    "isResolved": false,
    "winningOutcome": null,
    "expiry_date": "2024-12-31T23:59:59.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "contract_address": "0x1234567890abcdef",
    "marketId": "0xabcdef1234567890",
    "tags": ["crypto", "bitcoin"],
    "image": "https://example.com/bitcoin.jpg",
    "creator": {
      "id": 1,
      "username": "cryptotrader",
      "wallet_address": "0x9876543210fedcba"
    },
    "outcomes": [
      {
        "id": 1,
        "outcome_title": "YES",
        "current_supply": "1000.50",
        "total_liquidity": "5000.25"
      },
      {
        "id": 2,
        "outcome_title": "NO",
        "current_supply": "2000.75",
        "total_liquidity": "7500.50"
      }
    ]
  }
}
```

### 3. Get Market Trades

Retrieve recent trades for a specific market.

**Endpoint:** `GET /api/v1/markets/{id}/trades`

**Parameters:**
- `id`: Market ID

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/markets/1/trades?page=1&limit=5"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "unique_id": "trade-uuid-123",
      "order_type": "BUY",
      "order_size": "10.50",
      "amount": "100.25",
      "afterPrice": "0.52",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "user": {
        "username": "trader1",
        "wallet_address": "0xabcdef123456"
      },
      "outcome": {
        "outcome_title": "YES"
      }
    }
  ],
  "pagination": {
    "total": 500,
    "page": 1,
    "limit": 5,
    "totalPages": 100
  }
}
```

### 4. Get Market Chart Data

Retrieve price chart data for a specific market.

**Endpoint:** `GET /api/v1/markets/{id}/chart`

**Parameters:**
- `id`: Market ID

**Query Parameters:**
- `interval` (optional): Chart interval (`10s`, `1m`, `5m`, `1h`, `1d`, `1mo`)
- `from` (optional): Start date (ISO string)
- `to` (optional): End date (ISO string)

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/markets/1/chart?interval=1h&from=2024-01-01T00:00:00Z"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00.000Z",
      "noOdds": "45",
      "yesOdds": "55",
      "totalVolume": "1000"
    },
    {
      "timestamp": "2024-01-01T01:00:00.000Z",
      "noOdds": "48",
      "yesOdds": "52",
      "totalVolume": "1200"
    }
  ]
}
```

### 5. Get Resolved Markets

Retrieve all resolved prediction markets.

**Endpoint:** `GET /api/v1/resolved-markets`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `outcome` (optional): Filter by winning outcome (`YES`, `NO`)

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/resolved-markets?outcome=YES&limit=10"
```

### 6. Get Platform Statistics

Retrieve overall platform statistics.

**Endpoint:** `GET /api/v1/stats`

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/stats"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "totalMarkets": 250,
    "activeMarkets": 120,
    "resolvedMarkets": 130,
    "totalTrades": 5000,
    "totalUsers": 1200,
    "totalVolume": "1000000.50",
    "last24hVolume": "50000.25",
    "last24hTrades": 150
  }
}
```

### 7. Get Market Statistics

Retrieve detailed statistics for a specific market.

**Endpoint:** `GET /api/v1/market-stats/{id}`

**Parameters:**
- `id`: Market ID

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/market-stats/1"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "marketId": 1,
    "totalTrades": 50,
    "totalVolume": "25000.75",
    "uniqueTraders": 25,
    "outcomes": {
      "yes": {
        "supply": "1000.50",
        "liquidity": "5000.25"
      },
      "no": {
        "supply": "2000.75",
        "liquidity": "7500.50"
      }
    },
    "recentTrades": [
      {
        "order_type": "BUY",
        "amount": "100.25",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "outcome": {
          "outcome_title": "YES"
        }
      }
    ]
  }
}
```

### 8. Get Market Creators

Retrieve list of market creators with their statistics.

**Endpoint:** `GET /api/v1/creators`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `sortBy` (optional): Sort by metric (`markets`, `volume`, `accuracy`)

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/creators?sortBy=volume&limit=10"
```

### 9. Get Platform Leaderboard

Retrieve platform leaderboard data.

**Endpoint:** `GET /api/v1/leaderboard`

**Query Parameters:**
- `type` (optional): Leaderboard type (`TRADER`, `CREATOR`)
- `limit` (optional): Number of entries (default: 50, max: 100)

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/leaderboard?type=TRADER&limit=20"
```

### 10. Get Platform News

Retrieve latest platform news and updates.

**Endpoint:** `GET /api/v1/news`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example Request:**
```bash
curl "https://backend.spredd.markets/api/v1/news?limit=5"
```

## Error Handling

Error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Example Use Cases

### 1. Market Monitoring Bot

```javascript
// Fetch active markets every 5 minutes
const response = await fetch('https://backend.spredd.markets/api/v1/markets?status=ACTIVE&limit=50');
const { data: markets } = await response.json();

markets.forEach(market => {
  console.log(`Market: ${market.question}`);
  console.log(`Expires: ${market.expiry_date}`);
  console.log(`Tags: ${market.tags.join(', ')}`);
});
```

### 2. Analytics Dashboard

```javascript
// Get platform stats for dashboard
const statsResponse = await fetch('https://backend.spredd.markets/api/v1/stats');
const { data: stats } = await statsResponse.json();

// Get recent resolved markets
const resolvedResponse = await fetch('https://backend.spredd.markets/api/v1/resolved-markets?limit=10');
const { data: resolvedMarkets } = await resolvedResponse.json();

// Display analytics
console.log(`Total Markets: ${stats.totalMarkets}`);
console.log(`24h Volume: ${stats.last24hVolume}`);
```

### 3. Trading Strategy Bot

```javascript
// Analyze market trends
async function analyzeMarket(marketId) {
  // Get market details
  const marketResponse = await fetch(`https://backend.spredd.markets/api/v1/markets/${marketId}`);
  const { data: market } = await marketResponse.json();
  
  // Get price chart
  const chartResponse = await fetch(`https://backend.spredd.markets/api/v1/markets/${marketId}/chart?interval=1h`);
  const { data: chartData } = await chartResponse.json();
  
  // Get recent trades
  const tradesResponse = await fetch(`https://backend.spredd.markets/api/v1/markets/${marketId}/trades?limit=20`);
  const { data: trades } = await tradesResponse.json();
  
  // Implement your trading strategy logic here
  return {
    market,
    priceHistory: chartData,
    recentActivity: trades
  };
}
```

## Support

For API support and questions:
- GitHub Issues: [https://github.com/spredd/spredd-api/issues](https://github.com/spredd/spredd-api/issues)
- Discord: [https://discord.gg/spredd](https://discord.gg/spredd)
- Email: api-support@spredd.markets

## Changelog

### v1.0.0 (Current)
- Initial API release
- Basic market data endpoints
- Statistics and analytics endpoints
- Chart data endpoints
- Public read-only access