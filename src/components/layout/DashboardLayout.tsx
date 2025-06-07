import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-50 w-64 bg-white shadow-xl">
              <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
