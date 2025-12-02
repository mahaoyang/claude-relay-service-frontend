# 后端 API 接口文档

## API 统计端点

前端会依次尝试以下端点，直到找到返回 JSON 数据的端点：

1. `http://localhost:3010/api/admin/stats`（推荐）
2. `http://localhost:3010/api/stats`
3. `http://localhost:3010/admin/stats`
4. `/api/stats`（本地模拟数据，用于开发测试）

## 端点规范

### GET /api/admin/stats

**描述**: 获取 API 使用统计数据

**请求头**:
```
Content-Type: application/json
```

**响应状态码**: 200 OK

**响应格式**:
```json
{
  "totalRequests": 15847,
  "successRequests": 14923,
  "failedRequests": 924,
  "averageResponseTime": 287,
  "requestsByEndpoint": [
    {
      "endpoint": "/api/v1/chat/completions",
      "count": 8234
    },
    {
      "endpoint": "/api/v1/models",
      "count": 3421
    },
    {
      "endpoint": "/api/v1/embeddings",
      "count": 2156
    }
  ],
  "requestsByDate": [
    {
      "date": "2024-12-02",
      "count": 3245
    },
    {
      "date": "2024-12-01",
      "count": 2987
    },
    {
      "date": "2024-11-30",
      "count": 2654
    }
  ]
}
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `totalRequests` | number | 是 | 总请求数 |
| `successRequests` | number | 是 | 成功请求数（HTTP 200-299） |
| `failedRequests` | number | 是 | 失败请求数（HTTP 400+, 500+） |
| `averageResponseTime` | number | 是 | 平均响应时间（毫秒） |
| `requestsByEndpoint` | array | 是 | 按端点统计的请求数组 |
| `requestsByEndpoint[].endpoint` | string | 是 | 端点路径 |
| `requestsByEndpoint[].count` | number | 是 | 该端点的请求次数 |
| `requestsByDate` | array | 是 | 按日期统计的请求数组 |
| `requestsByDate[].date` | string | 是 | 日期（YYYY-MM-DD 格式） |
| `requestsByDate[].count` | number | 是 | 该日期的请求次数 |

## CORS 配置

后端需要配置 CORS 允许前端访问：

```javascript
// Express.js 示例
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'],
  methods: ['GET'],
  credentials: true
}))
```

或者简单配置（开发环境）：

```javascript
app.use(cors())
```

## 错误响应

如果发生错误，后端应返回：

**状态码**: 400, 404, 500 等

**响应格式**:
```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "timestamp": "2024-12-02T15:49:13.126Z"
}
```

## Node.js 后端实现示例

### Express.js

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// API 统计端点
app.get('/api/admin/stats', async (req, res) => {
  try {
    // 从数据库或缓存获取统计数据
    const stats = {
      totalRequests: 15847,
      successRequests: 14923,
      failedRequests: 924,
      averageResponseTime: 287,
      requestsByEndpoint: [
        { endpoint: '/api/v1/chat/completions', count: 8234 },
        { endpoint: '/api/v1/models', count: 3421 },
        { endpoint: '/api/v1/embeddings', count: 2156 }
      ],
      requestsByDate: [
        { date: '2024-12-02', count: 3245 },
        { date: '2024-12-01', count: 2987 },
        { date: '2024-11-30', count: 2654 }
      ]
    }

    res.json(stats)
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

app.listen(3010, () => {
  console.log('Server running on http://localhost:3010')
})
```

### Fastify

```javascript
const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')

fastify.register(cors, {
  origin: true
})

fastify.get('/api/admin/stats', async (request, reply) => {
  return {
    totalRequests: 15847,
    successRequests: 14923,
    failedRequests: 924,
    averageResponseTime: 287,
    requestsByEndpoint: [
      { endpoint: '/api/v1/chat/completions', count: 8234 },
      { endpoint: '/api/v1/models', count: 3421 },
      { endpoint: '/api/v1/embeddings', count: 2156 }
    ],
    requestsByDate: [
      { date: '2024-12-02', count: 3245 },
      { date: '2024-12-01', count: 2987 },
      { date: '2024-11-30', count: 2654 }
    ]
  }
})

fastify.listen({ port: 3010 }, (err) => {
  if (err) throw err
  console.log('Server running on http://localhost:3010')
})
```

## 测试 API

使用 curl 测试：

```bash
curl http://localhost:3010/api/admin/stats
```

预期输出：
```json
{
  "totalRequests": 15847,
  "successRequests": 14923,
  ...
}
```

## 前端调试

前端会在浏览器控制台输出调试信息：

```
尝试请求: http://localhost:3010/api/admin/stats
成功从 http://localhost:3010/api/admin/stats 获取数据
```

如果所有端点都失败，会显示错误信息。

## 部署注意事项

### 开发环境
- 前端：http://localhost:3000
- 后端：http://localhost:3010

### 生产环境
- 前端：https://your-frontend.vercel.app
- 后端：https://your-backend.vercel.app

需要更新环境变量：
```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```
