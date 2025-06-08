import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createTarget } from '@/services/targetService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { toast } from 'react-toastify'

interface FormData {
  name: string
  url: string
  protocol: 'http' | 'https'
}

export default function AddTargetForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      protocol: 'https',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await createTarget(data)
      toast.success('Target created successfully')
      navigate('/targets')
    } catch (error) {
      toast.error('Failed to create target')
      console.error(error)
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Target</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Name</label>
            <Input
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
              placeholder="My Website"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <Input
              {...register('url', {
                required: 'URL is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Must be a valid URL starting with http:// or https://',
                },
              })}
              error={errors.url?.message}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Protocol</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="http"
                  {...register('protocol')}
                  className="h-4 w-4 text-primary-600"
                />
                <span className="ml-2">HTTP</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="https"
                  {...register('protocol')}
                  className="h-4 w-4 text-primary-600"
                />
                <span className="ml-2">HTTPS</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/targets')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isSubmitting}>
              Create Target
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
