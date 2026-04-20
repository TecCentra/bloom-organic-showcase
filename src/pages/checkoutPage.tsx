
import { useMemo, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Smartphone,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Truck,
  ArrowLeft,
  Loader2,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { buildApiUrl, API_CONFIG } from "@/lib/config";

interface ShippingZone {
  zone: string;
  name: string;
  price: number;
  areas: string[];
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeItem, clear } = useCart();
  const pollingActiveRef = useRef(false);

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup"); // default pickup

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    apartment: "",
    city: "",
    county: "",
    zone: "",
    area: ""
  });

  const [pickupLocation, setPickupLocation] = useState("beaver-house");
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userFetchError, setUserFetchError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "failed" | "completed">("pending");
  const [isRetryingSTK, setIsRetryingSTK] = useState(false);

  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");

  // === Price Calculations ===
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);

  const shippingCost = useMemo(() => {
    if (deliveryMethod === "pickup") return 0;
    return selectedZone ? selectedZone.price * 100 : 0;
  }, [deliveryMethod, selectedZone]);

  const total = subtotal + shippingCost;

  // === Effects ===
  useEffect(() => {
    if (deliveryMethod === "pickup") {
      setSelectedZone(null);
      setSelectedArea("");
      setShippingInfo({ address: "", apartment: "", city: "", county: "", zone: "", area: "" });
    }
  }, [deliveryMethod]);

  // Fetch zones
  useEffect(() => {
    if (deliveryMethod !== "ship") return;
    const fetchZones = async () => {
      try {
        setIsLoadingZones(true);
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.SHIPPING.ZONES);
        const res = await fetch(url);
        let data = {};
        try {
          const text = await res.text();
          if (text.trim()) data = JSON.parse(text);
        } catch {}
        if (res.ok && data.success && data.data?.zones) {
          setShippingZones(data.data.zones);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingZones(false);
      }
    };
    fetchZones();
  }, [deliveryMethod]);

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || cartItems.length === 0) {
      setIsLoadingUser(false);
      if (cartItems.length === 0) navigate('/cart');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        let data = {};
        try {
          const text = await res.text();
          if (text.trim()) data = JSON.parse(text);
        } catch {}
        if (res.ok && data.success && data.data?.user) {
          const u = data.data.user;
          setCustomerInfo({
            firstName: u.first_name || '',
            lastName: u.last_name || '',
            email: u.email || '',
            phone: u.phone || ''
          });
          setMpesaNumber(u.phone || '');
          setIsFetched(true);
        }
      } catch (e) {
        setUserFetchError(true);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, [navigate, cartItems.length]);

  // === Handlers ===
  const handleQuantityChange = (id: string, action: "increase" | "decrease") => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    if (action === "increase") updateQuantity(id, item.quantity + 1);
    if (action === "decrease" && item.quantity > 1) updateQuantity(id, item.quantity - 1);
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFetched && e.target.name !== 'phone') return;
    const val = e.target.value;
    setCustomerInfo(p => ({ ...p, [e.target.name]: val }));
    if (e.target.name === 'phone') setMpesaNumber(val);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleZoneChange = (v: string) => {
    const zone = shippingZones.find(z => z.zone === v);
    setSelectedZone(zone || null);
    setSelectedArea("");
    setShippingInfo(p => ({ ...p, zone: v, area: "" }));
  };

  const handleAreaChange = (v: string) => {
    setSelectedArea(v);
    setShippingInfo(p => ({ ...p, area: v }));
  };

  // === STK Push Retry ===
  const retrySTKPush = async () => {
    if (!placedOrderId || !mpesaNumber) return;
    setIsRetryingSTK(true);
    setOrderError(null);

    let formatted = mpesaNumber.replace(/\D/g, '');
    if (formatted.startsWith('0') && formatted.length === 10) {
      formatted = '254' + formatted.slice(1);
    } else if (!formatted.startsWith('254')) {
      formatted = '254' + formatted;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://bloom-backend-2.onrender.com/api/v3/kcb/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          order_id: placedOrderId,
          phoneNumber: formatted,
          description: "Order payment"
        })
      });

      let data = {};
      try {
        const text = await res.text();
        if (text.trim()) data = JSON.parse(text);
      } catch {}

      if (res.ok && data.success) {
        setPaymentStatus("pending");
        pollOrderStatus(placedOrderId);
        alert("STK push resent! Check your phone.");
      } else {
        setOrderError(data.message || "Failed to resend STK push");
      }
    } catch (e) {
      setOrderError("Network error. Try again.");
    } finally {
      setIsRetryingSTK(false);
    }
  };

  // === Poll Order ===
  const pollOrderStatus = async (orderId: string) => {
    pollingActiveRef.current = true;
    const interval = 4000;
    const timeout = 120000;
    let elapsed = 0;

    const poll = async () => {
      if (!pollingActiveRef.current) return;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.ALL)}/${orderId}`, {
          headers: { ...(token && { 'Authorization': `Bearer ${token}` }) }
        });
        let d = {};
        try {
          const text = await res.text();
          if (text.trim()) d = JSON.parse(text);
        } catch {}

        if (res.ok && d.success && d.data) {
          // Check payment_status from order object (API returns data.order.payment_status)
          const status = d.data.order?.payment_status || d.data.payment_status || d.data.order?.status || d.data.status;
          if (['completed', 'paid', 'success'].includes(status)) {
            pollingActiveRef.current = false;
            clear();
            navigate('/payment-success', { state: { orderId: orderId } });
            return;
          }
          if (['failed', 'cancelled', 'error'].includes(status)) {
            pollingActiveRef.current = false;
            setPaymentStatus("failed");
            navigate('/payment-failed', { state: { orderId: orderId } });
            return;
          }
        }
      } catch {}

      elapsed += interval;
      if (elapsed < timeout && pollingActiveRef.current) {
        setTimeout(poll, interval);
      } else {
        pollingActiveRef.current = false;
      }
    };
    setTimeout(poll, interval);
  };

  // === Place Order ===
  const handleMpesaPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);
    setOrderCreated(false);
    setPaymentStatus("pending");

    const fullName = `${customerInfo.firstName} ${customerInfo.lastName}`.trim();
    if (!fullName || !customerInfo.email || !customerInfo.phone) {
      alert("Fill name, email, phone");
      return;
    }

    if (deliveryMethod === "ship" && (!shippingInfo.address || !selectedArea || !selectedZone)) {
      alert("Complete shipping address");
      return;
    }

    let formattedPhone = mpesaNumber.replace(/\D/g, '');
    if (formattedPhone.startsWith('0') && formattedPhone.length === 10) {
      formattedPhone = '254' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    if (!/^254[0-9]{9}$/.test(formattedPhone)) {
      alert("Invalid phone. Use 0712345678");
      return;
    }

    setIsProcessing(true);

    try {
      const items = cartItems.map(i => ({ product_id: i.id, quantity: i.quantity }));
      const shippingAddress = deliveryMethod === "ship"
        ? [shippingInfo.address, shippingInfo.apartment, selectedArea, shippingInfo.zone, shippingInfo.city, shippingInfo.county].filter(Boolean).join(', ')
        : "PICKUP - No shipping address required";

      const payload = {
        items,
        payment_method: "kcb_mpesa",
        phone_number: formattedPhone,
        shipping_method: deliveryMethod === "pickup" ? "pickup" : "delivery",
        full_name: fullName,
        email: customerInfo.email,
        phone: mpesaNumber,
        shipping_cost: shippingCost, // Include shipping cost in cents
        ...(deliveryMethod === "ship" && { 
          shipping_address: shippingAddress,
          ...(selectedZone && { shipping_zone: selectedZone.zone }),
          ...(selectedArea && { shipping_area: selectedArea })
        })
      };

      const token = localStorage.getItem('token');
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CHECKOUT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(payload)
      });

      let data = {};
      try {
        const text = await res.text();
        if (text.trim()) data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (res.ok && data.success) {
            const orderId = data.data?.order?.order_id || data.data?.order_id;
            setPlacedOrderId(orderId);
            setOrderCreated(true);
            if (typeof window !== 'undefined' && (window as any).ttq) {
        (window as any).ttq.track('CompletePayment', {
          content_type: 'product',
          currency: 'KES',
          value: total / 100,
          contents: cartItems.map(item => ({
            content_id: item.id,
            content_name: item.name,
            quantity: item.quantity,
            price: item.price / 100,
          })),
        });
      }

        const payStatus = data.data?.payment?.success === false ? "failed" : "pending";
        setPaymentStatus(payStatus);

        if (payStatus === "pending") {
          pollOrderStatus(orderId);
        }
      } else {
        throw new Error(data.message || "Order failed");
      }
    } catch (err: any) {
      setOrderError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // === Loading States ===
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (userFetchError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-sm">
            <p className="text-red-600 mb-4">Login required</p>
            <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate("/cart")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* === Forms (First on mobile) === */}
          <div className="lg:col-span-2 space-y-5 order-1">
            {/* Delivery Method */}
            <div className="bg-card border rounded-xl p-5">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliveryMethod("ship")}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    deliveryMethod === "ship" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <Truck className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium">Ship</p>
                    <p className="text-xs text-muted-foreground">To your door</p>
                  </div>
                  {deliveryMethod === "ship" && <div className="ml-auto w-5 h-5 bg-primary rounded-full" />}
                </div>

                <div
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    deliveryMethod === "pickup" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <User className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium">Free Pickup</p>
                    <p className="text-xs text-muted-foreground">From store</p>
                  </div>
                  {deliveryMethod === "pickup" && <div className="ml-auto w-5 h-5 bg-primary rounded-full" />}
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-card border rounded-xl p-5">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Customer Details {isFetched && <Badge variant="secondary">From Account</Badge>}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input name="firstName" placeholder="John" value={customerInfo.firstName} onChange={handleCustomerChange} readOnly={isFetched} className={`pl-10 ${isFetched ? "bg-muted" : ""}`} />
                  </div>
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input name="lastName" placeholder="Doe" value={customerInfo.lastName} onChange={handleCustomerChange} readOnly={isFetched} className={`pl-10 ${isFetched ? "bg-muted" : ""}`} />
                  </div>
                </div>
                <div>
                  <Label>Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input name="email" type="email" placeholder="john@example.com" value={customerInfo.email} onChange={handleCustomerChange} readOnly={isFetched} className={`pl-10 ${isFetched ? "bg-muted" : ""}`} />
                  </div>
                </div>
                <div>
                  <Label>Phone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input name="phone" placeholder="0712345678" value={customerInfo.phone} onChange={handleCustomerChange} className="pl-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping or Pickup */}
            {deliveryMethod === "ship" ? (
              <div className="bg-card border rounded-xl p-5">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Shipping Address
                </h2>
                <div className="space-y-3">
                  <div>
                    <Label>Zone *</Label>
                    <Select value={shippingInfo.zone} onValueChange={handleZoneChange} disabled={isLoadingZones}>
                      <SelectTrigger><SelectValue placeholder={isLoadingZones ? "Loading..." : "Select zone"} /></SelectTrigger>
                      <SelectContent>
                        {shippingZones.map(z => (
                          <SelectItem key={z.zone} value={z.zone}>
                            {z.name} - Ksh {z.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedZone && (
                    <div>
                      <Label>Area *</Label>
                      <Select value={selectedArea} onValueChange={handleAreaChange}>
                        <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                        <SelectContent>
                          {selectedZone.areas.map((a, i) => <SelectItem key={i} value={a}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <Label>Address *</Label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input name="address" placeholder="123 Main St" className="pl-10" value={shippingInfo.address} onChange={handleShippingChange} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Apartment (Optional)</Label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input name="apartment" placeholder="Apt 4B" className="pl-10" value={shippingInfo.apartment} onChange={handleShippingChange} />
                      </div>
                    </div>
                    <div><Label>City *</Label><Input name="city" placeholder="Nairobi" value={shippingInfo.city} onChange={handleShippingChange} /></div>
                    <div><Label>County *</Label><Input name="county" placeholder="Nairobi" value={shippingInfo.county} onChange={handleShippingChange} /></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border rounded-xl p-5">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Pickup Location
                </h2>
                <Select value={pickupLocation} onValueChange={setPickupLocation}>
                  <SelectTrigger><SelectValue placeholder="Choose store" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beaver-house">Beaver House, Basement B11, Tom Mboya Street</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Payment */}
            <div className="bg-card border rounded-xl p-5">
              <h2 className="text-lg font-bold mb-4">Payment</h2>
              <div
                onClick={() => setPaymentMethod("mpesa")}
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "mpesa" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <Smartphone className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium">M-Pesa</p>
                  <p className="text-xs text-muted-foreground">Lipa Na M-Pesa</p>
                </div>
                {paymentMethod === "mpesa" && <div className="ml-auto w-5 h-5 bg-primary rounded-full" />}
              </div>

              {paymentMethod === "mpesa" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Label className="text-green-900">M-Pesa Number *</Label>
                  <div className="relative mt-2">
                    <Smartphone className="absolute left-3 top-3 w-4 h-4 text-green-600" />
                    <Input
                      type="tel"
                      placeholder="0712345678"
                      className="pl-10 border-green-300"
                      value={mpesaNumber}
                      onChange={(e) => setMpesaNumber(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-green-700 mt-2">You’ll receive an STK push</p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <Button
              className="w-full h-12 text-base"
              onClick={handleMpesaPayment}
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? <>Processing...</> : `Pay Ksh ${(total / 100).toFixed(2)}`}
            </Button>

            {/* Order Created + Payment Failed */}
            {orderCreated && paymentStatus === "failed" && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-300 rounded-lg">
                <p className="text-sm font-medium text-orange-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Order created but payment failed
                </p>
                <p className="text-xs text-orange-700 mt-1">Stock restored. Try again.</p>
                <Button
                  size="sm"
                  className="mt-3 w-full"
                  onClick={retrySTKPush}
                  disabled={isRetryingSTK}
                >
                  {isRetryingSTK ? "Resending..." : "Resend M-Pesa Prompt"}
                </Button>
              </div>
            )}

            {orderError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900">
                {orderError}
              </div>
            )}
          </div>

          {/* === Order Summary (Last on mobile) === */}
          <div className="lg:col-span-1 order-last lg:order-2">
            <div className="bg-card border rounded-xl p-5 sticky top-4 lg:top-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Ksh {(item.price / 100).toFixed(2)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <button onClick={() => handleQuantityChange(item.id, "decrease")} className="w-6 h-6 rounded border flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, "increase")} className="w-6 h-6 rounded border flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Ksh {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{deliveryMethod === "pickup" ? "Pickup" : "Shipping"}</span>
                  <span>
                    {deliveryMethod === "pickup" ? (
                      <Badge variant="outline" className="text-green-600">FREE</Badge>
                    ) : selectedZone ? (
                      `Ksh ${(shippingCost / 100).toFixed(2)}`
                    ) : (
                      <span className="text-muted-foreground text-xs">Select a zone</span>
                    )}
                  </span>
                </div>
                {deliveryMethod === "ship" && selectedZone && (
                  <p className="text-xs text-muted-foreground">{selectedZone.name}</p>
                )}
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
                </div>
              </div>

              {orderCreated && paymentStatus === "pending" && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center text-sm">
                  <p className="font-medium text-blue-900">Waiting for payment...</p>
                  <p className="text-blue-700">Order: {placedOrderId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;