
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-card p-8 md:p-10 rounded-lg shadow-soft text-center max-w-lg w-full border border-border">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">Thank you for your purchase. Your order is being processed.</p>
        
        {orderId && (
          <div className="bg-muted border border-border rounded p-3 mb-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Order ID:</strong> <span className="font-mono text-xs text-foreground">{orderId}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-2 px-6 rounded transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
