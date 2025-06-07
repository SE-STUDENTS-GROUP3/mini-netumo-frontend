import apiClient from './apiClient'

interface Alert {
  id: string
  message: string
  type: string
  createdAt: string
  isRead: boolean
}

export const fetchAlerts = async (): Promise<Alert[]> => {
  const response = await apiClient.get('/alerts')
  return response.data
}

export const markAlertAsRead = async (id: string): Promise<void> => {
  await apiClient.patch(`/alerts/${id}/read`)
}