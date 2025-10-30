import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_CONFIG } from "@/lib/config";
import { useMaterialToast } from "@/hooks/useMaterialToast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useMaterialToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ description: "Please enter your email address.", variant: "destructive", duration: 3000 });
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
        toast({ description: "Password reset token sent to email!", duration: 3000 });
      } else {
        toast({ description: data.message || "Unable to send reset email.", variant: "destructive", duration: 3000 });
      }
    } catch (err) {
      toast({ description: "Please try again.", variant: "destructive", duration: 3000 });
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



