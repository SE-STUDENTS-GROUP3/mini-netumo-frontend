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
    <aside className="h-full bg-white border-r border-gray-200 w-64 flex-shrink-0">
      <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-4">
          <span className="text-xl font-bold text-primary-600">Mini-Netumo</span>
          {closeSidebar && (
            <button className="text-gray-500 hover:text-gray-700 lg:hidden" onClick={closeSidebar}>
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
