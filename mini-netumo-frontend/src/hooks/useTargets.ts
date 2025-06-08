import { useQuery } from '@tanstack/react-query'
import { fetchTargets } from '@/services/targetService'
import { useWebSocket } from './useWebSocket'

export function useTargets() {
  const query = useQuery({
    queryKey: ['targets'],
    queryFn: fetchTargets
  })

  useWebSocket('targets:updated', () => {
    query.refetch()
  })

  return query
}