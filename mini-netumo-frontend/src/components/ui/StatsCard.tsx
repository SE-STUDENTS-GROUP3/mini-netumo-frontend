// src/components/ui/StatsCard.tsx
interface StatsCardProps {
  icon?: React.ReactNode
  title: string
  value: string | number
  description: string
}

export function StatsCard({ icon, title, value, description }: StatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <h3 className="text-lg font-semibold">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  )
}
