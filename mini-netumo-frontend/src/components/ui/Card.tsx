import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={twMerge('bg-white rounded-lg shadow p-6', className)}>
      {children}
    </div>
  )
}