import { NextResponse } from 'next/server'

export async function GET() {
  // 模拟数据 - 实际使用时应该从后端 API 获取
  const mockStats = {
    totalRequests: 15847,
    successRequests: 14923,
    failedRequests: 924,
    averageResponseTime: 287,
    requestsByEndpoint: [
      { endpoint: '/api/v1/chat/completions', count: 8234 },
      { endpoint: '/api/v1/models', count: 3421 },
      { endpoint: '/api/v1/embeddings', count: 2156 },
      { endpoint: '/api/v1/audio/transcriptions', count: 1234 },
      { endpoint: '/api/v1/images/generations', count: 802 },
    ],
    requestsByDate: [
      { date: '2024-12-02', count: 3245 },
      { date: '2024-12-01', count: 2987 },
      { date: '2024-11-30', count: 2654 },
      { date: '2024-11-29', count: 2234 },
      { date: '2024-11-28', count: 2012 },
      { date: '2024-11-27', count: 1876 },
      { date: '2024-11-26', count: 1839 },
    ],
  }

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json(mockStats)
}
