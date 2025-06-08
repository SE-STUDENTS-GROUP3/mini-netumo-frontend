import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { fetchTargets } from '@/services/targetService'
import { Target } from '@/types/target'

interface TargetsContextType {
  targets: Target[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const TargetsContext = createContext<TargetsContextType | undefined>(undefined)

export function TargetsProvider({ children }: { children: ReactNode }) {
  const [targets, setTargets] = useState<Target[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await fetchTargets()
      setTargets(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <TargetsContext.Provider value={{ targets, loading, error, refresh }}>
      {children}
    </TargetsContext.Provider>
  )
}

export const useTargets = () => {
  const context = useContext(TargetsContext)
  if (context === undefined) {
    throw new Error('useTargets must be used within a TargetsProvider')
  }
  return context
}