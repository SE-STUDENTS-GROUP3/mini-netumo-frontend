import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function useWebSocket(eventName: string, callback: () => void) {
  useEffect(() => {
    const ws = new WebSocket(__WS_URL__)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.event === eventName) callback()
      if (data.event === 'alert') toast.warn(data.message)
    }

    return () => ws.close()
  }, [eventName, callback])
}
