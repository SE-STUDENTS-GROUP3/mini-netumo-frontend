import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/components/layout/DashboardLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorPage from '@/components/ErrorPage'

// Define types of AuthContext
type AuthContextType = {
  isAuthenticated: boolean
  isLoading?: boolean
}

/**
 * Higher-order component for lazy loading with Suspense fallback
 */
const lazyWithSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

// Lazy-loaded page components
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const ManageTargets = lazy(() => import('@/pages/Targets/ManageTargets'))
const AddTargetForm = lazy(() => import('@/pages/Targets/AddTargetForm'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const Register = lazy(() => import('@/pages/Auth/Register'))
const Profile = lazy(() => import('@/pages/Settings/Profile'))
const Notifications = lazy(() => import('@/pages/Settings/Notifications'))

/**
 * Authentication guard component
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth() as AuthContextType
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}

/**
 * Reverse protection for auth routes
 */
const RequireUnauth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth() as AuthContextType
  const location = useLocation()

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || '/'
    return <Navigate to={redirectTo} replace />
  }

  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Public auth routes (without any layout wrapper)
      {
        path: 'auth',
        element: (
          <RequireUnauth>
            <Outlet />
          </RequireUnauth>
        ),
        children: [
          { path: 'login', element: lazyWithSuspense(Login) },
          { path: 'register', element: lazyWithSuspense(Register) },
        ],
      },

      // Protected routes (with DashboardLayout)
      {
        path: '/',
        element: (
          //<RequireAuth>
          <DashboardLayout>{/*<Outlet />*/}</DashboardLayout>
          //</RequireAuth>
        ),
        children: [
          { index: true, element: lazyWithSuspense(Dashboard) },
          {
            path: 'targets',
            children: [
              { index: true, element: lazyWithSuspense(ManageTargets) },
              { path: 'add', element: lazyWithSuspense(AddTargetForm) },
            ],
          },
          {
            path: 'settings',
            children: [
              { path: 'profile', element: lazyWithSuspense(Profile) },
              { path: 'notifications', element: lazyWithSuspense(Notifications) },
            ],
          },
        ],
      },

      // Error route
      { path: '*', element: <ErrorPage status={404} /> },
    ],
  },
])

export default router
