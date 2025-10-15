import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Smartphone,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  CheckCircle2,
  ArrowLeft,
  Loader2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  const handleQuantityChange = (id, action) => {
    const target = cartItems.find(i => i.id === id);
    if (!target) return;
    if (action === "increase") updateQuantity(id, target.quantity + 1);
    if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
  };

  const handleRemoveItem = (id) => removeItem(id);

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              You haven't added any items to your cart yet.
            </p>
            <Button onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Your Items ({cartItems.length})</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Ksh {(item.price / 100).toFixed(2)} each
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, "decrease")}
                            className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, "increase")}
                            className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-foreground">
                            Ksh {((item.price * item.quantity) / 100).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Order Summary
              </h2>

              <div className="space-y-2 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">Ksh {((item.price * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Ksh {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        FREE
                      </Badge>
                    ) : (
                      `Ksh ${(shipping / 100).toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 5000 && (
                  <p className="text-xs text-muted-foreground">
                    Add Ksh {((5000 - subtotal) / 100).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full text-lg py-6"
                size="lg"
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;