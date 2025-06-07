import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorPage from '@/components/ErrorPage'

// Lazy-loaded pages with automatic Suspense
const lazyWithSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const ManageTargets = lazy(() => import('@/pages/Targets/ManageTargets'))
const AddTargetForm = lazy(() => import('@/pages/Targets/AddTargetForm'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const Register = lazy(() => import('@/pages/Auth/Register'))
const Profile = lazy(() => import('@/pages/Settings/Profile'))
const Notifications = lazy(() => import('@/pages/Settings/Notifications'))

const ProtectedLayout = () => (
  <AuthProvider>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  </AuthProvider>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />, // Add error boundary
    children: [
      {
        index: true,
        element: lazyWithSuspense(Dashboard),
      },
      {
        path: 'targets',
        element: lazyWithSuspense(ManageTargets),
      },
      {
        path: 'targets/add',
        element: lazyWithSuspense(AddTargetForm),
      },
      {
        path: 'settings/profile',
        element: lazyWithSuspense(Profile),
      },
      {
        path: 'settings/notifications',
        element: lazyWithSuspense(Notifications),
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    errorElement: <ErrorPage />, // Add error boundary
    children: [
      {
        path: 'login',
        element: lazyWithSuspense(Login),
      },
      {
        path: 'register',
        element: lazyWithSuspense(Register),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage status={404} />, // Catch-all 404 route
  },
])

export default router
