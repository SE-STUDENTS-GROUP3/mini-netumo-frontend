import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

interface ErrorPageProps {
  status?: number
}

export default function ErrorPage({ status }: ErrorPageProps) {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    status = error.status
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">{status || 'Unexpected'} Error</h1>
      <p className="text-lg mb-2">
        {status === 404
          ? "The page you're looking for doesn't exist."
          : 'Sorry, an unexpected error occurred.'}
      </p>
      <p className="text-gray-500">
        {import.meta.env.MODE === 'development' && (
          <code>{error instanceof Error ? error.message : String(error)}</code>
        )}
      </p>
    </div>
  )
}
