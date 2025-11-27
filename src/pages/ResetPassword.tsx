
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { API_CONFIG } from "@/lib/config";
import { useMaterialToast } from "@/hooks/useMaterialToast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useMaterialToast();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    // Validate token format (basic check)
    if (!token || token.length < 10) {
      setIsValidating(false);
      setTokenValid(false);
      toast({ 
        description: "Invalid or missing reset token.", 
        variant: "destructive", 
        duration: 3000 
      });
    } else {
      setIsValidating(false);
      setTokenValid(true);
    }
  }, [token, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({ 
        description: "Please fill in all fields.", 
        variant: "destructive", 
        duration: 3000 
      });
      return;
    }

    if (password.length < 6) {
      toast({ 
        description: "Password must be at least 6 characters long.", 
        variant: "destructive", 
        duration: 3000 
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({ 
        description: "Passwords do not match.", 
        variant: "destructive", 
        duration: 3000 
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, confirmPassword })
        }
      );
      
      const data = await res.json().catch(() => ({}));
      
      if (res.ok && data.success) {
        toast({ 
          description: "Password reset successfully! Redirecting to login...", 
          duration: 3000 
        });
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
      } else {
        toast({ 
          description: data.message || "Failed to reset password. The token may have expired.", 
          variant: "destructive", 
          duration: 5000 
        });
      }
    } catch (err) {
      toast({ 
        description: "An error occurred. Please try again.", 
        variant: "destructive", 
        duration: 3000 
      });
    } finally {
      setLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="container mx-auto px-4 py-20 max-w-xl">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="container mx-auto px-4 py-20 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Invalid Reset Link
          </h1>
          <p className="text-muted-foreground mb-8">
            The password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link to="/forgot-password">
            <Button>Request New Reset Link</Button>
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-20 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Reset Password
        </h1>
        <p className="text-muted-foreground mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="block text-sm mb-2">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 6 characters long.
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="block text-sm mb-2">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-sm text-primary hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResetPassword;

