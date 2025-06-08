import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useQuery } from '@tanstack/react-query'
import { fetchStatusChecks } from '@/services/targetService'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface UptimeChartProps {
  targetId: string
}

export default function UptimeChart({ targetId }: UptimeChartProps) {
  const { data: checks } = useQuery({
    queryKey: ['statusChecks', targetId],
    queryFn: () => fetchStatusChecks(targetId)
  })

  const data = {
    labels: checks?.map(c => new Date(c.checkedAt).toLocaleTimeString()) || [],
    datasets: [{
      label: 'Status',
      data: checks?.map(c => c.isUp ? 100 : 0) || [],
      borderColor: '#10B981',
      backgroundColor: '#10B981',
      tension: 0.1
    }]
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value: number) => value === 100 ? 'Up' : value === 0 ? 'Down' : ''
        }
      }
    }
  }

  return <Line data={data} options={options} />
}