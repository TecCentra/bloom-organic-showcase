
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Copy, Check, X } from 'lucide-react';

const PaymentFailedPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [copied, setCopied] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const businessNumber = "7998108";
  const accountNumber = "Pure Bloom Haven";
  const branchName = "Tom Mboya Street";

  const copyToClipboard = (text: string, type: 'business' | 'account' = 'business') => {
    navigator.clipboard.writeText(text);
    if (type === 'business') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-card p-8 md:p-10 rounded-lg shadow-soft text-center max-w-2xl w-full border border-border">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-6">Unfortunately, we were unable to process your payment.</p>

        {/* Till Number Payment Option */}
        <div className="bg-secondary/30 border-2 border-primary/20 rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-heading font-bold text-foreground mb-4 text-center">Pay via M-Pesa Till Number</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between bg-card p-3 rounded border border-border">
              <span className="font-semibold text-foreground">Business Number:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">{businessNumber}</span>
                <button
                  onClick={() => copyToClipboard(businessNumber, 'business')}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                  title="Copy business number"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-card p-3 rounded border border-border">
              <span className="font-semibold text-foreground">Account Number: </span>
              <div className="flex items-center gap-2">
                <span className="text-foreground">{accountNumber}</span>
                <button
                  onClick={() => copyToClipboard(accountNumber, 'account')}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                  title="Copy account number"
                >
                  {copiedAccount ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-card p-3 rounded border border-border">
              <span className="font-semibold text-foreground">Branch: </span>
              <span className="text-muted-foreground">{branchName}</span>
            </div>

            <div className="bg-card p-3 rounded border border-border">
              <span className="font-semibold text-foreground">Currency: </span>
              <span className="text-muted-foreground">KES</span>
            </div>
          </div>

          <div className="bg-accent/50 border border-primary/20 rounded p-3 mb-4">
            <p className="text-sm text-foreground">
              <strong className="text-foreground">Instructions:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-left">
                <li>Go to M-Pesa on your phone</li>
                <li>Select <strong>"Pay Bill"</strong></li>
                <li>Enter Business Number: <strong>{businessNumber}</strong></li>
                <li>Enter Account Number: <strong>{accountNumber}</strong></li>
                <li>Enter the amount</li>
                <li>Complete the payment</li>
              </ol>
            </p>
          </div>

          {orderId && (
            <div className="bg-muted border border-border rounded p-3 mb-4">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Order ID:</strong> <span className="font-mono text-foreground">{orderId}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Please include this order ID when contacting support if needed.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/cart"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded transition-colors"
          >
            Try Again
          </Link>
          <Link
            to="/contact"
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-2 px-6 rounded transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
