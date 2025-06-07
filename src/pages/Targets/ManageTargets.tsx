import { useQuery } from '@tanstack/react-query'
import { fetchTargets, deleteTarget } from '@/services/targetService'
import TargetCard from '@/components/targets/TargetCard'
import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ManageTargets() {
  const {
    data: targets,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['targets'],
    queryFn: fetchTargets,
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteTarget(id)
      toast.success('Target deleted successfully')
      refetch()
    } catch (error) {
      toast.error('Failed to delete target')
      console.error(error)
    }
  }

  if (isLoading) return <div className="p-4">Loading targets...</div>
  if (error) return <div className="p-4">Error loading targets</div>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Targets</h1>
        <Button as={Link} to="/targets/add" variant="primary">
          Add New Target
        </Button>
      </div>

      <div className="grid gap-4">
        {targets?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No targets found</p>
            <Button as={Link} to="/targets/add" variant="primary">
              Create Your First Target
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {targets?.map((target) => (
              <div key={target.id} className="relative">
                <TargetCard target={target} />
                <div className="absolute top-2 right-2 space-x-2">
                  <Button size="sm" variant="danger" onClick={() => handleDelete(target.id)}>
                    Delete
                  </Button>
                  <Button as={Link} to={`/targets/edit/${target.id}`} size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
