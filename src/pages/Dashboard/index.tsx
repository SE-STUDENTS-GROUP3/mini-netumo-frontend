import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import AlertBadge from '@/components/ui/AlertBadge'
import { FiActivity, FiAlertTriangle, FiClock, FiServer } from 'react-icons/fi'

interface Incident {
  id: number
  target: string
  status: 'down' | 'warning'
  duration: string
  timestamp: string
}

interface Target {
  id: number
  name: string
  url: string
  status: 'UP' | 'DOWN'
}

export default function Dashboard() {
  // Hardcoded dashboard data
  const dashboardData = {
    stats: {
      uptime: 99.98,
      activeAlerts: 2,
      avgLatency: 142,
      monitoredTargets: 5,
    },
    targets: [
      { id: 1, name: 'Production API', url: 'https://api.example.com', status: 'UP' },
      { id: 2, name: 'Customer Portal', url: 'https://portal.example.com', status: 'DOWN' },
      { id: 3, name: 'Documentation', url: 'https://docs.example.com', status: 'UP' },
      { id: 4, name: 'Payment Gateway', url: 'https://pay.example.com', status: 'UP' },
      { id: 5, name: 'Admin Dashboard', url: 'https://admin.example.com', status: 'UP' },
    ] as Target[],
    incidents: [
      {
        id: 1,
        target: 'Customer Portal',
        status: 'down' as const,
        duration: '42 min',
        timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        target: 'Payment Gateway',
        status: 'warning' as const,
        duration: '3 hours',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ] as Incident[],
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <FiActivity className="text-green-500 text-xl" />
            <div>
              <h3 className="text-lg font-semibold">{dashboardData.stats.uptime.toFixed(2)}%</h3>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <FiAlertTriangle className="text-red-500 text-xl" />
            <div>
              <h3 className="text-lg font-semibold">{dashboardData.stats.activeAlerts}</h3>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <FiClock className="text-blue-500 text-xl" />
            <div>
              <h3 className="text-lg font-semibold">{dashboardData.stats.avgLatency}ms</h3>
              <p className="text-sm text-gray-600">Avg Latency</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <FiServer className="text-purple-500 text-xl" />
            <div>
              <h3 className="text-lg font-semibold">{dashboardData.stats.monitoredTargets}</h3>
              <p className="text-sm text-gray-600">Monitored Targets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Targets List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Monitored Targets</h2>
          <Button asChild variant="primary" size="sm">
            <Link to="/targets/add">Add Target</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboardData.targets.map((target) => (
            <div key={target.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{target.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    target.status === 'UP'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {target.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">{target.url}</p>
              <div className="mt-3 pt-3 border-t flex justify-between text-xs text-gray-500">
                <span>ID: {target.id}</span>
                <span>Last checked: Just now</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Incidents</h2>
        </div>
        <div className="divide-y">
          {dashboardData.incidents.map((incident) => (
            <div key={incident.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{incident.target}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(incident.timestamp).toLocaleString()} • Duration: {incident.duration}
                  </p>
                </div>
                <AlertBadge status={incident.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
