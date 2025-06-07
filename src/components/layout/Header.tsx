interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          {/* Hamburger icon */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Rest of your header content */}
        <div className="flex-1">{/* Your existing header content */}</div>
      </div>
    </header>
  )
}
