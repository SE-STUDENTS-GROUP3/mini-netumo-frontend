import apiClient from './apiClient'
import { User } from '@/types/auth'

interface LoginData {
  email: string
  password: string
}

interface RegisterData extends LoginData {
  name: string
}

interface AuthResponse {
  token: string
  user: User
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data)
  return response.data
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', data)
  return response.data
}

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me')
  return response.data
}