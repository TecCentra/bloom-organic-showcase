import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2, User } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  title?: string;
}

const LoginForm = ({ onSuccess, onSwitchToSignup }: { onSuccess: () => void; onSwitchToSignup: () => void }) => {
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
        setMessage({ text: 'Login successful!', type: 'success' });
        setTimeout(() => {
          window.dispatchEvent(new Event('authChange'));
          if (onSuccess) {
            onSuccess();
          } else {
            navigate('/');
          }
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
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            <Button 
              type="button" 
              variant="link" 
              size="sm" 
              className="h-auto p-0 text-primary hover:text-primary/80" 
              onClick={() => navigate('/forgot-password')}
            >
              Reset
            </Button>
          </p>
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
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mb-4">Don't have an account?</p>
        <Button
          variant="outline"
          onClick={onSwitchToSignup}
          className="px-8"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

const SignupForm = ({ onSuccess, onSwitchToLogin }: { onSuccess: () => void; onSwitchToLogin: () => void }) => {
  const { setToken } = useUserAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match!', type: 'error' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Auto-login after successful registration
        const loginResponse = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const loginData = await loginResponse.json();
        if (loginResponse.ok && loginData.success) {
          const accessToken = loginData.data?.accessToken;
          const refreshToken = loginData.data?.refreshToken || loginData.refreshToken || loginData.refresh_token;
          const accessTokenExpires = loginData.data?.accessTokenExpires;
          const refreshTokenExpires = loginData.data?.refreshTokenExpires;
          if (accessToken) {
            setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
          }
        }
        setMessage({ text: 'Registration successful! Logging you in...', type: 'success' });
        setTimeout(() => {
          window.dispatchEvent(new Event('authChange'));
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.href = '/';
          }
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
              placeholder="First name"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
              placeholder="Last name"
            />
          </div>
        </div>

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
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
            placeholder="0712345678"
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
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
              placeholder="Confirm your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
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
              Signing Up...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>

      <div className="text-center pt-6">
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mb-4">Already have an account?</p>
        <Button
          variant="outline"
          onClick={onSwitchToLogin}
          className="px-8"
        >
          Sign In
        </Button>
      </div>
    </>
  );
};

export const AuthModal = ({ open, onOpenChange, onSuccess, title = "Sign In" }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <User className="w-6 h-6 text-primary" />
              {isLogin ? title : 'Sign Up'}
            </DialogTitle>
          </DialogHeader>
          {isLogin ? (
            <LoginForm onSuccess={() => { onOpenChange(false); if (onSuccess) onSuccess(); }} onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSuccess={() => { onOpenChange(false); if (onSuccess) onSuccess(); }} onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

