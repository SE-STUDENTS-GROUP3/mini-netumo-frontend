import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { token } = await login(data);
      authLogin(token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email address"
            id="email"
            type="email"
            autoComplete="email"
            required
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            required
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
        <div className="text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
