import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_CONFIG } from "@/lib/config";
import { useMaterialToast } from "@/hooks/useMaterialToast";
import { CheckCircle2, AlertCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useMaterialToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    
    if (!email) {
      const errorMsg = "Please enter your email address.";
      setErrorMessage(errorMsg);
      toast({ description: errorMsg, variant: "destructive", duration: 3000 });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const successMsg = "Password reset link sent to your email! Please check your inbox and click the link to reset your password.";
        setSuccessMessage(successMsg);
        toast({ 
          description: successMsg, 
          duration: 5000 
        });
        setEmail(""); // Clear email after successful submission
      } else {
        const errorMsg = data.message || "Unable to send reset email. Please check your email address and try again.";
        setErrorMessage(errorMsg);
        toast({ 
          description: errorMsg, 
          variant: "destructive", 
          duration: 4000 
        });
      }
    } catch (err) {
      const errorMsg = "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
      toast({ description: errorMsg, variant: "destructive", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-20 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Forgot Password</h1>
        <p className="text-muted-foreground mb-8">Enter your email to receive a password reset link.</p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending…' : 'Send Reset Link'}
          </Button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPassword;



