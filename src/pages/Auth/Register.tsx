// src/pages/Auth/Register.tsx
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { toast } from 'react-toastify'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    // call your register API here
    toast.success('Registered successfully')
    navigate('/auth/login')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Username"
          {...register('username', { required: 'Username is required' })}
          error={errors.username?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register('confirmPassword', { required: 'Please confirm password' })}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Register
        </Button>
      </form>
    </div>
  )
}
