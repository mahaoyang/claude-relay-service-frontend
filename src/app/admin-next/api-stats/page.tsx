'use client'

import { useEffect, useState } from 'react'

interface ApiStats {
  totalRequests: number
  successRequests: number
  failedRequests: number
  averageResponseTime: number
  requestsByEndpoint: { endpoint: string; count: number }[]
  requestsByDate: { date: string; count: number }[]
}

export default function ApiStatsPage() {
  const [stats, setStats] = useState<ApiStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010'

      // 尝试多个可能的 API 端点
      const endpoints = [
        `${apiUrl}/admin/public/api-stats`, // 后端公开统计端点
        '/api/stats' // 本地模拟 API（回退）
      ]

      let lastError = null
      for (const endpoint of endpoints) {
        try {
          console.log(`尝试请求: ${endpoint}`)
          const response = await fetch(endpoint)

          // 检查响应类型
          const contentType = response.headers.get('content-type')
          if (!contentType || !contentType.includes('application/json')) {
            console.log(`${endpoint} 返回非 JSON 格式，尝试下一个端点`)
            continue
          }

          if (!response.ok) {
            console.log(`${endpoint} 返回错误状态: ${response.status}`)
            continue
          }

          const data = await response.json()
          console.log(`成功从 ${endpoint} 获取数据`)
          setStats(data)
          return
        } catch (err) {
          console.log(`${endpoint} 请求失败:`, err)
          lastError = err
        }
      }

      // 所有端点都失败了
      throw new Error(
        lastError instanceof Error
          ? `无法连接到后端 API: ${lastError.message}。请确保后端服务正在运行在 ${apiUrl}`
          : '无法获取统计数据'
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">加载中...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">错误</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchStats}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              重试
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API 统计</h1>
          <p className="text-gray-600 mt-2">查看 Claude Relay Service 的 API 使用情况</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总请求数</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.totalRequests.toLocaleString() || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">成功请求</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats?.successRequests.toLocaleString() || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">失败请求</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {stats?.failedRequests.toLocaleString() || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均响应时间</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {stats?.averageResponseTime.toFixed(0) || 0}ms
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 端点请求统计 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">按端点统计</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats?.requestsByEndpoint.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.endpoint}</span>
                        <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(item.count / (stats?.totalRequests || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 日期请求统计 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">最近请求趋势</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats?.requestsByDate.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.date}</span>
                        <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(item.count / Math.max(...(stats?.requestsByDate.map(d => d.count) || [1]))) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 刷新按钮 */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={fetchStats}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            刷新数据
          </button>
        </div>
      </div>
    </div>
  )
}
