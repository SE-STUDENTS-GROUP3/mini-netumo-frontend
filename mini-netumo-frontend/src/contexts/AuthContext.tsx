import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { getProfile } from '@/services/authService'
import { User } from '@/types/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (token: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const userData = await getProfile()
        setUser(userData)
      } catch (error) {
        console.error('Auth initialization failed:', error)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = useCallback(async (token: string) => {
    try {
      localStorage.setItem('token', token)
      const userData = await getProfile()
      setUser(userData)
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Authentication failed')
      logout()
    }
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/auth/login')
    toast.info('Logged out successfully')
  }, [navigate])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}