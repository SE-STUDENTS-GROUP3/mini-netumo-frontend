import { Target } from '@/types/target'
import AlertBadge from '@/components/ui/AlertBadge'
import { Link } from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'

interface TargetCardProps {
  target: Target
}

export default function TargetCard({ target }: TargetCardProps) {
  const latestCheck = target.statusChecks?.[0]
  const status = latestCheck?.isUp ? 'up' : 'down'

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            <Link to={`/targets/${target.id}`} className="hover:underline">
              {target.name}
            </Link>
          </h3>
          <a 
            href={target.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary-500 inline-flex items-center"
          >
            {target.url} <FiExternalLink className="ml-1" />
          </a>
        </div>
        <AlertBadge status={status} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Last checked</p>
          <p className="font-medium">
            {latestCheck?.checkedAt ? new Date(latestCheck.checkedAt).toLocaleTimeString() : '--'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Response time</p>
          <p className="font-medium">
            {latestCheck?.responseTimeMs ? `${latestCheck.responseTimeMs} ms` : '--'}
          </p>
        </div>
      </div>
    </div>
  )
}