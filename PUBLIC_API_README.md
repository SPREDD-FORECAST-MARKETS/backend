# Spredd Markets Public API

Access real-time prediction market data for your applications, bots, and analysis tools.

## 🚀 Quick Start

**Base URL:** `https://backend.spredd.markets/api/v1`

**No authentication required** - All endpoints are publicly accessible.

### Example Request
```bash
curl "https://backend.spredd.markets/api/v1/stats"
```

### Example Response
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

## 📊 Key Endpoints

### Platform Data
- **GET `/stats`** - Platform statistics
- **GET `/health`** - API health check

### Markets
- **GET `/markets`** - List all markets
  - `?status=ACTIVE` - Filter active markets
  - `?tags=crypto,sports` - Filter by categories
  - `?page=1&limit=20` - Pagination
- **GET `/markets/{id}`** - Get specific market
- **GET `/markets/{id}/trades`** - Get market trades
- **GET `/markets/{id}/chart`** - Get price chart data

### Analytics
- **GET `/resolved-markets`** - Get resolved markets
- **GET `/creators`** - Market creators data
- **GET `/leaderboard`** - Platform leaderboard
- **GET `/news`** - Platform news

## 🔧 Quick Examples

### JavaScript
```javascript
// Get active crypto markets
fetch('https://backend.spredd.markets/api/v1/markets?status=ACTIVE&tags=crypto')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Python
```python
import requests

# Get platform stats
response = requests.get('https://backend.spredd.markets/api/v1/stats')
stats = response.json()
print(f"Total markets: {stats['data']['totalMarkets']}")
```

### Go
```go
resp, err := http.Get("https://backend.spredd.markets/api/v1/markets")
// Handle response...
```

## 📝 Rate Limits

- **1000 requests/hour** per IP
- **100 requests/minute** burst limit
- Headers included: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

## 🔗 Resources

- **Interactive Docs:** https://backend.spredd.markets/api/docs
- **Full Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Integration Guide:** [DEVELOPER_INTEGRATION_GUIDE.md](./DEVELOPER_INTEGRATION_GUIDE.md)
- **Support:** api-support@spredd.markets

## ⚡ Common Use Cases

- **Trading Bots** - Algorithmic trading strategies
- **Analytics** - Market research and analysis
- **Dashboards** - Custom data visualization
- **Monitoring** - Market alerts and notifications
- **Research** - Academic prediction market studies

Start building with Spredd market data today! 🎯