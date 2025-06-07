interface Target {
  id: string
  name: string
  url: string
  protocol: 'http' | 'https'
  checkInterval: number
  isActive: boolean
  statusChecks: StatusCheck[]
  expiryCheck?: ExpiryCheck
}

interface StatusCheck {
  id: string
  isUp: boolean
  statusCode?: number
  responseTimeMs?: number
  checkedAt: string
}

interface ExpiryCheck {
  sslValidTo?: string
  domainExpiry?: string
  lastChecked: string
}

export default Target
export type { StatusCheck, ExpiryCheck }