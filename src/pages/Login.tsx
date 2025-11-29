import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '@/context/UserAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuestRoute from '@/components/GuestRoute';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { setToken } = useUserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const accessToken = data.data?.accessToken;
        const refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
        const accessTokenExpires = data.data?.accessTokenExpires;
        const refreshTokenExpires = data.data?.refreshTokenExpires;
        if (accessToken) {
          setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
        } else {
          console.warn('No accessToken in response');
        }
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          // Redirect to home page after successful login
          navigate('/', { replace: true });
          window.dispatchEvent(new Event('authChange'));
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ text: 'Network error. Please check your connection and backend status.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-heading font-bold text-foreground">
                Login to Bloom
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Welcome back! Please sign in to your account.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Forgot password?{' '}
                    <Link 
                      to="/forgot-password"
                      className="text-primary hover:text-primary/80 underline"
                    >
                      Reset
                    </Link>
                  </p>
                </div>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm text-center ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-destructive/10 border border-destructive/30 text-destructive'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Don't have an account?{' '}
                <Link 
                  to="/signup"
                  className="text-primary hover:text-primary/80 underline font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </GuestRoute>
  );
};

export default Login;

