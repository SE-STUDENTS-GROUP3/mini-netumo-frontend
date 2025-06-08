import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiTarget, FiSettings, FiAlertCircle, FiX } from 'react-icons/fi'

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', href: '/', icon: FiHome },
    { name: 'Targets', href: '/targets', icon: FiTarget },
    { name: 'Notifications', href: '/settings/notifications', icon: FiAlertCircle },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ]

  return (
    <aside className="h-full bg-white border-r border-gray-200 w-64 flex-shrink-0 shadow-sm">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">Netumo</span>
          {closeSidebar && (
            <button
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={closeSidebar}
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className={`group flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              AU
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@netumo.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
