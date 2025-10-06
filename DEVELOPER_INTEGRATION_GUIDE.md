# Spredd Markets API - Developer Integration Guide

Welcome to the Spredd Markets API! This guide will help you integrate prediction market data into your applications, bots, or analytics platforms.

## 🚀 Quick Start

### Base URL
```
Production: https://backend.spredd.markets/api/v1
Development: http://localhost:3001/api/v1
```

### No Authentication Required
All public API endpoints are freely accessible without API keys or authentication.

### Rate Limits
- **1000 requests per hour** per IP address
- **100 requests per minute** burst limit

## 📊 Common Use Cases

### 1. **Market Monitoring Bot**
Track active markets and get notified when new ones are created.

### 2. **Analytics Dashboard**
Build custom dashboards with market data and statistics.

### 3. **Trading Algorithms**
Develop automated trading strategies using historical data.

### 4. **News Aggregation**
Integrate prediction market outcomes into news feeds.

### 5. **Research & Analysis**
Academic research on prediction market accuracy and trends.

## 🛠 API Examples by Language

### JavaScript/Node.js

```javascript
// Install: npm install axios
const axios = require('axios');

class SpreddAPI {
  constructor() {
    this.baseURL = 'https://backend.spredd.markets/api/v1';
  }

  async getMarkets(params = {}) {
    const response = await axios.get(`${this.baseURL}/markets`, { params });
    return response.data;
  }

  async getMarket(id) {
    const response = await axios.get(`${this.baseURL}/markets/${id}`);
    return response.data;
  }

  async getStats() {
    const response = await axios.get(`${this.baseURL}/stats`);
    return response.data;
  }

  async getResolvedMarkets(outcome = null) {
    const params = outcome ? { outcome } : {};
    const response = await axios.get(`${this.baseURL}/resolved-markets`, { params });
    return response.data;
  }
}

// Usage example
async function main() {
  const api = new SpreddAPI();
  
  // Get platform statistics
  const stats = await api.getStats();
  console.log('Platform Stats:', stats.data);
  
  // Get active markets
  const activeMarkets = await api.getMarkets({ status: 'ACTIVE', limit: 10 });
  console.log('Active Markets:', activeMarkets.data.length);
  
  // Get specific market details
  if (activeMarkets.data.length > 0) {
    const market = await api.getMarket(activeMarkets.data[0].id);
    console.log('Market Details:', market.data.question);
  }
}

main().catch(console.error);
```

### Python

```python
import requests
from typing import Optional, Dict, Any

class SpreddAPI:
    def __init__(self):
        self.base_url = "https://backend.spredd.markets/api/v1"
        self.session = requests.Session()
    
    def get_markets(self, **params) -> Dict[str, Any]:
        """Get list of markets with optional filtering"""
        response = self.session.get(f"{self.base_url}/markets", params=params)
        response.raise_for_status()
        return response.json()
    
    def get_market(self, market_id: int) -> Dict[str, Any]:
        """Get specific market details"""
        response = self.session.get(f"{self.base_url}/markets/{market_id}")
        response.raise_for_status()
        return response.json()
    
    def get_stats(self) -> Dict[str, Any]:
        """Get platform statistics"""
        response = self.session.get(f"{self.base_url}/stats")
        response.raise_for_status()
        return response.json()
    
    def get_market_trades(self, market_id: int, page: int = 1, limit: int = 20) -> Dict[str, Any]:
        """Get trades for a specific market"""
        response = self.session.get(
            f"{self.base_url}/markets/{market_id}/trades",
            params={"page": page, "limit": limit}
        )
        response.raise_for_status()
        return response.json()
    
    def get_chart_data(self, market_id: int, interval: Optional[str] = None) -> Dict[str, Any]:
        """Get price chart data for a market"""
        params = {"interval": interval} if interval else {}
        response = self.session.get(f"{self.base_url}/markets/{market_id}/chart", params=params)
        response.raise_for_status()
        return response.json()

# Usage example
def main():
    api = SpreddAPI()
    
    # Get platform statistics
    stats = api.get_stats()
    print(f"Total Markets: {stats['data']['totalMarkets']}")
    
    # Get active crypto markets
    crypto_markets = api.get_markets(status="ACTIVE", tags="crypto", limit=5)
    print(f"Active Crypto Markets: {len(crypto_markets['data'])}")
    
    # Analyze market activity
    for market in crypto_markets['data']:
        market_id = market['id']
        question = market['question']
        
        # Get recent trades
        trades = api.get_market_trades(market_id, limit=10)
        print(f"Market: {question} - Recent Trades: {len(trades['data'])}")

if __name__ == "__main__":
    main()
```

### Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
    "strconv"
)

type SpreddAPI struct {
    BaseURL string
    Client  *http.Client
}

type APIResponse struct {
    Success bool        `json:"success"`
    Data    interface{} `json:"data"`
}

func NewSpreddAPI() *SpreddAPI {
    return &SpreddAPI{
        BaseURL: "https://backend.spredd.markets/api/v1",
        Client:  &http.Client{},
    }
}

func (api *SpreddAPI) request(endpoint string, params map[string]string) (*APIResponse, error) {
    u, err := url.Parse(api.BaseURL + endpoint)
    if err != nil {
        return nil, err
    }

    if params != nil {
        q := u.Query()
        for k, v := range params {
            q.Set(k, v)
        }
        u.RawQuery = q.Encode()
    }

    resp, err := api.Client.Get(u.String())
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    var apiResp APIResponse
    err = json.Unmarshal(body, &apiResp)
    return &apiResp, err
}

func (api *SpreddAPI) GetMarkets(status string, limit int) (*APIResponse, error) {
    params := map[string]string{
        "status": status,
        "limit":  strconv.Itoa(limit),
    }
    return api.request("/markets", params)
}

func (api *SpreddAPI) GetStats() (*APIResponse, error) {
    return api.request("/stats", nil)
}

func main() {
    api := NewSpreddAPI()
    
    // Get platform stats
    stats, err := api.GetStats()
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("API Response: %+v\n", stats)
    
    // Get active markets
    markets, err := api.GetMarkets("ACTIVE", 10)
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Markets Response: %+v\n", markets)
}
```

### Rust

```rust
use reqwest;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
struct APIResponse<T> {
    success: bool,
    data: T,
}

#[derive(Debug, Serialize, Deserialize)]
struct Market {
    id: u32,
    question: String,
    status: String,
    #[serde(rename = "isResolved")]
    is_resolved: bool,
}

#[derive(Debug, Serialize, Deserialize)]
struct Stats {
    #[serde(rename = "totalMarkets")]
    total_markets: u32,
    #[serde(rename = "activeMarkets")]
    active_markets: u32,
    #[serde(rename = "totalUsers")]
    total_users: u32,
}

pub struct SpreddAPI {
    base_url: String,
    client: reqwest::Client,
}

impl SpreddAPI {
    pub fn new() -> Self {
        Self {
            base_url: "https://backend.spredd.markets/api/v1".to_string(),
            client: reqwest::Client::new(),
        }
    }

    pub async fn get_stats(&self) -> Result<APIResponse<Stats>, reqwest::Error> {
        let url = format!("{}/stats", self.base_url);
        self.client.get(&url).send().await?.json().await
    }

    pub async fn get_markets(&self, status: Option<&str>, limit: Option<u32>) -> Result<APIResponse<Vec<Market>>, reqwest::Error> {
        let mut url = format!("{}/markets", self.base_url);
        let mut params = Vec::new();
        
        if let Some(s) = status {
            params.push(format!("status={}", s));
        }
        if let Some(l) = limit {
            params.push(format!("limit={}", l));
        }
        
        if !params.is_empty() {
            url.push_str("?");
            url.push_str(&params.join("&"));
        }

        self.client.get(&url).send().await?.json().await
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let api = SpreddAPI::new();
    
    // Get platform stats
    let stats = api.get_stats().await?;
    println!("Platform Stats: {:?}", stats);
    
    // Get active markets
    let markets = api.get_markets(Some("ACTIVE"), Some(5)).await?;
    println!("Active Markets: {:?}", markets);
    
    Ok(())
}
```

## 🔧 Integration Patterns

### 1. **Polling Strategy**
```javascript
// Check for new markets every 5 minutes
setInterval(async () => {
  const markets = await api.getMarkets({ 
    status: 'ACTIVE',
    page: 1,
    limit: 100 
  });
  
  // Process new markets
  processNewMarkets(markets.data);
}, 5 * 60 * 1000);
```

### 2. **Market Analysis Pipeline**
```python
def analyze_market_trends():
    api = SpreddAPI()
    
    # Get resolved markets for analysis
    resolved = api.get_markets(resolved=True, limit=100)
    
    accuracy_data = []
    for market in resolved['data']:
        # Analyze prediction accuracy
        chart_data = api.get_chart_data(market['id'])
        accuracy = calculate_accuracy(chart_data, market['winningOutcome'])
        accuracy_data.append(accuracy)
    
