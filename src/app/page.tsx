import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Claude Relay Service</h1>
        <div className="space-y-4">
          <Link
            href="/admin-next/api-stats"
            className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <h2 className="text-2xl font-semibold text-blue-900">API Statistics</h2>
            <p className="text-blue-700 mt-2">View API usage statistics and metrics</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
