import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || "UNKNOWN";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order. We've sent a confirmation to your email.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order ID: #{orderId}
          </p>
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => navigate("/profile")}>
              Track Your Order
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
