import { useQuery } from '@tanstack/react-query'
import { fetchTargets } from '@/services/targetService'
import TargetCard from '@/components/targets/TargetCard'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import UptimeChart from '@/components/targets/UptimeChart'

export default function Dashboard() {
  const {
    data: targets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['targets'],
    queryFn: fetchTargets,
  })

  if (isLoading) return <div>Loading targets...</div>
  if (error) return <div>Error loading targets</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button as={Link} to="/targets/add" variant="primary">
          Add Target
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {targets?.map((target) => <TargetCard key={target.id} target={target} />)}
        </div>

        {targets?.[0] && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Uptime Overview</h2>
            <UptimeChart targetId={targets[0].id} />
          </div>
        )}
      </div>
    </div>
  )
}
