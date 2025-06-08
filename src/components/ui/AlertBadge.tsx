import { twMerge } from 'tailwind-merge'

interface AlertBadgeProps {
  status: 'up' | 'down' | 'warning'
  className?: string
}

export default function AlertBadge({ status, className }: AlertBadgeProps) {
  const statusMap = {
    up: { text: 'Operational', classes: 'bg-success-100 text-success-800' },
    down: { text: 'Down', classes: 'bg-danger-100 text-danger-800' },
    warning: { text: 'Warning', classes: 'bg-warning-100 text-warning-800' },
  }

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusMap[status].classes,
        className
      )}
    >
      {statusMap[status].text}
    </span>
  )
}