    return generate_report(accuracy_data)
```

### 3. **Real-time Dashboard**
```javascript
// Update dashboard every 30 seconds
async function updateDashboard() {
  const [stats, activeMarkets, recentTrades] = await Promise.all([
    api.getStats(),
    api.getMarkets({ status: 'ACTIVE', limit: 10 }),
    api.getResolvedMarkets({ limit: 5 })
  ]);
  
  updateStatsWidget(stats.data);
  updateMarketsTable(activeMarkets.data);
  updateActivityFeed(recentTrades.data);
}

setInterval(updateDashboard, 30000);
```

## 📈 Advanced Use Cases

### Market Prediction Bot
```python
import asyncio
from datetime import datetime

class PredictionBot:
    def __init__(self):
        self.api = SpreddAPI()
        self.monitored_markets = set()
    
    async def monitor_markets(self):
        while True:
            markets = self.api.get_markets(status="ACTIVE")
            
            for market in markets['data']:
                if market['id'] not in self.monitored_markets:
                    await self.analyze_new_market(market)
                    self.monitored_markets.add(market['id'])
            
            await asyncio.sleep(300)  # Check every 5 minutes
    
    async def analyze_new_market(self, market):
        # Get historical data
        chart_data = self.api.get_chart_data(market['id'])
        
        # Run prediction algorithm
        prediction = self.predict_outcome(market, chart_data)
        
        # Log or act on prediction
        print(f"Market: {market['question']}")
        print(f"Prediction: {prediction}")
```

### Analytics Platform Integration
```javascript
class SpreddAnalytics {
  constructor(analyticsEndpoint) {
    this.api = new SpreddAPI();
    this.analyticsEndpoint = analyticsEndpoint;
  }
  
  async collectMetrics() {
    const stats = await this.api.getStats();
    const markets = await this.api.getMarkets({ limit: 100 });
    
    // Transform data for analytics platform
    const metrics = {
      timestamp: Date.now(),
      totalMarkets: stats.data.totalMarkets,
      activeMarkets: stats.data.activeMarkets,
      totalVolume: stats.data.totalVolume,
      marketsByCategory: this.categorizeMarkets(markets.data)
    };
    
    // Send to analytics platform
    await this.sendToAnalytics(metrics);
  }
  
  categorizeMarkets(markets) {
    const categories = {};
    markets.forEach(market => {
      market.tags.forEach(tag => {
        categories[tag] = (categories[tag] || 0) + 1;
      });
    });
    return categories;
  }
}
```

## 🔗 API Endpoints Reference

### Markets
- `GET /api/v1/markets` - List all markets
- `GET /api/v1/markets/{id}` - Get specific market
- `GET /api/v1/markets/{id}/trades` - Get market trades
- `GET /api/v1/markets/{id}/chart` - Get price chart data
- `GET /api/v1/resolved-markets` - Get resolved markets

### Analytics
- `GET /api/v1/stats` - Platform statistics
- `GET /api/v1/market-stats/{id}` - Market-specific stats
- `GET /api/v1/creators` - Market creators data
- `GET /api/v1/leaderboard` - Platform leaderboard

### Content
- `GET /api/v1/news` - Platform news and updates

## 🚦 Best Practices

### 1. **Respect Rate Limits**
```javascript
// Implement exponential backoff
async function apiCallWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

### 2. **Cache Responses**
```python
import time
from functools import wraps

def cache_response(ttl_seconds=300):
    def decorator(func):
        cache = {}
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            key = str(args) + str(kwargs)
            now = time.time()
            
            if key in cache and now - cache[key]['timestamp'] < ttl_seconds:
                return cache[key]['data']
            
            result = func(*args, **kwargs)
            cache[key] = {'data': result, 'timestamp': now}
            return result
        
        return wrapper
    return decorator

class CachedSpreddAPI(SpreddAPI):
    @cache_response(300)  # 5 minute cache
    def get_stats(self):
        return super().get_stats()
```

### 3. **Error Handling**
```javascript
class RobustSpreddAPI extends SpreddAPI {
  async safeRequest(method, ...args) {
    try {
      return await super[method](...args);
    } catch (error) {
      if (error.response) {
        console.error(`API Error ${error.response.status}:`, error.response.data);
        throw new Error(`Spredd API Error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach Spredd API');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  }
  
  async getMarkets(params) {
    return this.safeRequest('getMarkets', params);
  }
}
```

## 🤝 Support & Community

### Getting Help
- **API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **GitHub Issues:** [Report bugs and request features](https://github.com/spredd/spredd-api/issues)
- **Discord:** [Join our developer community](https://discord.gg/spredd)
- **Email:** `api-support@spredd.markets`

### Contributing
We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### License
MIT License - feel free to use in your projects!

---

**Ready to start building? Check out our [live API documentation](https://backend.spredd.markets/api/docs) and begin integrating prediction market data into your applications today!**