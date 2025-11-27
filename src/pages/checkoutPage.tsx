// // // // // import { useMemo, useState } from "react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Label } from "@/components/ui/label";
// // // // // import { 
// // // // //   ShoppingCart, 
// // // // //   Trash2, 
// // // // //   Plus, 
// // // // //   Minus, 
// // // // //   CreditCard, 
// // // // //   Smartphone,
// // // // //   MapPin,
// // // // //   User,
// // // // //   Mail,
// // // // //   Phone,
// // // // //   Home,
// // // // //   CheckCircle2,
// // // // //   ArrowLeft,
// // // // //   Loader2
// // // // // } from "lucide-react";
// // // // // import Header from "@/components/Header";
// // // // // import { useParams, useNavigate } from "react-router-dom";
// // // // // import Footer from "@/components/Footer";
// // // // // import { useCart } from "@/context/CartContext";

// // // // // const CheckoutPage = () => {
// // // // //   const { items: cartItems, updateQuantity, removeItem } = useCart();

// // // // //   const [paymentMethod, setPaymentMethod] = useState("mpesa");
// // // // //   const [mpesaNumber, setMpesaNumber] = useState("");
// // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // //   const [orderSuccess, setOrderSuccess] = useState(false);
  
// // // // //   const [shippingInfo, setShippingInfo] = useState({
// // // // //     fullName: "",
// // // // //     email: "",
// // // // //     phone: "",
// // // // //     address: "",
// // // // //     city: "",
// // // // //     county: ""
// // // // //   });

// // // // //   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
// // // // //   const shipping = subtotal > 5000 ? 0 : 350;
// // // // //   const total = subtotal + shipping;
// // // // //   const navigate = useNavigate();

// // // // //   const handleQuantityChange = (id, action) => {
// // // // //     const target = cartItems.find(i => i.id === id);
// // // // //     if (!target) return;
// // // // //     if (action === "increase") updateQuantity(id, target.quantity + 1);
// // // // //     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
// // // // //   };

// // // // //   const handleRemoveItem = (id) => removeItem(id);

// // // // //   const handleInputChange = (e) => {
// // // // //     setShippingInfo({
// // // // //       ...shippingInfo,
// // // // //       [e.target.name]: e.target.value
// // // // //     });
// // // // //   };

// // // // //   const handleMpesaPayment = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setIsProcessing(true);

// // // // //     // Simulate M-Pesa STK push
// // // // //     setTimeout(() => {
// // // // //       setIsProcessing(false);
// // // // //       setOrderSuccess(true);
// // // // //     }, 3000);
// // // // //   };

// // // // //   if (orderSuccess) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-background">
// // // // //         <Header />
// // // // //         <div className="container mx-auto px-4 py-20">
// // // // //           <div className="max-w-md mx-auto text-center">
// // // // //             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
// // // // //               <CheckCircle2 className="w-12 h-12 text-green-600" />
// // // // //             </div>
// // // // //             <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
// // // // //             <p className="text-muted-foreground mb-2">
// // // // //               Thank you for your order. We've sent a confirmation to your email.
// // // // //             </p>
// // // // //             <p className="text-sm text-muted-foreground mb-8">
// // // // //               Order ID: #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
// // // // //             </p>
// // // // //             <div className="space-y-3">
// // // // //               <Button className="w-full" size="lg">
// // // // //                 Track Your Order
// // // // //               </Button>
// // // // //               <Button variant="outline" className="w-full" size="lg">
// // // // //                 Continue Shopping
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //         <Footer />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       <Header />

// // // // //       <div className="container mx-auto px-4 py-8">
// // // // //         <Button variant="ghost" className="mb-6"
// // // // //          onClick={() => navigate("/")}
// // // // //         >
// // // // //           <ArrowLeft className="w-4 h-4 mr-2" />
// // // // //           Back to Shop
// // // // //         </Button>

// // // // //         <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

// // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // //           {/* Left Column - Forms */}
// // // // //           <div className="lg:col-span-2 space-y-6">
// // // // //             {/* Shipping Information */}
// // // // //             <div className="bg-card border border-border rounded-xl p-6">
// // // // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // // //                 <MapPin className="w-5 h-5 text-primary" />
// // // // //                 Shipping Information
// // // // //               </h2>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                 <div className="md:col-span-2">
// // // // //                   <Label htmlFor="fullName">Full Name *</Label>
// // // // //                   <div className="relative">
// // // // //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // // //                     <Input
// // // // //                       id="fullName"
// // // // //                       name="fullName"
// // // // //                       placeholder="John Doe"
// // // // //                       className="pl-10"
// // // // //                       value={shippingInfo.fullName}
// // // // //                       onChange={handleInputChange}
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <Label htmlFor="email">Email *</Label>
// // // // //                   <div className="relative">
// // // // //                     <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // // //                     <Input
// // // // //                       id="email"
// // // // //                       name="email"
// // // // //                       type="email"
// // // // //                       placeholder="john@example.com"
// // // // //                       className="pl-10"
// // // // //                       value={shippingInfo.email}
// // // // //                       onChange={handleInputChange}
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <Label htmlFor="phone">Phone Number *</Label>
// // // // //                   <div className="relative">
// // // // //                     <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // // //                     <Input
// // // // //                       id="phone"
// // // // //                       name="phone"
// // // // //                       placeholder="0712345678"
// // // // //                       className="pl-10"
// // // // //                       value={shippingInfo.phone}
// // // // //                       onChange={handleInputChange}
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="md:col-span-2">
// // // // //                   <Label htmlFor="address">Street Address *</Label>
// // // // //                   <div className="relative">
// // // // //                     <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // // //                     <Input
// // // // //                       id="address"
// // // // //                       name="address"
// // // // //                       placeholder="123 Main Street"
// // // // //                       className="pl-10"
// // // // //                       value={shippingInfo.address}
// // // // //                       onChange={handleInputChange}
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <Label htmlFor="city">City *</Label>
// // // // //                   <Input
// // // // //                     id="city"
// // // // //                     name="city"
// // // // //                     placeholder="Nairobi"
// // // // //                     value={shippingInfo.city}
// // // // //                     onChange={handleInputChange}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <Label htmlFor="county">County *</Label>
// // // // //                   <Input
// // // // //                     id="county"
// // // // //                     name="county"
// // // // //                     placeholder="Nairobi"
// // // // //                     value={shippingInfo.county}
// // // // //                     onChange={handleInputChange}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Payment Method */}
// // // // //             <div className="bg-card border border-border rounded-xl p-6">
// // // // //               <h2 className="text-xl font-bold mb-4">Payment Method</h2>
// // // // //               <div className="space-y-3">
// // // // //                 {/* M-Pesa Option */}
// // // // //                 <div
// // // // //                   onClick={() => setPaymentMethod("mpesa")}
// // // // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // // // //                     paymentMethod === "mpesa"
// // // // //                       ? "border-primary bg-primary/5"
// // // // //                       : "border-border hover:border-primary/50"
// // // // //                   }`}
// // // // //                 >
// // // // //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// // // // //                     <Smartphone className="w-6 h-6 text-white" />
// // // // //                   </div>
// // // // //                   <div className="flex-1">
// // // // //                     <p className="font-semibold">M-Pesa</p>
// // // // //                     <p className="text-sm text-muted-foreground">Pay with Lipa Na M-Pesa</p>
// // // // //                   </div>
// // // // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // // // //                     paymentMethod === "mpesa"
// // // // //                       ? "border-primary bg-primary"
// // // // //                       : "border-border"
// // // // //                   }`}>
// // // // //                     {paymentMethod === "mpesa" && (
// // // // //                       <div className="w-full h-full flex items-center justify-center">
// // // // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Card Option */}
// // // // //                 <div
// // // // //                   onClick={() => setPaymentMethod("card")}
// // // // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // // // //                     paymentMethod === "card"
// // // // //                       ? "border-primary bg-primary/5"
// // // // //                       : "border-border hover:border-primary/50"
// // // // //                   }`}
// // // // //                 >
// // // // //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// // // // //                     <CreditCard className="w-6 h-6 text-white" />
// // // // //                   </div>
// // // // //                   <div className="flex-1">
// // // // //                     <p className="font-semibold">Credit/Debit Card</p>
// // // // //                     <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
// // // // //                   </div>
// // // // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // // // //                     paymentMethod === "card"
// // // // //                       ? "border-primary bg-primary"
// // // // //                       : "border-border"
// // // // //                   }`}>
// // // // //                     {paymentMethod === "card" && (
// // // // //                       <div className="w-full h-full flex items-center justify-center">
// // // // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* M-Pesa Number Input */}
// // // // //               {paymentMethod === "mpesa" && (
// // // // //                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// // // // //                   <Label htmlFor="mpesaNumber" className="text-green-900">
// // // // //                     M-Pesa Phone Number *
// // // // //                   </Label>
// // // // //                   <div className="relative mt-2">
// // // // //                     <Smartphone className="absolute left-3 top-3 w-4 h-4 text-green-600" />
// // // // //                     <Input
// // // // //                       id="mpesaNumber"
// // // // //                       type="tel"
// // // // //                       placeholder="254712345678"
// // // // //                       className="pl-10 border-green-300 focus:border-green-500"
// // // // //                       value={mpesaNumber}
// // // // //                       onChange={(e) => setMpesaNumber(e.target.value)}
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                   <p className="text-xs text-green-700 mt-2">
// // // // //                     Enter the phone number you'll use to complete the M-Pesa payment
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}

// // // // //               {/* Card Input */}
// // // // //               {paymentMethod === "card" && (
// // // // //                 <div className="mt-6 space-y-4">
// // // // //                   <div>
// // // // //                     <Label htmlFor="cardNumber">Card Number *</Label>
// // // // //                     <Input
// // // // //                       id="cardNumber"
// // // // //                       placeholder="1234 5678 9012 3456"
// // // // //                       required
// // // // //                     />
// // // // //                   </div>
// // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // //                     <div>
// // // // //                       <Label htmlFor="expiry">Expiry Date *</Label>
// // // // //                       <Input
// // // // //                         id="expiry"
// // // // //                         placeholder="MM/YY"
// // // // //                         required
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <Label htmlFor="cvv">CVV *</Label>
// // // // //                       <Input
// // // // //                         id="cvv"
// // // // //                         placeholder="123"
// // // // //                         maxLength={3}
// // // // //                         required
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Right Column - Order Summary */}
// // // // //           <div className="lg:col-span-1">
// // // // //             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
// // // // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // // //                 <ShoppingCart className="w-5 h-5 text-primary" />
// // // // //                 Order Summary
// // // // //               </h2>

// // // // //               {/* Cart Items */}
// // // // //               <div className="space-y-4 mb-6">
// // // // //                 {cartItems.map((item) => (
// // // // //                   <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
// // // // //                     <img
// // // // //                       src={item.image}
// // // // //                       alt={item.name}
// // // // //                       className="w-16 h-16 rounded-lg object-cover"
// // // // //                     />
// // // // //                     <div className="flex-1">
// // // // //                       <p className="font-semibold text-sm mb-1">{item.name}</p>
// // // // //                       <p className="text-sm text-muted-foreground mb-2">
// // // // //                         Ksh {(item.price / 100).toFixed(2)}
// // // // //                       </p>
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <button
// // // // //                           onClick={() => handleQuantityChange(item.id, "decrease")}
// // // // //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // // // //                           aria-label={`Decrease quantity of ${item.name}`}
// // // // //                         >
// // // // //                           <Minus className="w-3 h-3" />
// // // // //                         </button>
// // // // //                         <span className="text-sm font-medium w-6 text-center">
// // // // //                           {item.quantity}
// // // // //                         </span>
// // // // //                         <button
// // // // //                           onClick={() => handleQuantityChange(item.id, "increase")}
// // // // //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // // // //                           aria-label={`Increase quantity of ${item.name}`}
// // // // //                         >
// // // // //                           <Plus className="w-3 h-3" />
// // // // //                         </button>
// // // // //                         <button
// // // // //                           onClick={() => handleRemoveItem(item.id)}
// // // // //                           className="ml-auto text-red-500 hover:text-red-600"
// // // // //                           aria-label={`Remove ${item.name} from cart`}
// // // // //                         >
// // // // //                           <Trash2 className="w-4 h-4" />
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>

// // // // //               {/* Price Breakdown */}
// // // // //               <div className="space-y-3 mb-6">
// // // // //                 <div className="flex justify-between text-muted-foreground">
// // // // //                   <span>Subtotal</span>
// // // // //                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
// // // // //                 </div>
// // // // //                 <div className="flex justify-between text-muted-foreground">
// // // // //                   <span>Shipping</span>
// // // // //                   <span>
// // // // //                     {shipping === 0 ? (
// // // // //                       <Badge variant="outline" className="text-green-600 border-green-600">
// // // // //                         FREE
// // // // //                       </Badge>
// // // // //                     ) : (
// // // // //                       `Ksh ${(shipping / 100).toFixed(2)}`
// // // // //                     )}
// // // // //                   </span>
// // // // //                 </div>
// // // // //                 {subtotal < 5000 && (
// // // // //                   <p className="text-xs text-muted-foreground">
// // // // //                     Add Ksh {((5000 - subtotal) / 100).toFixed(2)} more for free shipping
// // // // //                   </p>
// // // // //                 )}
// // // // //                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
// // // // //                   <span>Total</span>
// // // // //                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Place Order Button */}
// // // // //               <Button
// // // // //                 className="w-full text-lg py-6"
// // // // //                 size="lg"
// // // // //                 onClick={handleMpesaPayment}
// // // // //                 disabled={isProcessing || cartItems.length === 0}
// // // // //               >
// // // // //                 {isProcessing ? (
// // // // //                   <>
// // // // //                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
// // // // //                     Processing...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   `Place Order - Ksh ${(total / 100).toFixed(2)}`
// // // // //                 )}
// // // // //               </Button>

// // // // //               {isProcessing && paymentMethod === "mpesa" && (
// // // // //                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
// // // // //                   <p className="text-sm text-green-900 font-medium text-center">
// // // // //                     Check your phone for M-Pesa prompt
// // // // //                   </p>
// // // // //                   <p className="text-xs text-green-700 text-center mt-1">
// // // // //                     Enter your M-Pesa PIN to complete payment
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}

// // // // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // // // //                 By placing your order, you agree to our Terms & Conditions
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <Footer />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CheckoutPage;
// // // // import { useMemo, useState } from "react";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // import { 
// // // //   ShoppingCart, 
// // // //   Trash2, 
// // // //   Plus, 
// // // //   Minus, 
// // // //   CreditCard, 
// // // //   Smartphone,
// // // //   MapPin,
// // // //   User,
// // // //   Mail,
// // // //   Phone,
// // // //   Home,
// // // //   Truck,
// // // //   CheckCircle2,
// // // //   ArrowLeft,
// // // //   Loader2
// // // // } from "lucide-react";
// // // // import Header from "@/components/Header";
// // // // import { useParams, useNavigate } from "react-router-dom";
// // // // import Footer from "@/components/Footer";
// // // // import { useCart } from "@/context/CartContext";

// // // // const CheckoutPage = () => {
// // // //   const { items: cartItems, updateQuantity, removeItem } = useCart();

// // // //   const [paymentMethod, setPaymentMethod] = useState("mpesa");
// // // //   const [mpesaNumber, setMpesaNumber] = useState("");
// // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // //   const [orderSuccess, setOrderSuccess] = useState(false);
// // // //   const [deliveryMethod, setDeliveryMethod] = useState("ship");
  
// // // //   const [customerInfo, setCustomerInfo] = useState({
// // // //     firstName: "",
// // // //     lastName: "",
// // // //     email: "",
// // // //     phone: ""
// // // //   });

// // // //   const [shippingInfo, setShippingInfo] = useState({
// // // //     address: "",
// // // //     apartment: "",
// // // //     city: "",
// // // //     county: ""
// // // //   });

// // // //   const [pickupLocation, setPickupLocation] = useState("");

// // // //   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
// // // //   const shippingCost = deliveryMethod === "pickup" ? 0 : (subtotal > 5000 ? 0 : 350);
// // // //   const total = subtotal + shippingCost;
// // // //   const navigate = useNavigate();

// // // //   const handleQuantityChange = (id, action) => {
// // // //     const target = cartItems.find(i => i.id === id);
// // // //     if (!target) return;
// // // //     if (action === "increase") updateQuantity(id, target.quantity + 1);
// // // //     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
// // // //   };

// // // //   const handleRemoveItem = (id) => removeItem(id);

// // // //   const handleCustomerChange = (e) => {
// // // //     setCustomerInfo({
// // // //       ...customerInfo,
// // // //       [e.target.name]: e.target.value
// // // //     });
// // // //   };

// // // //   const handleShippingChange = (e) => {
// // // //     setShippingInfo({
// // // //       ...shippingInfo,
// // // //       [e.target.name]: e.target.value
// // // //     });
// // // //   };

// // // //   const handleMpesaPayment = async (e) => {
// // // //     e.preventDefault();
// // // //     setIsProcessing(true);

// // // //     // Simulate M-Pesa STK push
// // // //     setTimeout(() => {
// // // //       setIsProcessing(false);
// // // //       setOrderSuccess(true);
// // // //     }, 3000);
// // // //   };

// // // //   if (orderSuccess) {
// // // //     return (
// // // //       <div className="min-h-screen bg-background">
// // // //         <Header />
// // // //         <div className="container mx-auto px-4 py-20">
// // // //           <div className="max-w-md mx-auto text-center">
// // // //             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
// // // //               <CheckCircle2 className="w-12 h-12 text-green-600" />
// // // //             </div>
// // // //             <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
// // // //             <p className="text-muted-foreground mb-2">
// // // //               Thank you for your order. We've sent a confirmation to your email.
// // // //             </p>
// // // //             <p className="text-sm text-muted-foreground mb-8">
// // // //               Order ID: #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
// // // //             </p>
// // // //             <div className="space-y-3">
// // // //               <Button className="w-full" size="lg">
// // // //                 Track Your Order
// // // //               </Button>
// // // //               <Button variant="outline" className="w-full" size="lg">
// // // //                 Continue Shopping
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //         <Footer />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       <Header />

// // // //       <div className="container mx-auto px-4 py-8">
// // // //         <Button variant="ghost" className="mb-6"
// // // //          onClick={() => navigate("/")}
// // // //         >
// // // //           <ArrowLeft className="w-4 h-4 mr-2" />
// // // //           Back to Shop
// // // //         </Button>

// // // //         <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // //           {/* Left Column - Forms */}
// // // //           <div className="lg:col-span-2 space-y-6">
// // // //             {/* Delivery Method */}
// // // //             <div className="bg-card border border-border rounded-xl p-6">
// // // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // //                 <MapPin className="w-5 h-5 text-primary" />
// // // //                 Delivery Method
// // // //               </h2>
// // // //               <div className="space-y-3">
// // // //                 {/* Ship Option */}
// // // //                 <div
// // // //                   onClick={() => setDeliveryMethod("ship")}
// // // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // // //                     deliveryMethod === "ship"
// // // //                       ? "border-primary bg-primary/5"
// // // //                       : "border-border hover:border-primary/50"
// // // //                   }`}
// // // //                 >
// // // //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// // // //                     <Truck className="w-6 h-6 text-white" />
// // // //                   </div>
// // // //                   <div className="flex-1">
// // // //                     <p className="font-semibold">Ship</p>
// // // //                     <p className="text-sm text-muted-foreground">Delivered to your door</p>
// // // //                   </div>
// // // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // // //                     deliveryMethod === "ship"
// // // //                       ? "border-primary bg-primary"
// // // //                       : "border-border"
// // // //                   }`}>
// // // //                     {deliveryMethod === "ship" && (
// // // //                       <div className="w-full h-full flex items-center justify-center">
// // // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Free Pickup Option */}
// // // //                 <div
// // // //                   onClick={() => setDeliveryMethod("pickup")}
// // // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // // //                     deliveryMethod === "pickup"
// // // //                       ? "border-primary bg-primary/5"
// // // //                       : "border-border hover:border-primary/50"
// // // //                   }`}
// // // //                 >
// // // //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// // // //                     <User className="w-6 h-6 text-white" />
// // // //                   </div>
// // // //                   <div className="flex-1">
// // // //                     <p className="font-semibold">Free Pickup</p>
// // // //                     <p className="text-sm text-muted-foreground">Collect from store</p>
// // // //                   </div>
// // // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // // //                     deliveryMethod === "pickup"
// // // //                       ? "border-primary bg-primary"
// // // //                       : "border-border"
// // // //                   }`}>
// // // //                     {deliveryMethod === "pickup" && (
// // // //                       <div className="w-full h-full flex items-center justify-center">
// // // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Customer Details */}
// // // //             <div className="bg-card border border-border rounded-xl p-6">
// // // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // //                 <User className="w-5 h-5 text-primary" />
// // // //                 Customer Details
// // // //               </h2>
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                 <div>
// // // //                   <Label htmlFor="firstName">First Name *</Label>
// // // //                   <div className="relative">
// // // //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // //                     <Input
// // // //                       id="firstName"
// // // //                       name="firstName"
// // // //                       placeholder="John"
// // // //                       className="pl-10"
// // // //                       value={customerInfo.firstName}
// // // //                       onChange={handleCustomerChange}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label htmlFor="lastName">Last Name *</Label>
// // // //                   <div className="relative">
// // // //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // //                     <Input
// // // //                       id="lastName"
// // // //                       name="lastName"
// // // //                       placeholder="Doe"
// // // //                       className="pl-10"
// // // //                       value={customerInfo.lastName}
// // // //                       onChange={handleCustomerChange}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label htmlFor="email">Email *</Label>
// // // //                   <div className="relative">
// // // //                     <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // //                     <Input
// // // //                       id="email"
// // // //                       name="email"
// // // //                       type="email"
// // // //                       placeholder="john@example.com"
// // // //                       className="pl-10"
// // // //                       value={customerInfo.email}
// // // //                       onChange={handleCustomerChange}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label htmlFor="phone">Phone Number *</Label>
// // // //                   <div className="relative">
// // // //                     <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // //                     <Input
// // // //                       id="phone"
// // // //                       name="phone"
// // // //                       placeholder="0712345678"
// // // //                       className="pl-10"
// // // //                       value={customerInfo.phone}
// // // //                       onChange={handleCustomerChange}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Conditional Shipping or Pickup */}
// // // //             {deliveryMethod === "ship" ? (
// // // //               <div className="bg-card border border-border rounded-xl p-6">
// // // //                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // //                   <Home className="w-5 h-5 text-primary" />
// // // //                   Shipping Address
// // // //                 </h2>
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                   <div className="md:col-span-2">
// // // //                     <Label htmlFor="address">Physical Address *</Label>
// // // //                     <div className="relative">
// // // //                       <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // //                       <Input
// // // //                         id="address"
// // // //                         name="address"
// // // //                         placeholder="123 Main Street"
// // // //                         className="pl-10"
// // // //                         value={shippingInfo.address}
// // // //                         onChange={handleShippingChange}
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="md:col-span-2">
// // // //                     <Label htmlFor="apartment">Apartment/Estate (Optional)</Label>
// // // //                     <div className="relative">
// // // //                       <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // // //                       <Input
// // // //                         id="apartment"
// // // //                         name="apartment"
// // // //                         placeholder="Apt 4B"
// // // //                         className="pl-10"
// // // //                         value={shippingInfo.apartment}
// // // //                         onChange={handleShippingChange}
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label htmlFor="city">City *</Label>
// // // //                     <Input
// // // //                       id="city"
// // // //                       name="city"
// // // //                       placeholder="Nairobi"
// // // //                       value={shippingInfo.city}
// // // //                       onChange={handleShippingChange}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label htmlFor="county">County *</Label>
// // // //                     <Input
// // // //                       id="county"
// // // //                       name="county"
// // // //                       placeholder="Nairobi"
// // // //                       value={shippingInfo.county}
// // // //                       onChange={handleShippingChange}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="bg-card border border-border rounded-xl p-6">
// // // //                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // //                   <MapPin className="w-5 h-5 text-primary" />
// // // //                   Pickup Location
// // // //                 </h2>
// // // //                 <div>
// // // //                   <Label htmlFor="pickup">Select Store *</Label>
// // // //                   <Select value={pickupLocation} onValueChange={setPickupLocation}>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Choose a store" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="beaver-house">
// // // //                         Beaver House, Basement B11, Opposite Club Eureka, Tom Mboya Street
// // // //                       </SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //               </div>
// // // //             )}

// // // //             {/* Payment Method */}
// // // //             <div className="bg-card border border-border rounded-xl p-6">
// // // //               <h2 className="text-xl font-bold mb-4">Payment Method</h2>
// // // //               <div className="space-y-3">
// // // //                 {/* M-Pesa Option */}
// // // //                 <div
// // // //                   onClick={() => setPaymentMethod("mpesa")}
// // // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // // //                     paymentMethod === "mpesa"
// // // //                       ? "border-primary bg-primary/5"
// // // //                       : "border-border hover:border-primary/50"
// // // //                   }`}
// // // //                 >
// // // //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// // // //                     <Smartphone className="w-6 h-6 text-white" />
// // // //                   </div>
// // // //                   <div className="flex-1">
// // // //                     <p className="font-semibold">M-Pesa</p>
// // // //                     <p className="text-sm text-muted-foreground">Pay with Lipa Na M-Pesa</p>
// // // //                   </div>
// // // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // // //                     paymentMethod === "mpesa"
// // // //                       ? "border-primary bg-primary"
// // // //                       : "border-border"
// // // //                   }`}>
// // // //                     {paymentMethod === "mpesa" && (
// // // //                       <div className="w-full h-full flex items-center justify-center">
// // // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Card Option */}
// // // //                 <div
// // // //                   onClick={() => setPaymentMethod("card")}
// // // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // // //                     paymentMethod === "card"
// // // //                       ? "border-primary bg-primary/5"
// // // //                       : "border-border hover:border-primary/50"
// // // //                   }`}
// // // //                 >
// // // //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// // // //                     <CreditCard className="w-6 h-6 text-white" />
// // // //                   </div>
// // // //                   <div className="flex-1">
// // // //                     <p className="font-semibold">Credit/Debit Card</p>
// // // //                     <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
// // // //                   </div>
// // // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // // //                     paymentMethod === "card"
// // // //                       ? "border-primary bg-primary"
// // // //                       : "border-border"
// // // //                   }`}>
// // // //                     {paymentMethod === "card" && (
// // // //                       <div className="w-full h-full flex items-center justify-center">
// // // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* M-Pesa Number Input */}
// // // //               {paymentMethod === "mpesa" && (
// // // //                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// // // //                   <Label htmlFor="mpesaNumber" className="text-green-900">
// // // //                     M-Pesa Phone Number *
// // // //                   </Label>
// // // //                   <div className="relative mt-2">
// // // //                     <Smartphone className="absolute left-3 top-3 w-4 h-4 text-green-600" />
// // // //                     <Input
// // // //                       id="mpesaNumber"
// // // //                       type="tel"
// // // //                       placeholder="254712345678"
// // // //                       className="pl-10 border-green-300 focus:border-green-500"
// // // //                       value={mpesaNumber}
// // // //                       onChange={(e) => setMpesaNumber(e.target.value)}
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                   <p className="text-xs text-green-700 mt-2">
// // // //                     Enter the phone number you'll use to complete the M-Pesa payment
// // // //                   </p>
// // // //                 </div>
// // // //               )}

// // // //               {/* Card Input */}
// // // //               {paymentMethod === "card" && (
// // // //                 <div className="mt-6 space-y-4">
// // // //                   <div>
// // // //                     <Label htmlFor="cardNumber">Card Number *</Label>
// // // //                     <Input
// // // //                       id="cardNumber"
// // // //                       placeholder="1234 5678 9012 3456"
// // // //                       required
// // // //                     />
// // // //                   </div>
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <div>
// // // //                       <Label htmlFor="expiry">Expiry Date *</Label>
// // // //                       <Input
// // // //                         id="expiry"
// // // //                         placeholder="MM/YY"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <Label htmlFor="cvv">CVV *</Label>
// // // //                       <Input
// // // //                         id="cvv"
// // // //                         placeholder="123"
// // // //                         maxLength={3}
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Column - Order Summary */}
// // // //           <div className="lg:col-span-1">
// // // //             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
// // // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // // //                 <ShoppingCart className="w-5 h-5 text-primary" />
// // // //                 Order Summary
// // // //               </h2>

// // // //               {/* Cart Items */}
// // // //               <div className="space-y-4 mb-6">
// // // //                 {cartItems.map((item) => (
// // // //                   <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
// // // //                     <img
// // // //                       src={item.image}
// // // //                       alt={item.name}
// // // //                       className="w-16 h-16 rounded-lg object-cover"
// // // //                     />
// // // //                     <div className="flex-1">
// // // //                       <p className="font-semibold text-sm mb-1">{item.name}</p>
// // // //                       <p className="text-sm text-muted-foreground mb-2">
// // // //                         Ksh {(item.price / 100).toFixed(2)}
// // // //                       </p>
// // // //                       <div className="flex items-center gap-2">
// // // //                         <button
// // // //                           onClick={() => handleQuantityChange(item.id, "decrease")}
// // // //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // // //                           aria-label={`Decrease quantity of ${item.name}`}
// // // //                         >
// // // //                           <Minus className="w-3 h-3" />
// // // //                         </button>
// // // //                         <span className="text-sm font-medium w-6 text-center">
// // // //                           {item.quantity}
// // // //                         </span>
// // // //                         <button
// // // //                           onClick={() => handleQuantityChange(item.id, "increase")}
// // // //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // // //                           aria-label={`Increase quantity of ${item.name}`}
// // // //                         >
// // // //                           <Plus className="w-3 h-3" />
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => handleRemoveItem(item.id)}
// // // //                           className="ml-auto text-red-500 hover:text-red-600"
// // // //                           aria-label={`Remove ${item.name} from cart`}
// // // //                         >
// // // //                           <Trash2 className="w-4 h-4" />
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               {/* Price Breakdown */}
// // // //               <div className="space-y-3 mb-6">
// // // //                 <div className="flex justify-between text-muted-foreground">
// // // //                   <span>Subtotal</span>
// // // //                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
// // // //                 </div>
// // // //                 <div className="flex justify-between text-muted-foreground">
// // // //                   <span>{deliveryMethod === "pickup" ? "Pickup" : "Shipping"}</span>
// // // //                   <span>
// // // //                     {shippingCost === 0 ? (
// // // //                       <Badge variant="outline" className="text-green-600 border-green-600">
// // // //                         FREE
// // // //                       </Badge>
// // // //                     ) : (
// // // //                       `Ksh ${(shippingCost / 100).toFixed(2)}`
// // // //                     )}
// // // //                   </span>
// // // //                 </div>
// // // //                 {deliveryMethod === "ship" && subtotal < 5000 && (
// // // //                   <p className="text-xs text-muted-foreground">
// // // //                     Add Ksh {((5000 - subtotal) / 100).toFixed(2)} more for free shipping
// // // //                   </p>
// // // //                 )}
// // // //                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
// // // //                   <span>Total</span>
// // // //                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Place Order Button */}
// // // //               <Button
// // // //                 className="w-full text-lg py-6"
// // // //                 size="lg"
// // // //                 onClick={handleMpesaPayment}
// // // //                 disabled={isProcessing || cartItems.length === 0}
// // // //               >
// // // //                 {isProcessing ? (
// // // //                   <>
// // // //                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
// // // //                     Processing...
// // // //                   </>
// // // //                 ) : (
// // // //                   `Place Order - Ksh ${(total / 100).toFixed(2)}`
// // // //                 )}
// // // //               </Button>

// // // //               {isProcessing && paymentMethod === "mpesa" && (
// // // //                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
// // // //                   <p className="text-sm text-green-900 font-medium text-center">
// // // //                     Check your phone for M-Pesa prompt
// // // //                   </p>
// // // //                   <p className="text-xs text-green-700 text-center mt-1">
// // // //                     Enter your M-Pesa PIN to complete payment
// // // //                   </p>
// // // //                 </div>
// // // //               )}

// // // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // // //                 By placing your order, you agree to our Terms & Conditions
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <Footer />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CheckoutPage;
// // // import { useMemo, useState, useEffect } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // import { 
// // //   ShoppingCart, 
// // //   Trash2, 
// // //   Plus, 
// // //   Minus, 
// // //   CreditCard, 
// // //   Smartphone,
// // //   MapPin,
// // //   User,
// // //   Mail,
// // //   Phone,
// // //   Home,
// // //   Truck,
// // //   CheckCircle2,
// // //   ArrowLeft,
// // //   Loader2
// // // } from "lucide-react";
// // // import Header from "@/components/Header";
// // // import { useNavigate } from "react-router-dom";
// // // import Footer from "@/components/Footer";
// // // import { useCart } from "@/context/CartContext";
// // // import { buildApiUrl, getApiUrl, API_CONFIG } from "@/lib/config";

// // // interface ShippingZone {
// // //   zone: string;
// // //   name: string;
// // //   price: number;
// // //   areas: string[];
// // // }

// // // const CheckoutPage = () => {
// // //   const navigate = useNavigate();
// // //   const { items: cartItems, updateQuantity, removeItem, clear } = useCart();

// // //   const [paymentMethod, setPaymentMethod] = useState("mpesa");
// // //   const [mpesaNumber, setMpesaNumber] = useState("");
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const [deliveryMethod, setDeliveryMethod] = useState("ship");
  
// // //   const [customerInfo, setCustomerInfo] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     email: "",
// // //     phone: ""
// // //   });

// // //   const [shippingInfo, setShippingInfo] = useState({
// // //     address: "",
// // //     apartment: "",
// // //     city: "",
// // //     county: "",
// // //     zone: "",
// // //     area: ""
// // //   });

// // //   const [pickupLocation, setPickupLocation] = useState("");
// // //   const [isLoadingUser, setIsLoadingUser] = useState(true);
// // //   const [userFetchError, setUserFetchError] = useState(false);
// // //   const [isFetched, setIsFetched] = useState(false);
// // //   const [orderError, setOrderError] = useState<string | null>(null);
// // //   const [waitingForWebhook, setWaitingForWebhook] = useState(false);
// // //   const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
// // //   const [webhookTimeout, setWebhookTimeout] = useState(false);
  
// // //   // Shipping zones state
// // //   const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
// // //   const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
// // //   const [isLoadingZones, setIsLoadingZones] = useState(false);
// // //   const [selectedArea, setSelectedArea] = useState("");

// // //   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
  
// // //   // Calculate shipping cost based on selected zone
// // //   // Convert API price (in Ksh) to cents to match cart format
// // //   const shippingCost = useMemo(() => {
// // //     if (deliveryMethod === "pickup") return 0;
// // //     if (selectedZone) return selectedZone.price * 100; // Convert Ksh to cents
// // //     return 0; // No shipping cost if no zone selected
// // //   }, [deliveryMethod, selectedZone]);
  
// // //   const total = subtotal + shippingCost;

// // //   // Reset shipping info when delivery method changes
// // //   useEffect(() => {
// // //     if (deliveryMethod === "pickup") {
// // //       setSelectedZone(null);
// // //       setSelectedArea("");
// // //       setShippingInfo(prev => ({ ...prev, zone: "", area: "" }));
// // //     }
// // //   }, [deliveryMethod]);

// // //   // Fetch shipping zones on mount
// // //   useEffect(() => {
// // //     const fetchShippingZones = async () => {
// // //       try {
// // //         setIsLoadingZones(true);
// // //         const url = getApiUrl('SHIPPING', 'ZONES');
// // //         const response = await fetch(url);
// // //         const data = await response.json();
        
// // //         if (response.ok && data.success && data.data?.zones) {
// // //           setShippingZones(data.data.zones);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching shipping zones:', error);
// // //       } finally {
// // //         setIsLoadingZones(false);
// // //       }
// // //     };

// // //     if (deliveryMethod === "ship") {
// // //       fetchShippingZones();
// // //     }
// // //   }, [deliveryMethod]);

// // //   // Fetch user details on mount if token exists
// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');
// // //     console.log('Checkout mounted, token:', !!token ? 'present' : 'missing');

// // //     if (token && cartItems.length > 0) {
// // //       const fetchUserProfile = async () => {
// // //         try {
// // //           console.log('Fetching user profile...');
// // //           const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/me', {
// // //             method: 'GET',
// // //             headers: {
// // //               'Authorization': `Bearer ${token}`,
// // //               'Content-Type': 'application/json',
// // //             },
// // //           });

// // //           const data = await response.json();
// // //           console.log('Profile response:', response.status, data);

// // //           if (response.ok && data.success) {
// // //             const user = data.data?.user;
// // //             if (user) {
// // //               setCustomerInfo({
// // //                 firstName: user.first_name || '',
// // //                 lastName: user.last_name || '',
// // //                 email: user.email || '',
// // //                 phone: user.phone || ''
// // //               });
// // //               setMpesaNumber(user.phone || '');
// // //               setIsFetched(true);
// // //             } else {
// // //               throw new Error('No user in response');
// // //             }
// // //           } else {
// // //             throw new Error(`Profile fetch failed: ${response.status} - ${data.message || 'Unknown error'}`);
// // //           }
// // //         } catch (error) {
// // //           console.error('Profile error:', error);
// // //           setUserFetchError(true);
// // //         } finally {
// // //           setIsLoadingUser(false);
// // //         }
// // //       };

// // //       fetchUserProfile();
// // //     } else {
// // //       setIsLoadingUser(false);
// // //       if (cartItems.length === 0) {
// // //         navigate('/cart');
// // //       }
// // //       if (!token) {
// // //         console.warn('No token found—customer details will be manual');
// // //         setUserFetchError(true);
// // //       }
// // //     }

// // //     // Removed auto-redirect on auth error; show inline message instead
// // //   }, [navigate, cartItems.length, userFetchError]);

// // //   const handleQuantityChange = (id, action) => {
// // //     const target = cartItems.find(i => i.id === id);
// // //     if (!target) return;
// // //     if (action === "increase") updateQuantity(id, target.quantity + 1);
// // //     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
// // //   };

// // //   const handleRemoveItem = (id) => removeItem(id);

// // //   const handleCustomerChange = (e) => {
// // //     // Allow phone number to always be editable
// // //     if (isFetched && e.target.name !== 'phone') return; // Prevent editing if fetched, except phone
// // //     setCustomerInfo({
// // //       ...customerInfo,
// // //       [e.target.name]: e.target.value
// // //     });
// // //     // Sync phone number with M-Pesa number
// // //     if (e.target.name === 'phone') {
// // //       setMpesaNumber(e.target.value);
// // //     }
// // //   };

// // //   const handleShippingChange = (e) => {
// // //     setShippingInfo({
// // //       ...shippingInfo,
// // //       [e.target.name]: e.target.value
// // //     });
// // //   };

// // //   const handleZoneChange = (zoneValue: string) => {
// // //     const zone = shippingZones.find(z => z.zone === zoneValue);
// // //     setSelectedZone(zone || null);
// // //     setSelectedArea(""); // Reset area when zone changes
// // //     setShippingInfo({
// // //       ...shippingInfo,
// // //       zone: zoneValue,
// // //       area: ""
// // //     });
// // //   };

// // //   const handleAreaChange = (areaValue: string) => {
// // //     setSelectedArea(areaValue);
// // //     setShippingInfo({
// // //       ...shippingInfo,
// // //       area: areaValue
// // //     });
// // //   };

// // //   const handleMpesaPayment = async (e) => {
// // //     e.preventDefault();
// // //     if (userFetchError) {
// // //       alert('Auth issue—please log in again from cart.');
// // //       navigate('/cart');
// // //       return;
// // //     }

// // //     // Validate form
// // //     if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
// // //       alert('Please fill in all customer details');
// // //       return;
// // //     }

// // //     if (deliveryMethod === "ship" && (!shippingInfo.address || !shippingInfo.zone || !selectedArea)) {
// // //       alert('Please fill in all shipping details including zone and area');
// // //       return;
// // //     }

// // //     if (deliveryMethod === "pickup" && !pickupLocation) {
// // //       alert('Please select a pickup location');
// // //       return;
// // //     }

// // //     if (paymentMethod === "mpesa" && !mpesaNumber) {
// // //       alert('Please enter your M-Pesa phone number');
// // //       return;
// // //     }

// // //     setIsProcessing(true);
// // //     setOrderError(null);

// // //     try {
// // //       // Prepare order payload
// // //       const items = cartItems.map(item => ({
// // //         product_id: item.id,
// // //         quantity: item.quantity
// // //       }));

// // //       // Build shipping address string - only for delivery
// // //       let shippingAddress = '';
// // //       if (deliveryMethod === "ship") {
// // //         const addressParts = [
// // //           shippingInfo.address,
// // //           shippingInfo.apartment,
// // //           selectedArea,
// // //           shippingInfo.zone,
// // //           shippingInfo.city,
// // //           shippingInfo.county
// // //         ].filter(Boolean);
// // //         shippingAddress = addressParts.join(', ');
// // //       }

// // //       // Format phone number (remove leading 0 if present, add 254)
// // //       let formattedPhone = mpesaNumber.replace(/^0/, '');
// // //       if (!formattedPhone.startsWith('254')) {
// // //         formattedPhone = formattedPhone;
// // //       }

// // //       // Build payload - conditionally include shipping_address
// // //       const payload: any = {
// // //         items,
// // //         payment_method: paymentMethod,
// // //         phone_number: formattedPhone,
// // //         shipping_method: deliveryMethod === "pickup" ? "pickup" : "delivery",
// // //         phone: mpesaNumber // Keep original format
// // //       };

// // //       // Only include shipping_address for delivery, not for pickup
// // //       if (deliveryMethod === "ship" && shippingAddress) {
// // //         payload.shipping_address = shippingAddress;
// // //       }

// // //       console.log('Checkout payload:', payload);

// // //       // Get auth token
// // //       const token = localStorage.getItem('token');
// // //       const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CHECKOUT), {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           ...(token && { 'Authorization': `Bearer ${token}` })
// // //         },
// // //         body: JSON.stringify(payload)
// // //       });

// // //       const data = await response.json();
// // //       console.log('Checkout response:', response.status, data);

// // //       if (response.ok && data.success) {
// // //         // Order accepted, now wait for M-Pesa webhook to confirm payment
// // //         const newOrderId = data.data?.order_id || data.data?.id || data.order_id || data.id || null;
// // //         setPlacedOrderId(newOrderId);
// // //         setWaitingForWebhook(true);
// // //         setIsProcessing(false);

// // //         // Poll order status every 4s up to 2 minutes
// // //         let elapsed = 0;
// // //         const interval = 4000;
// // //         const timeoutMs = 120000;
// // //         const poll = async () => {
// // //           if (!newOrderId) {
// // //             setWaitingForWebhook(false);
// // //             setWebhookTimeout(true);
// // //             return;
// // //           }
// // //           try {
// // //             const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.ALL)}/${newOrderId}`);
// // //             const d = await res.json().catch(() => ({}));
// // //             if (res.ok && d?.success && d?.data) {
// // //               const paymentStatus = d.data.payment_status || d.data.status;
// // //               if (paymentStatus === 'completed' || paymentStatus === 'paid' || paymentStatus === 'success') {
// // //                 clear();
// // //                 setWaitingForWebhook(false);
// // //                 navigate('/profile');
// // //                 return;
// // //               }
// // //               if (paymentStatus === 'failed' || paymentStatus === 'cancelled') {
// // //                 setWaitingForWebhook(false);
// // //                 setOrderError('Payment failed or was cancelled.');
// // //                 return;
// // //               }
// // //             }
// // //           } catch (e) {
// // //             // ignore transient errors
// // //           }
// // //           elapsed += interval;
// // //           if (elapsed < timeoutMs) {
// // //             setTimeout(poll, interval);
// // //           } else {
// // //             setWaitingForWebhook(false);
// // //             setWebhookTimeout(true);
// // //           }
// // //         };
// // //         setTimeout(poll, interval);
// // //       } else {
// // //         // Extract exact error message from response
// // //         let errorMessage = data.message || 'Failed to place order';
// // //         if (data.errors) {
// // //           // Handle validation errors - show all errors
// // //           const errorMessages = Object.entries(data.errors)
// // //             .map(([field, message]) => {
// // //               // Clean up field name (remove "body." prefix)
// // //               const cleanField = field.replace(/^body\./, '');
// // //               return `${cleanField}: ${message}`;
// // //             });
// // //           if (errorMessages.length > 0) {
// // //             errorMessage = errorMessages.join('\n');
// // //           }
// // //         }
// // //         throw new Error(errorMessage);
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Checkout error:', error);
// // //       setOrderError(error.message || 'Failed to place order. Please try again.');
// // //       setIsProcessing(false);
// // //     }
// // //   };

// // //   if (isLoadingUser) {
// // //     return (
// // //       <div className="min-h-screen bg-background flex items-center justify-center">
// // //         <Header />
// // //         <div className="text-center">
// // //           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
// // //           <p>Loading checkout...</p>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     );
// // //   }

// // //   if (userFetchError) {
// // //     return (
// // //       <div className="min-h-screen bg-background flex items-center justify-center">
// // //         <Header />
// // //         <div className="text-center max-w-md">
// // //           <p className="text-destructive mb-4">Auth error—redirecting to cart in 3s.</p>
// // //           <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     );
// // //   }

// // //   // Removed orderSuccess screen - redirecting directly to profile

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <Header />

// // //       <div className="container mx-auto px-4 py-8">
// // //         <Button variant="ghost" className="mb-6"
// // //          onClick={() => {
// // //            console.log('Back to cart clicked');
// // //            navigate("/cart");
// // //          }}
// // //         >
// // //           <ArrowLeft className="w-4 h-4 mr-2" />
// // //           Back to Cart
// // //         </Button>

// // //         <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //           {/* Left Column - Forms */}
// // //           <div className="lg:col-span-2 space-y-6">
// // //             {/* Delivery Method */}
// // //             <div className="bg-card border border-border rounded-xl p-6">
// // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                 <MapPin className="w-5 h-5 text-primary" />
// // //                 Delivery Method
// // //               </h2>
// // //               <div className="space-y-3">
// // //                 {/* Ship Option */}
// // //                 <div
// // //                   onClick={() => setDeliveryMethod("ship")}
// // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // //                     deliveryMethod === "ship"
// // //                       ? "border-primary bg-primary/5"
// // //                       : "border-border hover:border-primary/50"
// // //                   }`}
// // //                 >
// // //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// // //                     <Truck className="w-6 h-6 text-white" />
// // //                   </div>
// // //                   <div className="flex-1">
// // //                     <p className="font-semibold">Ship</p>
// // //                     <p className="text-sm text-muted-foreground">Delivered to your door</p>
// // //                   </div>
// // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // //                     deliveryMethod === "ship"
// // //                       ? "border-primary bg-primary"
// // //                       : "border-border"
// // //                   }`}>
// // //                     {deliveryMethod === "ship" && (
// // //                       <div className="w-full h-full flex items-center justify-center">
// // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Free Pickup Option */}
// // //                 <div
// // //                   onClick={() => setDeliveryMethod("pickup")}
// // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // //                     deliveryMethod === "pickup"
// // //                       ? "border-primary bg-primary/5"
// // //                       : "border-border hover:border-primary/50"
// // //                   }`}
// // //                 >
// // //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// // //                     <User className="w-6 h-6 text-white" />
// // //                   </div>
// // //                   <div className="flex-1">
// // //                     <p className="font-semibold">Free Pickup</p>
// // //                     <p className="text-sm text-muted-foreground">Collect from store</p>
// // //                   </div>
// // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // //                     deliveryMethod === "pickup"
// // //                       ? "border-primary bg-primary"
// // //                       : "border-border"
// // //                   }`}>
// // //                     {deliveryMethod === "pickup" && (
// // //                       <div className="w-full h-full flex items-center justify-center">
// // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Customer Details */}
// // //             <div className="bg-card border border-border rounded-xl p-6">
// // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                 <User className="w-5 h-5 text-primary" />
// // //                 Customer Details {isFetched && <Badge variant="secondary" className="ml-2">From Account</Badge>}
// // //               </h2>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <div>
// // //                   <Label htmlFor="firstName">First Name *</Label>
// // //                   <div className="relative">
// // //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // //                     <Input
// // //                       id="firstName"
// // //                       name="firstName"
// // //                       placeholder="John"
// // //                       //className="pl-10"
// // //                       value={customerInfo.firstName}
// // //                       onChange={handleCustomerChange}
// // //                       required
// // //                       readOnly={isFetched}
// // //                       className={`pl-10 ${
// // //                         isFetched ? "bg-muted cursor-not-allowed pl-14" : "bg-background"
// // //                       }`}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <Label htmlFor="lastName">Last Name *</Label>
// // //                   <div className="relative">
// // //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // //                     <Input
// // //                       id="lastName"
// // //                       name="lastName"
// // //                       placeholder="Doe"
// // //                       //className="pl-10"
// // //                       value={customerInfo.lastName}
// // //                       onChange={handleCustomerChange}
// // //                       required
// // //                       readOnly={isFetched}
// // //                       className={`pl-10 ${
// // //                         isFetched ? "bg-muted cursor-not-allowed pl-14" : "bg-background"
// // //                       }`}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <Label htmlFor="email">Email *</Label>
// // //                   <div className="relative">
// // //                     <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // //                     <Input
// // //                       id="email"
// // //                       name="email"
// // //                       type="email"
// // //                       placeholder="john@example.com"
// // //                       value={customerInfo.email}
// // //                       onChange={handleCustomerChange}
// // //                       required
// // //                       readOnly={isFetched}
// // //                       className={`pl-10 ${
// // //                         isFetched ? "bg-muted cursor-not-allowed pl-14" : "bg-background"
// // //                       }`}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <Label htmlFor="phone">Phone Number *</Label>
// // //                   <div className="relative">
// // //                     <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // //                     <Input
// // //                       id="phone"
// // //                       name="phone"
// // //                       placeholder="0712345678"
// // //                       value={customerInfo.phone}
// // //                       onChange={handleCustomerChange}
// // //                       required
// // //                       className="pl-10"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Conditional Shipping or Pickup */}
// // //             {deliveryMethod === "ship" ? (
// // //               <div className="bg-card border border-border rounded-xl p-6">
// // //                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                   <Home className="w-5 h-5 text-primary" />
// // //                   Shipping Address
// // //                 </h2>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div className="md:col-span-2">
// // //                     <Label htmlFor="zone">Shipping Zone *</Label>
// // //                     <Select 
// // //                       value={shippingInfo.zone} 
// // //                       onValueChange={handleZoneChange}
// // //                       disabled={isLoadingZones}
// // //                     >
// // //                       <SelectTrigger>
// // //                         <SelectValue placeholder={isLoadingZones ? "Loading zones..." : "Select a zone"} />
// // //                       </SelectTrigger>
// // //                       <SelectContent>
// // //                         {shippingZones.map((zone) => (
// // //                           <SelectItem key={zone.zone} value={zone.zone}>
// // //                             {zone.name} - Ksh {zone.price}
// // //                           </SelectItem>
// // //                         ))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
                  
// // //                   {selectedZone && (
// // //                     <div className="md:col-span-2">
// // //                       <Label htmlFor="area">Area/Neighborhood *</Label>
// // //                       <Select 
// // //                         value={selectedArea} 
// // //                         onValueChange={handleAreaChange}
// // //                       >
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select an area" />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           {selectedZone.areas.map((area, index) => (
// // //                             <SelectItem key={index} value={area}>
// // //                               {area}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                   )}

// // //                   <div className="md:col-span-2">
// // //                     <Label htmlFor="address">Physical Address *</Label>
// // //                     <div className="relative">
// // //                       <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // //                       <Input
// // //                         id="address"
// // //                         name="address"
// // //                         placeholder="123 Main Street"
// // //                         className="pl-10"
// // //                         value={shippingInfo.address}
// // //                         onChange={handleShippingChange}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                   <div className="md:col-span-2">
// // //                     <Label htmlFor="apartment">Apartment/Estate (Optional)</Label>
// // //                     <div className="relative">
// // //                       <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// // //                       <Input
// // //                         id="apartment"
// // //                         name="apartment"
// // //                         placeholder="Apt 4B"
// // //                         className="pl-10"
// // //                         value={shippingInfo.apartment}
// // //                         onChange={handleShippingChange}
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                   <div>
// // //                     <Label htmlFor="city">City *</Label>
// // //                     <Input
// // //                       id="city"
// // //                       name="city"
// // //                       placeholder="Nairobi"
// // //                       value={shippingInfo.city}
// // //                       onChange={handleShippingChange}
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <Label htmlFor="county">County *</Label>
// // //                     <Input
// // //                       id="county"
// // //                       name="county"
// // //                       placeholder="Nairobi"
// // //                       value={shippingInfo.county}
// // //                       onChange={handleShippingChange}
// // //                       required
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="bg-card border border-border rounded-xl p-6">
// // //                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                   <MapPin className="w-5 h-5 text-primary" />
// // //                   Pickup Location
// // //                 </h2>
// // //                 <div>
// // //                   <Label htmlFor="pickup">Select Store *</Label>
// // //                   <Select value={pickupLocation} onValueChange={setPickupLocation}>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Choose a store" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="beaver-house">
// // //                         Beaver House, Basement B11, Opposite Club Eureka, Tom Mboya Street
// // //                       </SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Payment Method */}
// // //             <div className="bg-card border border-border rounded-xl p-6">
// // //               <h2 className="text-xl font-bold mb-4">Payment Method</h2>
// // //               <div className="space-y-3">
// // //                 {/* M-Pesa Option */}
// // //                 <div
// // //                   onClick={() => setPaymentMethod("mpesa")}
// // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // //                     paymentMethod === "mpesa"
// // //                       ? "border-primary bg-primary/5"
// // //                       : "border-border hover:border-primary/50"
// // //                   }`}
// // //                 >
// // //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// // //                     <Smartphone className="w-6 h-6 text-white" />
// // //                   </div>
// // //                   <div className="flex-1">
// // //                     <p className="font-semibold">M-Pesa</p>
// // //                     <p className="text-sm text-muted-foreground">Pay with Lipa Na M-Pesa</p>
// // //                   </div>
// // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // //                     paymentMethod === "mpesa"
// // //                       ? "border-primary bg-primary"
// // //                       : "border-border"
// // //                   }`}>
// // //                     {paymentMethod === "mpesa" && (
// // //                       <div className="w-full h-full flex items-center justify-center">
// // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Card Option */}
// // //                 <div
// // //                   onClick={() => setPaymentMethod("card")}
// // //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// // //                     paymentMethod === "card"
// // //                       ? "border-primary bg-primary/5"
// // //                       : "border-border hover:border-primary/50"
// // //                   }`}
// // //                 >
// // //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// // //                     <CreditCard className="w-6 h-6 text-white" />
// // //                   </div>
// // //                   <div className="flex-1">
// // //                     <p className="font-semibold">Credit/Debit Card</p>
// // //                     <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
// // //                   </div>
// // //                   <div className={`w-5 h-5 rounded-full border-2 ${
// // //                     paymentMethod === "card"
// // //                       ? "border-primary bg-primary"
// // //                       : "border-border"
// // //                   }`}>
// // //                     {paymentMethod === "card" && (
// // //                       <div className="w-full h-full flex items-center justify-center">
// // //                         <div className="w-2 h-2 bg-white rounded-full" />
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* M-Pesa Number Input */}
// // //               {paymentMethod === "mpesa" && (
// // //                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// // //                   <Label htmlFor="mpesaNumber" className="text-green-900">
// // //                     M-Pesa Phone Number *
// // //                   </Label>
// // //                   <div className="relative mt-2">
// // //                     <Smartphone className="absolute left-3 top-3 w-4 h-4 text-green-600" />
// // //                     <Input
// // //                       id="mpesaNumber"
// // //                       type="tel"
// // //                       placeholder="254712345678"
// // //                       className="pl-10 border-green-300 focus:border-green-500"
// // //                       value={mpesaNumber}
// // //                       onChange={(e) => setMpesaNumber(e.target.value)}
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <p className="text-xs text-green-700 mt-2">
// // //                     Enter the phone number you'll use to complete the M-Pesa payment
// // //                   </p>
// // //                 </div>
// // //               )}

// // //               {/* Card Input */}
// // //               {paymentMethod === "card" && (
// // //                 <div className="mt-6 space-y-4">
// // //                   <div>
// // //                     <Label htmlFor="cardNumber">Card Number *</Label>
// // //                     <Input
// // //                       id="cardNumber"
// // //                       placeholder="1234 5678 9012 3456"
// // //                       required
// // //                     />
// // //                   </div>
// // //                   <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                       <Label htmlFor="expiry">Expiry Date *</Label>
// // //                       <Input
// // //                         id="expiry"
// // //                         placeholder="MM/YY"
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <Label htmlFor="cvv">CVV *</Label>
// // //                       <Input
// // //                         id="cvv"
// // //                         placeholder="123"
// // //                         maxLength={3}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Right Column - Order Summary */}
// // //           <div className="lg:col-span-1">
// // //             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
// // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                 <ShoppingCart className="w-5 h-5 text-primary" />
// // //                 Order Summary
// // //               </h2>

// // //               {/* Cart Items */}
// // //               <div className="space-y-4 mb-6">
// // //                 {cartItems.map((item) => (
// // //                   <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
// // //                     <img
// // //                       src={item.image}
// // //                       alt={item.name}
// // //                       className="w-16 h-16 rounded-lg object-cover"
// // //                     />
// // //                     <div className="flex-1">
// // //                       <p className="font-semibold text-sm mb-1">{item.name}</p>
// // //                       <p className="text-sm text-muted-foreground mb-2">
// // //                         Ksh {(item.price / 100).toFixed(2)}
// // //                       </p>
// // //                       <div className="flex items-center gap-2">
// // //                         <button
// // //                           onClick={() => handleQuantityChange(item.id, "decrease")}
// // //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // //                           aria-label={`Decrease quantity of ${item.name}`}
// // //                         >
// // //                           <Minus className="w-3 h-3" />
// // //                         </button>
// // //                         <span className="text-sm font-medium w-6 text-center">
// // //                           {item.quantity}
// // //                         </span>
// // //                         <button
// // //                           onClick={() => handleQuantityChange(item.id, "increase")}
// // //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // //                           aria-label={`Increase quantity of ${item.name}`}
// // //                         >
// // //                           <Plus className="w-3 h-3" />
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleRemoveItem(item.id)}
// // //                           className="ml-auto text-red-500 hover:text-red-600"
// // //                           aria-label={`Remove ${item.name} from cart`}
// // //                         >
// // //                           <Trash2 className="w-4 h-4" />
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               {/* Price Breakdown */}
// // //               <div className="space-y-3 mb-6">
// // //                 <div className="flex justify-between text-muted-foreground">
// // //                   <span>Subtotal</span>
// // //                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between text-muted-foreground">
// // //                   <span>{deliveryMethod === "pickup" ? "Pickup" : "Shipping"}</span>
// // //                   <span>
// // //                     {shippingCost === 0 ? (
// // //                       <Badge variant="outline" className="text-green-600 border-green-600">
// // //                         FREE
// // //                       </Badge>
// // //                     ) : (
// // //                       `Ksh ${(shippingCost / 100).toFixed(2)}`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 {deliveryMethod === "ship" && selectedZone && (
// // //                   <p className="text-xs text-muted-foreground">
// // //                     {selectedZone.name}
// // //                   </p>
// // //                 )}
// // //                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
// // //                   <span>Total</span>
// // //                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
// // //                 </div>
// // //               </div>

// // //               {/* Place Order Button */}
// // //               <Button
// // //                 className="w-full text-lg py-6"
// // //                 size="lg"
// // //                 onClick={handleMpesaPayment}
// // //                 disabled={isProcessing || cartItems.length === 0}
// // //               >
// // //                 {isProcessing ? (
// // //                   <>
// // //                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
// // //                     Processing...
// // //                   </>
// // //                 ) : (
// // //                   `Place Order - Ksh ${(total / 100).toFixed(2)}`
// // //                 )}
// // //               </Button>

// // //               {(isProcessing && paymentMethod === "mpesa") && (
// // //                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
// // //                   <p className="text-sm text-green-900 font-medium text-center">
// // //                     Check your phone for M-Pesa prompt
// // //                   </p>
// // //                   <p className="text-xs text-green-700 text-center mt-1">
// // //                     Enter your M-Pesa PIN to complete payment
// // //                   </p>
// // //                 </div>
// // //               )}

// // //               {waitingForWebhook && (
// // //                 <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
// // //                   <p className="text-sm text-blue-900 font-medium text-center">
// // //                     Waiting for payment confirmation...
// // //                   </p>
// // //                   <p className="text-xs text-blue-700 text-center mt-1">
// // //                     This may take up to 2 minutes. Do not close this page.
// // //                   </p>
// // //                   {placedOrderId && (
// // //                     <p className="text-xs text-blue-700 text-center mt-1">
// // //                       Order: {placedOrderId}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {webhookTimeout && (
// // //                 <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
// // //                   <p className="text-sm text-yellow-900 font-medium text-center">
// // //                     Still waiting for M-Pesa confirmation.
// // //                   </p>
// // //                   <p className="text-xs text-yellow-800 text-center mt-1">
// // //                     You can stay on this page, check your M-Pesa app, or view order status in your profile.
// // //                   </p>
// // //                   <div className="flex gap-2 justify-center mt-2">
// // //                     <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>Go to Profile</Button>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {orderError && (
// // //                 <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// // //                   <p className="text-sm text-red-900 font-medium whitespace-pre-line">
// // //                     {orderError}
// // //                   </p>
// // //                 </div>
// // //               )}

// // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // //                 By placing your order, you agree to our Terms & Conditions
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // export default CheckoutPage;
// // import { useMemo, useState, useEffect, useRef } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { 
// //   ShoppingCart, 
// //   Trash2, 
// //   Plus, 
// //   Minus, 
// //   CreditCard, 
// //   Smartphone,
// //   MapPin,
// //   User,
// //   Mail,
// //   Phone,
// //   Home,
// //   Truck,
// //   ArrowLeft,
// //   Loader2
// // } from "lucide-react";
// // import Header from "@/components/Header";
// // import { useNavigate } from "react-router-dom";
// // import Footer from "@/components/Footer";
// // import { useCart } from "@/context/CartContext";
// // import { buildApiUrl, getApiUrl, API_CONFIG } from "@/lib/config";

// // interface ShippingZone {
// //   zone: string;
// //   name: string;
// //   price: number;
// //   areas: string[];
// // }

// // const CheckoutPage = () => {
// //   const navigate = useNavigate();
// //   const { items: cartItems, updateQuantity, removeItem, clear } = useCart();
// //   const pollingActiveRef = useRef(false);

// //   const [paymentMethod, setPaymentMethod] = useState("mpesa");
// //   const [mpesaNumber, setMpesaNumber] = useState("");
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [deliveryMethod, setDeliveryMethod] = useState("ship");
  
// //   const [customerInfo, setCustomerInfo] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: ""
// //   });

// //   const [shippingInfo, setShippingInfo] = useState({
// //     address: "",
// //     apartment: "",
// //     city: "",
// //     county: "",
// //     zone: "",
// //     area: ""
// //   });

// //   const [pickupLocation, setPickupLocation] = useState("");
// //   const [isLoadingUser, setIsLoadingUser] = useState(true);
// //   const [userFetchError, setUserFetchError] = useState(false);
// //   const [isFetched, setIsFetched] = useState(false);
// //   const [orderError, setOrderError] = useState<string | null>(null);
// //   const [waitingForWebhook, setWaitingForWebhook] = useState(false);
// //   const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
// //   const [webhookTimeout, setWebhookTimeout] = useState(false);
  
// //   // Shipping zones state
// //   const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
// //   const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
// //   const [isLoadingZones, setIsLoadingZones] = useState(false);
// //   const [selectedArea, setSelectedArea] = useState("");

// //   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
  
// //   // Calculate shipping cost based on selected zone
// //   const shippingCost = useMemo(() => {
// //     if (deliveryMethod === "pickup") return 0;
// //     if (selectedZone) return selectedZone.price * 100; // Convert Ksh to cents
// //     return 0;
// //   }, [deliveryMethod, selectedZone]);
  
// //   const total = subtotal + shippingCost;

// //   // Reset shipping info when delivery method changes
// //   useEffect(() => {
// //     if (deliveryMethod === "pickup") {
// //       setSelectedZone(null);
// //       setSelectedArea("");
// //       setShippingInfo(prev => ({ ...prev, zone: "", area: "" }));
// //     }
// //   }, [deliveryMethod]);

// //   // Fetch shipping zones on mount
// //   useEffect(() => {
// //     const fetchShippingZones = async () => {
// //       try {
// //         setIsLoadingZones(true);
// //         const url = getApiUrl('SHIPPING', 'ZONES');
// //         const response = await fetch(url);
// //         const data = await response.json();
        
// //         if (response.ok && data.success && data.data?.zones) {
// //           setShippingZones(data.data.zones);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching shipping zones:', error);
// //       } finally {
// //         setIsLoadingZones(false);
// //       }
// //     };

// //     if (deliveryMethod === "ship") {
// //       fetchShippingZones();
// //     }
// //   }, [deliveryMethod]);

// //   // Fetch user details on mount if token exists
// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     console.log('Checkout mounted, token:', !!token ? 'present' : 'missing');

// //     if (token && cartItems.length > 0) {
// //       const fetchUserProfile = async () => {
// //         try {
// //           console.log('Fetching user profile...');
// //           const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/me', {
// //             method: 'GET',
// //             headers: {
// //               'Authorization': `Bearer ${token}`,
// //               'Content-Type': 'application/json',
// //             },
// //           });

// //           const data = await response.json();
// //           console.log('Profile response:', response.status, data);

// //           if (response.ok && data.success) {
// //             const user = data.data?.user;
// //             if (user) {
// //               setCustomerInfo({
// //                 firstName: user.first_name || '',
// //                 lastName: user.last_name || '',
// //                 email: user.email || '',
// //                 phone: user.phone || ''
// //               });
// //               setMpesaNumber(user.phone || '');
// //               setIsFetched(true);
// //             } else {
// //               throw new Error('No user in response');
// //             }
// //           } else {
// //             throw new Error(`Profile fetch failed: ${response.status} - ${data.message || 'Unknown error'}`);
// //           }
// //         } catch (error) {
// //           console.error('Profile error:', error);
// //           setUserFetchError(true);
// //         } finally {
// //           setIsLoadingUser(false);
// //         }
// //       };

// //       fetchUserProfile();
// //     } else {
// //       setIsLoadingUser(false);
// //       if (cartItems.length === 0) {
// //         navigate('/cart');
// //       }
// //       if (!token) {
// //         console.warn('No token found—customer details will be manual');
// //         setUserFetchError(true);
// //       }
// //     }
// //   }, [navigate, cartItems.length]);

// //   // Cleanup polling on unmount
// //   useEffect(() => {
// //     return () => {
// //       pollingActiveRef.current = false;
// //     };
// //   }, []);

// //   const handleQuantityChange = (id, action) => {
// //     const target = cartItems.find(i => i.id === id);
// //     if (!target) return;
// //     if (action === "increase") updateQuantity(id, target.quantity + 1);
// //     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
// //   };

// //   const handleRemoveItem = (id) => removeItem(id);

// //   const handleCustomerChange = (e) => {
// //     if (isFetched && e.target.name !== 'phone') return;
// //     setCustomerInfo({
// //       ...customerInfo,
// //       [e.target.name]: e.target.value
// //     });
// //     if (e.target.name === 'phone') {
// //       setMpesaNumber(e.target.value);
// //     }
// //   };

// //   const handleShippingChange = (e) => {
// //     setShippingInfo({
// //       ...shippingInfo,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleZoneChange = (zoneValue: string) => {
// //     const zone = shippingZones.find(z => z.zone === zoneValue);
// //     setSelectedZone(zone || null);
// //     setSelectedArea("");
// //     setShippingInfo({
// //       ...shippingInfo,
// //       zone: zoneValue,
// //       area: ""
// //     });
// //   };

// //   const handleAreaChange = (areaValue: string) => {
// //     setSelectedArea(areaValue);
// //     setShippingInfo({
// //       ...shippingInfo,
// //       area: areaValue
// //     });
// //   };

// //   const pollOrderStatus = async (orderId: string) => {
// //     pollingActiveRef.current = true;
// //     let elapsed = 0;
// //     const interval = 4000;
// //     const timeoutMs = 120000;
    
// //     const poll = async () => {
// //       if (!orderId || !pollingActiveRef.current) {
// //         setWaitingForWebhook(false);
// //         setWebhookTimeout(true);
// //         return;
// //       }
      
// //       try {
// //         const token = localStorage.getItem('token');
// //         const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.ALL)}/${orderId}`, {
// //           headers: {
// //             'Content-Type': 'application/json',
// //             ...(token && { 'Authorization': `Bearer ${token}` })
// //           }
// //         });
        
// //         const d = await res.json().catch(() => ({}));
        
// //         if (res.ok && d?.success && d?.data) {
// //           const paymentStatus = d.data.payment_status || d.data.status;
          
// //           if (paymentStatus === 'completed' || paymentStatus === 'paid' || paymentStatus === 'success') {
// //             pollingActiveRef.current = false;
// //             clear();
// //             setWaitingForWebhook(false);
// //             navigate('/profile');
// //             return;
// //           }
          
// //           if (paymentStatus === 'failed' || paymentStatus === 'cancelled') {
// //             pollingActiveRef.current = false;
// //             setWaitingForWebhook(false);
// //             setOrderError('Payment failed or was cancelled. Please try again.');
// //             return;
// //           }
// //         }
// //       } catch (e) {
// //         console.error('Polling error:', e);
// //       }
      
// //       elapsed += interval;
// //       if (elapsed < timeoutMs && pollingActiveRef.current) {
// //         setTimeout(poll, interval);
// //       } else {
// //         pollingActiveRef.current = false;
// //         setWaitingForWebhook(false);
// //         setWebhookTimeout(true);
// //       }
// //     };
    
// //     setTimeout(poll, interval);
// //   };

// //   const handleMpesaPayment = async (e) => {
// //     e.preventDefault();
// //     if (userFetchError) {
// //       alert('Auth issue—please log in again from cart.');
// //       navigate('/cart');
// //       return;
// //     }

// //     // Validate form
// //     if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
// //       alert('Please fill in all customer details');
// //       return;
// //     }

// //     if (deliveryMethod === "ship" && (!shippingInfo.address || !shippingInfo.zone || !selectedArea)) {
// //       alert('Please fill in all shipping details including zone and area');
// //       return;
// //     }

// //     if (deliveryMethod === "pickup" && !pickupLocation) {
// //       alert('Please select a pickup location');
// //       return;
// //     }

// //     if (paymentMethod === "mpesa" && !mpesaNumber) {
// //       alert('Please enter your M-Pesa phone number');
// //       return;
// //     }

// //     setIsProcessing(true);
// //     setOrderError(null);
// //     setWebhookTimeout(false);

// //     try {
// //       // Prepare order payload
// //       const items = cartItems.map(item => ({
// //         product_id: item.id,
// //         quantity: item.quantity
// //       }));

// //       // Build shipping address string - only for delivery
// //       let shippingAddress = '';
// //       if (deliveryMethod === "ship") {
// //         const addressParts = [
// //           shippingInfo.address,
// //           shippingInfo.apartment,
// //           selectedArea,
// //           shippingInfo.zone,
// //           shippingInfo.city,
// //           shippingInfo.county
// //         ].filter(Boolean);
// //         shippingAddress = addressParts.join(', ');
// //       }

// //       // Format phone number
// //       let formattedPhone = mpesaNumber.replace(/^0/, '');
// //       if (!formattedPhone.startsWith('254')) {
// //         formattedPhone = formattedPhone;
// //       }

// //       // Build payload
// //       const payload: any = {
// //         items,
// //         payment_method: paymentMethod,
// //         phone_number: formattedPhone,
// //         shipping_method: deliveryMethod === "pickup" ? "pickup" : "delivery",
// //         phone: mpesaNumber
// //       };

// //       if (deliveryMethod === "ship" && shippingAddress) {
// //         payload.shipping_address = shippingAddress;
// //       }

// //       console.log('Checkout payload:', payload);

// //       // Get auth token
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CHECKOUT), {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           ...(token && { 'Authorization': `Bearer ${token}` })
// //         },
// //         body: JSON.stringify(payload)
// //       });

// //       const data = await response.json();
// //       console.log('Checkout response:', response.status, data);

// //       if (response.ok && data.success) {
// //         const newOrderId = data.data?.order_id || data.data?.id || data.order_id || data.id || null;
// //         setPlacedOrderId(newOrderId);
// //         setWaitingForWebhook(true);
// //         setIsProcessing(false);

// //         // Start polling for order status
// //         if (newOrderId) {
// //           pollOrderStatus(newOrderId);
// //         } else {
// //           setWaitingForWebhook(false);
// //           setWebhookTimeout(true);
// //         }
// //       } else {
// //         // Extract error message
// //         let errorMessage = data.message || 'Failed to place order';
// //         if (data.errors) {
// //           const errorMessages = Object.entries(data.errors)
// //             .map(([field, message]) => {
// //               const cleanField = field.replace(/^body\./, '');
// //               return `${cleanField}: ${message}`;
// //             });
// //           if (errorMessages.length > 0) {
// //             errorMessage = errorMessages.join('\n');
// //           }
// //         }
// //         throw new Error(errorMessage);
// //       }
// //     } catch (error: any) {
// //       console.error('Checkout error:', error);
// //       setOrderError(error.message || 'Failed to place order. Please try again.');
// //       setIsProcessing(false);
// //     }
// //   };

// //   if (isLoadingUser) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <Header />
// //         <div className="text-center">
// //           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
// //           <p>Loading checkout...</p>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   if (userFetchError) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <Header />
// //         <div className="text-center max-w-md">
// //           <p className="text-destructive mb-4">Auth error—redirecting to cart in 3s.</p>
// //           <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header />

// //       <div className="container mx-auto px-4 py-8">
// //         <Button variant="ghost" className="mb-6"
// //          onClick={() => {
// //            console.log('Back to cart clicked');
// //            navigate("/cart");
// //          }}
// //         >
// //           <ArrowLeft className="w-4 h-4 mr-2" />
// //           Back to Cart
// //         </Button>

// //         <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Column - Forms */}
// //           <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
// //             {/* Delivery Method */}
// //             <div className="bg-card border border-border rounded-xl p-6">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <MapPin className="w-5 h-5 text-primary" />
// //                 Delivery Method
// //               </h2>
// //               <div className="space-y-3">
// //                 {/* Ship Option */}
// //                 <div
// //                   onClick={() => setDeliveryMethod("ship")}
// //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                     deliveryMethod === "ship"
// //                       ? "border-primary bg-primary/5"
// //                       : "border-border hover:border-primary/50"
// //                   }`}
// //                 >
// //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// //                     <Truck className="w-6 h-6 text-white" />
// //                   </div>
// //                   <div className="flex-1">
// //                     <p className="font-semibold">Ship</p>
// //                     <p className="text-sm text-muted-foreground">Delivered to your door</p>
// //                   </div>
// //                   <div className={`w-5 h-5 rounded-full border-2 ${
// //                     deliveryMethod === "ship"
// //                       ? "border-primary bg-primary"
// //                       : "border-border"
// //                   }`}>
// //                     {deliveryMethod === "ship" && (
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <div className="w-2 h-2 bg-white rounded-full" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Free Pickup Option */}
// //                 <div
// //                   onClick={() => setDeliveryMethod("pickup")}
// //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                     deliveryMethod === "pickup"
// //                       ? "border-primary bg-primary/5"
// //                       : "border-border hover:border-primary/50"
// //                   }`}
// //                 >
// //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// //                     <User className="w-6 h-6 text-white" />
// //                   </div>
// //                   <div className="flex-1">
// //                     <p className="font-semibold">Free Pickup</p>
// //                     <p className="text-sm text-muted-foreground">Collect from store</p>
// //                   </div>
// //                   <div className={`w-5 h-5 rounded-full border-2 ${
// //                     deliveryMethod === "pickup"
// //                       ? "border-primary bg-primary"
// //                       : "border-border"
// //                   }`}>
// //                     {deliveryMethod === "pickup" && (
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <div className="w-2 h-2 bg-white rounded-full" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Customer Details */}
// //             <div className="bg-card border border-border rounded-xl p-6">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <User className="w-5 h-5 text-primary" />
// //                 Customer Details {isFetched && <Badge variant="secondary" className="ml-2">From Account</Badge>}
// //               </h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <Label htmlFor="firstName">First Name *</Label>
// //                   <div className="relative">
// //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                     <Input
// //                       id="firstName"
// //                       name="firstName"
// //                       placeholder="John"
// //                       value={customerInfo.firstName}
// //                       onChange={handleCustomerChange}
// //                       required
// //                       readOnly={isFetched}
// //                       className={`pl-10 ${
// //                         isFetched ? "bg-muted cursor-not-allowed" : "bg-background"
// //                       }`}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="lastName">Last Name *</Label>
// //                   <div className="relative">
// //                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                     <Input
// //                       id="lastName"
// //                       name="lastName"
// //                       placeholder="Doe"
// //                       value={customerInfo.lastName}
// //                       onChange={handleCustomerChange}
// //                       required
// //                       readOnly={isFetched}
// //                       className={`pl-10 ${
// //                         isFetched ? "bg-muted cursor-not-allowed" : "bg-background"
// //                       }`}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="email">Email *</Label>
// //                   <div className="relative">
// //                     <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                     <Input
// //                       id="email"
// //                       name="email"
// //                       type="email"
// //                       placeholder="john@example.com"
// //                       value={customerInfo.email}
// //                       onChange={handleCustomerChange}
// //                       required
// //                       readOnly={isFetched}
// //                       className={`pl-10 ${
// //                         isFetched ? "bg-muted cursor-not-allowed" : "bg-background"
// //                       }`}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="phone">Phone Number *</Label>
// //                   <div className="relative">
// //                     <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                     <Input
// //                       id="phone"
// //                       name="phone"
// //                       placeholder="0712345678"
// //                       value={customerInfo.phone}
// //                       onChange={handleCustomerChange}
// //                       required
// //                       className="pl-10"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Conditional Shipping or Pickup */}
// //             {deliveryMethod === "ship" ? (
// //               <div className="bg-card border border-border rounded-xl p-6">
// //                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                   <Home className="w-5 h-5 text-primary" />
// //                   Shipping Address
// //                 </h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div className="md:col-span-2">
// //                     <Label htmlFor="zone">Shipping Zone *</Label>
// //                     <Select 
// //                       value={shippingInfo.zone} 
// //                       onValueChange={handleZoneChange}
// //                       disabled={isLoadingZones}
// //                     >
// //                       <SelectTrigger>
// //                         <SelectValue placeholder={isLoadingZones ? "Loading zones..." : "Select a zone"} />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         {shippingZones.map((zone) => (
// //                           <SelectItem key={zone.zone} value={zone.zone}>
// //                             {zone.name} - Ksh {zone.price}
// //                           </SelectItem>
// //                         ))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
                  
// //                   {selectedZone && (
// //                     <div className="md:col-span-2">
// //                       <Label htmlFor="area">Area/Neighborhood *</Label>
// //                       <Select 
// //                         value={selectedArea} 
// //                         onValueChange={handleAreaChange}
// //                       >
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select an area" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {selectedZone.areas.map((area, index) => (
// //                             <SelectItem key={index} value={area}>
// //                               {area}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   )}

// //                   <div className="md:col-span-2">
// //                     <Label htmlFor="address">Physical Address *</Label>
// //                     <div className="relative">
// //                       <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                       <Input
// //                         id="address"
// //                         name="address"
// //                         placeholder="123 Main Street"
// //                         className="pl-10"
// //                         value={shippingInfo.address}
// //                         onChange={handleShippingChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="md:col-span-2">
// //                     <Label htmlFor="apartment">Apartment/Estate (Optional)</Label>
// //                     <div className="relative">
// //                       <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                       <Input
// //                         id="apartment"
// //                         name="apartment"
// //                         placeholder="Apt 4B"
// //                         className="pl-10"
// //                         value={shippingInfo.apartment}
// //                         onChange={handleShippingChange}
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="city">City *</Label>
// //                     <Input
// //                       id="city"
// //                       name="city"
// //                       placeholder="Nairobi"
// //                       value={shippingInfo.city}
// //                       onChange={handleShippingChange}
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <Label htmlFor="county">County *</Label>
// //                     <Input
// //                       id="county"
// //                       name="county"
// //                       placeholder="Nairobi"
// //                       value={shippingInfo.county}
// //                       onChange={handleShippingChange}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="bg-card border border-border rounded-xl p-6">
// //                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                   <MapPin className="w-5 h-5 text-primary" />
// //                   Pickup Location
// //                 </h2>
// //                 <div>
// //                   <Label htmlFor="pickup">Select Store *</Label>
// //                   <Select value={pickupLocation} onValueChange={setPickupLocation}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Choose a store" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="beaver-house">
// //                         Beaver House, Basement B11, Opposite Club Eureka, Tom Mboya Street
// //                       </SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Payment Method */}
// //             <div className="bg-card border border-border rounded-xl p-6">
// //               <h2 className="text-xl font-bold mb-4">Payment Method</h2>
// //               <div className="space-y-3">
// //                 {/* M-Pesa Option */}
// //                 <div
// //                   onClick={() => setPaymentMethod("mpesa")}
// //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                     paymentMethod === "mpesa"
// //                       ? "border-primary bg-primary/5"
// //                       : "border-border hover:border-primary/50"
// //                   }`}
// //                 >
// //                   <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
// //                     <Smartphone className="w-6 h-6 text-white" />
// //                   </div>
// //                   <div className="flex-1">
// //                     <p className="font-semibold">M-Pesa</p>
// //                     <p className="text-sm text-muted-foreground">Pay with Lipa Na M-Pesa</p>
// //                   </div>
// //                   <div className={`w-5 h-5 rounded-full border-2 ${
// //                     paymentMethod === "mpesa"
// //                       ? "border-primary bg-primary"
// //                       : "border-border"
// //                   }`}>
// //                     {paymentMethod === "mpesa" && (
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <div className="w-2 h-2 bg-white rounded-full" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Card Option */}
// //                 {/* <div
// //                   onClick={() => setPaymentMethod("card")}
// //                   className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                     paymentMethod === "card"
// //                       ? "border-primary bg-primary/5"
// //                       : "border-border hover:border-primary/50"
// //                   }`}
// //                 >
// //                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
// //                     <CreditCard className="w-6 h-6 text-white" />
// //                   </div>
// //                   <div className="flex-1">
// //                     <p className="font-semibold">Credit/Debit Card</p>
// //                     <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
// //                   </div>
// //                   <div className={`w-5 h-5 rounded-full border-2 ${
// //                     paymentMethod === "card"
// //                       ? "border-primary bg-primary"
// //                       : "border-border"
// //                   }`}>
// //                     {paymentMethod === "card" && (
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <div className="w-2 h-2 bg-white rounded-full" />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div> */}
// //               </div>

// //               {/* M-Pesa Number Input */}
// //               {paymentMethod === "mpesa" && (
// //                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// //                   <Label htmlFor="mpesaNumber" className="text-green-900">
// //                     M-Pesa Phone Number *
// //                   </Label>
// //                   <div className="relative mt-2">
// //                     <Smartphone className="absolute left-3 top-3 w-4 h-4 text-green-600" />
// //                     <Input
// //                       id="mpesaNumber"
// //                       type="tel"
// //                       placeholder="254712345678"
// //                       className="pl-10 border-green-300 focus:border-green-500"
// //                       value={mpesaNumber}
// //                       onChange={(e) => setMpesaNumber(e.target.value)}
// //                       required
// //                     />
// //                   </div>
// //                   <p className="text-xs text-green-700 mt-2">
// //                     Enter the phone number you'll use to complete the M-Pesa payment
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Card Input */}
// //               {paymentMethod === "card" && (
// //                 <div className="mt-6 space-y-4">
// //                   <div>
// //                     <Label htmlFor="cardNumber">Card Number *</Label>
// //                     <Input
// //                       id="cardNumber"
// //                       placeholder="1234 5678 9012 3456"
// //                       required
// //                     />
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                       <Label htmlFor="expiry">Expiry Date *</Label>
// //                       <Input
// //                         id="expiry"
// //                         placeholder="MM/YY"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label htmlFor="cvv">CVV *</Label>
// //                       <Input
// //                         id="cvv"
// //                         placeholder="123"
// //                         maxLength={3}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div className="lg:col-span-1 order-1 lg:order-2">
// //             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <ShoppingCart className="w-5 h-5 text-primary" />
// //                 Order Summary
// //               </h2>

// //               {/* Cart Items */}
// //               <div className="space-y-4 mb-6">
// //                 {cartItems.map((item) => (
// //                   <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="w-16 h-16 rounded-lg object-cover"
// //                     />
// //                     <div className="flex-1">
// //                       <p className="font-semibold text-sm mb-1">{item.name}</p>
// //                       <p className="text-sm text-muted-foreground mb-2">
// //                         Ksh {(item.price / 100).toFixed(2)}
// //                       </p>
// //                       <div className="flex items-center gap-2">
// //                         <button
// //                           onClick={() => handleQuantityChange(item.id, "decrease")}
// //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// //                           aria-label={`Decrease quantity of ${item.name}`}
// //                         >
// //                           <Minus className="w-3 h-3" />
// //                         </button>
// //                         <span className="text-sm font-medium w-6 text-center">
// //                           {item.quantity}
// //                         </span>
// //                         <button
// //                           onClick={() => handleQuantityChange(item.id, "increase")}
// //                           className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-secondary"
// //                           aria-label={`Increase quantity of ${item.name}`}
// //                         >
// //                           <Plus className="w-3 h-3" />
// //                         </button>
// //                         <button
// //                           onClick={() => handleRemoveItem(item.id)}
// //                           className="ml-auto text-red-500 hover:text-red-600"
// //                           aria-label={`Remove ${item.name} from cart`}
// //                         >
// //                           <Trash2 className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="space-y-3 mb-6">
// //                 <div className="flex justify-between text-muted-foreground">
// //                   <span>Subtotal</span>
// //                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between text-muted-foreground">
// //                   <span>{deliveryMethod === "pickup" ? "Pickup" : "Shipping"}</span>
// //                   <span>
// //                     {shippingCost === 0 ? (
// //                       <Badge variant="outline" className="text-green-600 border-green-600">
// //                         FREE
// //                       </Badge>
// //                     ) : (
// //                       `Ksh ${(shippingCost / 100).toFixed(2)}`
// //                     )}
// //                   </span>
// //                 </div>
// //                 {deliveryMethod === "ship" && selectedZone && (
// //                   <p className="text-xs text-muted-foreground">
// //                     {selectedZone.name}
// //                   </p>
// //                 )}
// //                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
// //                   <span>Total</span>
// //                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               {/* Place Order Button */}
// //               <Button
// //                 className="w-full text-lg py-6"
// //                 size="lg"
// //                 onClick={handleMpesaPayment}
// //                 disabled={isProcessing || cartItems.length === 0}
// //               >
// //                 {isProcessing ? (
// //                   <>
// //                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
// //                     Processing...
// //                   </>
// //                 ) : (
// //                   `Place Order - Ksh ${(total / 100).toFixed(2)}`
// //                 )}
// //               </Button>

// //               {(isProcessing && paymentMethod === "mpesa") && (
// //                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
// //                   <p className="text-sm text-green-900 font-medium text-center">
// //                     Check your phone for M-Pesa prompt
// //                   </p>
// //                   <p className="text-xs text-green-700 text-center mt-1">
// //                     Enter your M-Pesa PIN to complete payment
// //                   </p>
// //                 </div>
// //               )}

// //               {waitingForWebhook && (
// //                 <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
// //                   <p className="text-sm text-blue-900 font-medium text-center">
// //                     Waiting for payment confirmation...
// //                   </p>
// //                   <p className="text-xs text-blue-700 text-center mt-1">
// //                     This may take up to 2 minutes. Do not close this page.
// //                   </p>
// //                   {placedOrderId && (
// //                     <p className="text-xs text-blue-700 text-center mt-1">
// //                       Order: {placedOrderId}
// //                     </p>
// //                   )}
// //                 </div>
// //               )}

// //               {webhookTimeout && (
// //                 <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                   <p className="text-sm text-yellow-900 font-medium text-center">
// //                     Still waiting for M-Pesa confirmation.
// //                   </p>
// //                   <p className="text-xs text-yellow-800 text-center mt-1">
// //                     You can stay on this page, check your M-Pesa app, or view order status in your profile.
// //                   </p>
// //                   <div className="flex gap-2 justify-center mt-2">
// //                     <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>Go to Profile</Button>
// //                   </div>
// //                 </div>
// //               )}

// //               {orderError && (
// //                 <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
// //                   <p className="text-sm text-red-900 font-medium whitespace-pre-line">
// //                     {orderError}
// //                   </p>
// //                 </div>
// //               )}

// //               <p className="text-xs text-muted-foreground text-center mt-4">
// //                 By placing your order, you agree to our Terms & Conditions
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CheckoutPage;
// import { useMemo, useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { 
//   ShoppingCart, 
//   Trash2, 
//   Plus, 
//   Minus, 
//   CreditCard, 
//   Smartphone,
//   MapPin,
//   User,
//   Mail,
//   Phone,
//   Home,
//   Truck,
//   ArrowLeft,
//   Loader2
// } from "lucide-react";
// import Header from "@/components/Header";
// import { useNavigate } from "react-router-dom";
// import Footer from "@/components/Footer";
// import { useCart } from "@/context/CartContext";
// import { buildApiUrl, API_CONFIG } from "@/lib/config";

// interface ShippingZone {
//   zone: string;
//   name: string;
//   price: number;
//   areas: string[];
// }

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { items: cartItems, updateQuantity, removeItem, clear } = useCart();
//   const pollingActiveRef = useRef(false);

//   const [paymentMethod, setPaymentMethod] = useState("mpesa");
//   const [mpesaNumber, setMpesaNumber] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryMethod, setDeliveryMethod] = useState("ship");
  
//   const [customerInfo, setCustomerInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: ""
//   });

//   const [shippingInfo, setShippingInfo] = useState({
//     address: "",
//     apartment: "",
//     city: "",
//     county: "",
//     zone: "",
//     area: ""
//   });

//   const [pickupLocation, setPickupLocation] = useState("");
//   const [isLoadingUser, setIsLoadingUser] = useState(true);
//   const [userFetchError, setUserFetchError] = useState(false);
//   const [isFetched, setIsFetched] = useState(false);
//   const [orderError, setOrderError] = useState<string | null>(null);
//   const [waitingForWebhook, setWaitingForWebhook] = useState(false);
//   const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
//   const [webhookTimeout, setWebhookTimeout] = useState(false);
  
//   const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
//   const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
//   const [isLoadingZones, setIsLoadingZones] = useState(false);
//   const [selectedArea, setSelectedArea] = useState("");

//   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
  
//   const shippingCost = useMemo(() => {
//     if (deliveryMethod === "pickup") return 0;
//     if (selectedZone) return selectedZone.price * 100;
//     return 0;
//   }, [deliveryMethod, selectedZone]);
  
//   const total = subtotal + shippingCost;

//   // Reset shipping info when delivery method changes
//   useEffect(() => {
//     if (deliveryMethod === "pickup") {
//       setSelectedZone(null);
//       setSelectedArea("");
//       setShippingInfo(prev => ({ ...prev, zone: "", area: "" }));
//     }
//   }, [deliveryMethod]);

//   // Fetch shipping zones
//   useEffect(() => {
//     const fetchShippingZones = async () => {
//       if (deliveryMethod !== "ship") return;
//       try {
//         setIsLoadingZones(true);
//         const url = buildApiUrl(API_CONFIG.ENDPOINTS.SHIPPING.ZONES);
//         const response = await fetch(url);
//         let data = {};
//         try {
//           const text = await response.text();
//           if (text.trim()) data = JSON.parse(text);
//         } catch (e) {
//           console.error('Failed to parse zones:', e);
//         }
//         if (response.ok && data.success && data.data?.zones) {
//           setShippingZones(data.data.zones);
//         }
//       } catch (error) {
//         console.error('Error fetching zones:', error);
//       } finally {
//         setIsLoadingZones(false);
//       }
//     };
//     fetchShippingZones();
//   }, [deliveryMethod]);

//   // Fetch user profile
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token || cartItems.length === 0) {
//       setIsLoadingUser(false);
//       if (cartItems.length === 0) navigate('/cart');
//       return;
//     }

//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         let data = {};
//         try {
//           const text = await response.text();
//           if (text.trim()) data = JSON.parse(text);
//         } catch (e) {
//           throw new Error('Invalid response from server');
//         }

//         if (response.ok && data.success && data.data?.user) {
//           const user = data.data.user;
//           setCustomerInfo({
//             firstName: user.first_name || '',
//             lastName: user.last_name || '',
//             email: user.email || '',
//             phone: user.phone || ''
//           });
//           setMpesaNumber(user.phone || '');
//           setIsFetched(true);
//         } else {
//           throw new Error(data.message || 'Failed to fetch profile');
//         }
//       } catch (error) {
//         console.error('Profile error:', error);
//         setUserFetchError(true);
//       } finally {
//         setIsLoadingUser(false);
//       }
//     };

//     fetchUserProfile();
//   }, [navigate, cartItems.length]);

//   // Cleanup polling
//   useEffect(() => {
//     return () => { pollingActiveRef.current = false; };
//   }, []);

//   const handleQuantityChange = (id: string, action: "increase" | "decrease") => {
//     const item = cartItems.find(i => i.id === id);
//     if (!item) return;
//     if (action === "increase") updateQuantity(id, item.quantity + 1);
//     if (action === "decrease" && item.quantity > 1) updateQuantity(id, item.quantity - 1);
//   };

//   const handleRemoveItem = (id: string) => removeItem(id);

//   const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (isFetched && e.target.name !== 'phone') return;
//     const value = e.target.value;
//     setCustomerInfo(prev => ({ ...prev, [e.target.name]: value }));
//     if (e.target.name === 'phone') setMpesaNumber(value);
//   };

//   const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleZoneChange = (zoneValue: string) => {
//     const zone = shippingZones.find(z => z.zone === zoneValue);
//     setSelectedZone(zone || null);
//     setSelectedArea("");
//     setShippingInfo(prev => ({ ...prev, zone: zoneValue, area: "" }));
//   };

//   const handleAreaChange = (areaValue: string) => {
//     setSelectedArea(areaValue);
//     setShippingInfo(prev => ({ ...prev, area: areaValue }));
//   };

//   const pollOrderStatus = async (orderId: string) => {
//     pollingActiveRef.current = true;
//     let elapsed = 0;
//     const interval = 4000;
//     const timeoutMs = 120000;

//     const poll = async () => {
//       if (!pollingActiveRef.current) return;
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.ALL)}/${orderId}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             ...(token && { 'Authorization': `Bearer ${token}` })
//           }
//         });
//         let d = {};
//         try {
//           const text = await res.text();
//           if (text.trim()) d = JSON.parse(text);
//         } catch (e) { /* continue */ }

//         if (res.ok && d.success && d.data) {
//           const status = d.data.payment_status || d.data.status;
//           if (['completed', 'paid', 'success'].includes(status)) {
//             pollingActiveRef.current = false;
//             clear();
//             setWaitingForWebhook(false);
//             navigate('/profile');
//             return;
//           }
//           if (['failed', 'cancelled'].includes(status)) {
//             pollingActiveRef.current = false;
//             setWaitingForWebhook(false);
//             setOrderError('Payment failed. Please try again.');
//             return;
//           }
//         }
//       } catch (e) {
//         console.error('Polling error:', e);
//       }

//       elapsed += interval;
//       if (elapsed < timeoutMs && pollingActiveRef.current) {
//         setTimeout(poll, interval);
//       } else {
//         pollingActiveRef.current = false;
//         setWaitingForWebhook(false);
//         setWebhookTimeout(true);
//       }
//     };

//     setTimeout(poll, interval);
//   };

//   const handleMpesaPayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setOrderError(null);
//     setWebhookTimeout(false);

//     // Validation
//     const fullName = `${customerInfo.firstName} ${customerInfo.lastName}`.trim();
//     if (!fullName || !customerInfo.email || !customerInfo.phone) {
//       alert('Please fill in name, email, and phone');
//       return;
//     }

//     if (deliveryMethod === "ship" && (!shippingInfo.address || !shippingInfo.zone || !selectedArea)) {
//       alert('Please complete shipping address');
//       return;
//     }

//     if (deliveryMethod === "pickup" && !pickupLocation) {
//       alert('Please select pickup location');
//       return;
//     }

//     // Format phone
//     let formattedPhone = mpesaNumber.replace(/\D/g, '');
//     if (formattedPhone.startsWith('0') && formattedPhone.length === 10) {
//       formattedPhone = '254' + formattedPhone.slice(1);
//     } else if (!formattedPhone.startsWith('254')) {
//       formattedPhone = '254' + formattedPhone;
//     }

//     if (!/^254[0-9]{9}$/.test(formattedPhone)) {
//       alert('Invalid phone number. Use 0712345678 or 254712345678');
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const items = cartItems.map(item => ({
//         product_id: item.id,
//         quantity: item.quantity
//       }));

//       let shippingAddress = '';
//       if (deliveryMethod === "ship") {
//         const parts = [
//           shippingInfo.address,
//           shippingInfo.apartment,
//           selectedArea,
//           shippingInfo.zone,
//           shippingInfo.city,
//           shippingInfo.county
//         ].filter(Boolean);
//         shippingAddress = parts.join(', ');
//       }

//       const payload = {
//         items,
//         payment_method: "kcb_mpesa",
//         phone_number: formattedPhone,
//         shipping_method: deliveryMethod === "pickup" ? "pickup" : "delivery",
//         full_name: fullName,
//         email: customerInfo.email,
//         phone: mpesaNumber
//       };

//       if (deliveryMethod === "ship" && shippingAddress) {
//         // @ts-ignore
//         payload.shipping_address = shippingAddress;
//       }

//       console.log('Checkout payload:', JSON.stringify(payload, null, 2));

//       const token = localStorage.getItem('token');
//       const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CHECKOUT), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         body: JSON.stringify(payload)
//       });

//       let data = {};
//       try {
//         const text = await response.text();
//         if (text.trim()) data = JSON.parse(text);
//       } catch (e) {
//         throw new Error('Server error: Invalid response');
//       }

//       if (response.ok && data.success) {
//         const orderId = data.data?.order_id || data.data?.id || data.order_id || data.id;
//         setPlacedOrderId(orderId);
//         setWaitingForWebhook(true);
//         if (orderId) pollOrderStatus(orderId);
//         else setWebhookTimeout(true);
//       } else {
//         const msg = data.message || Object.values(data.errors || {}).flat().join(', ') || 'Failed to place order';
//         throw new Error(msg);
//       }
//     } catch (error: any) {
//       setOrderError(error.message || 'Checkout failed');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Loading states
//   if (isLoadingUser) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-1 flex items-center justify-center p-4">
//           <div className="text-center">
//             <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//             <p>Loading checkout...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (userFetchError) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <div className="flex-1 flex items-center justify-center p-4">
//           <div className="text-center max-w-sm">
//             <p className="text-red-600 mb-4">Please log in to continue</p>
//             <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       <Header />

//       <div className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
//         <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate("/cart")}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Cart
//         </Button>

//         <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Forms - Full width on mobile */}
//           <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">
//             {/* Delivery Method */}
//             <div className="bg-card border rounded-xl p-5">
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-primary" />
//                 Delivery Method
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div
//                   onClick={() => setDeliveryMethod("ship")}
//                   className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     deliveryMethod === "ship" ? "border-primary bg-primary/5" : "border-border"
//                   }`}
//                 >
//                   <Truck className="w-8 h-8 text-blue-600" />
//                   <div>
//                     <p className="font-medium">Ship</p>
//                     <p className="text-xs text-muted-foreground">To your door</p>
//                   </div>
//                   {deliveryMethod === "ship" && <div className="ml-auto w-5 h-5 bg-primary rounded-full" />}
//                 </div>

//                 <div
//                   onClick={() => setDeliveryMethod("pickup")}
//                   className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     deliveryMethod === "pickup" ? "border-primary bg-primary/5" : "border-border"
//                   }`}
//                 >
//                   <User className="w-8 h-8 text-green-600" />
//                   <div>
//                     <p className="font-medium">Free Pickup</p>
//                     <p className="text-xs text-muted-foreground">From store</p>
//                   </div>
//                   {deliveryMethod === "pickup" && <div className="ml-auto w-5 h-5 bg-primary rounded-full" />}
//                 </div>
//               </div>
//             </div>

//             {/* Customer Details */}
//             <div className="bg-card border rounded-xl p-5">
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <User className="w-5 h-5 text-primary" />
//                 Customer Details {isFetched && <Badge variant="secondary">From Account</Badge>}
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <Label>First Name *</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                     <Input
//                       name="firstName"
//                       placeholder="John"
//                       value={customerInfo.firstName}
//                       onChange={handleCustomerChange}
//                       readOnly={isFetched}
//                       className={`pl-10 ${isFetched ? "bg-muted" : ""}`}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Last Name *</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                     <Input
//                       name="lastName"
//                       placeholder="Doe"
//                       value={customerInfo.lastName}
//                       onChange={handleCustomerChange}
//                       readOnly={isFetched}
//                       className={`pl-10 ${isFetched ? "bg-muted" : ""}`}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Email *</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                     <Input
//                       name="email"
//                       type="email"
//                       placeholder="john@example.com"
//                       value={customerInfo.email}
//                       onChange={handleCustomerChange}
//                       readOnly={isFetched}
//                       className={`pl-10 ${isFetched ? "bg-muted" : ""}`}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Phone *</Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                     <Input
//                       name="phone"
//                       placeholder="0712345678"
//                       value={customerInfo.phone}
//                       onChange={handleCustomerChange}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping / Pickup */}
//             {deliveryMethod === "ship" ? (
//               <div className="bg-card border rounded-xl p-5">
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                   <Home className="w-5 h-5 text-primary" />
//                   Shipping Address
//                 </h2>
//                 <div className="space-y-3">
//                   <div>
//                     <Label>Zone *</Label>
//                     <Select value={shippingInfo.zone} onValueChange={handleZoneChange} disabled={isLoadingZones}>
//                       <SelectTrigger>
//                         <SelectValue placeholder={isLoadingZones ? "Loading..." : "Select zone"} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {shippingZones.map(z => (
//                           <SelectItem key={z.zone} value={z.zone}>
//                             {z.name} - Ksh {z.price}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {selectedZone && (
//                     <div>
//                       <Label>Area *</Label>
//                       <Select value={selectedArea} onValueChange={handleAreaChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select area" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {selectedZone.areas.map((a, i) => (
//                             <SelectItem key={i} value={a}>{a}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     <div className="sm:col-span-2">
//                       <Label>Address *</Label>
//                       <div className="relative">
//                         <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                         <Input name="address" placeholder="123 Main St" className="pl-10" value={shippingInfo.address} onChange={handleShippingChange} />
//                       </div>
//                     </div>
//                     <div className="sm:col-span-2">
//                       <Label>Apartment (Optional)</Label>
//                       <div className="relative">
//                         <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                         <Input name="apartment" placeholder="Apt 4B" className="pl-10" value={shippingInfo.apartment} onChange={handleShippingChange} />
//                       </div>
//                     </div>
//                     <div>
//                       <Label>City *</Label>
//                       <Input name="city" placeholder="Nairobi" value={shippingInfo.city} onChange={handleShippingChange} />
//                     </div>
//                     <div>
//                       <Label>County *</Label>
//                       <Input name="county" placeholder="Nairobi" value={shippingInfo.county} onChange={handleShippingChange} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-card border rounded-xl p-5">
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-primary" />
//                   Pickup Location
//                 </h2>
//                 <Select value={pickupLocation} onValueChange={setPickupLocation}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose store" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="beaver-house">
//                       Beaver House, Basement B11, Opposite Club Eureka, Tom Mboya Street
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {/* Payment */}
//             <div className="bg-card border rounded-xl p-5">
//               <h2 className="text-lg font-bold mb-4">Payment</h2>
//               <div
//                 onClick={() => setPaymentMethod("mpesa")}
//                 className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                   paymentMethod === "mpesa" ? "border-primary bg-primary/5" : "border-border"
//                 }`}
//               >
//                 <Smartphone className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="font-medium">M-Pesa</p>
//                   <p className="text-xs text-muted-foreground">Lipa Na M-Pesa</p>
//                 </div>
//                 {paymentMethod === "mpesa" && <div className="ml-auto w-5 h-5 bg-primary rounded-full" />}
//               </div>

//               {paymentMethod === "mpesa" && (
//                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//                   <Label className="text-green-900">M-Pesa Number *</Label>
//                   <div className="relative mt-2">
//                     <Smartphone className="absolute left-3 top-3 w-4 h-4 text-green-600" />
//                     <Input
//                       type="tel"
//                       placeholder="0712345678"
//                       className="pl-10 border-green-300"
//                       value={mpesaNumber}
//                       onChange={(e) => setMpesaNumber(e.target.value)}
//                     />
//                   </div>
//                   <p className="text-xs text-green-700 mt-2">
//                     You’ll receive an STK push
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Order Summary - Sticky on large, full-width on mobile */}
//           <div className="lg:col-span-1 order-1 lg:order-2">
//             <div className="bg-card border rounded-xl p-5 sticky top-4 lg:top-6">
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <ShoppingCart className="w-5 h-5 text-primary" />
//                 Order Summary
//               </h2>

//               <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
//                 {cartItems.map(item => (
//                   <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
//                     <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
//                     <div className="flex-1">
//                       <p className="font-medium text-sm">{item.name}</p>
//                       <p className="text-xs text-muted-foreground">Ksh {(item.price / 100).toFixed(2)}</p>
//                       <div className="flex items-center gap-1 mt-1">
//                         <button onClick={() => handleQuantityChange(item.id, "decrease")} className="w-6 h-6 rounded border flex items-center justify-center">
//                           <Minus className="w-3 h-3" />
//                         </button>
//                         <span className="w-6 text-center text-sm">{item.quantity}</span>
//                         <button onClick={() => handleQuantityChange(item.id, "increase")} className="w-6 h-6 rounded border flex items-center justify-center">
//                           <Plus className="w-3 h-3" />
//                         </button>
//                         <button onClick={() => handleRemoveItem(item.id)} className="ml-auto text-red-500">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>{deliveryMethod === "pickup" ? "Pickup" : "Shipping"}</span>
//                   <span>
//                     {shippingCost === 0 ? (
//                       <Badge variant="outline" className="text-green-600">FREE</Badge>
//                     ) : `Ksh ${(shippingCost / 100).toFixed(2)}`}
//                   </span>
//                 </div>
//                 {deliveryMethod === "ship" && selectedZone && (
//                   <p className="text-xs text-muted-foreground">{selectedZone.name}</p>
//                 )}
//                 <div className="flex justify-between font-bold text-base pt-2 border-t">
//                   <span>Total</span>
//                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
//                 </div>
//               </div>

//               <Button
//                 className="w-full mt-5 h-12 text-base"
//                 onClick={handleMpesaPayment}
//                 disabled={isProcessing || cartItems.length === 0}
//               >
//                 {isProcessing ? (
//                   <>Processing...</>
//                 ) : (
//                   `Pay Ksh ${(total / 100).toFixed(2)}`
//                 )}
//               </Button>

//               {isProcessing && paymentMethod === "mpesa" && (
//                 <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-center text-sm">
//                   <p className="font-medium text-green-900">Check your phone</p>
//                   <p className="text-green-700">Enter PIN to pay</p>
//                 </div>
//               )}

//               {waitingForWebhook && (
//                 <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center text-sm">
//                   <p className="font-medium text-blue-900">Confirming payment...</p>
//                   <p className="text-blue-700">Do not close. Order: {placedOrderId}</p>
//                 </div>
//               )}

//               {webhookTimeout && (
//                 <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center text-sm">
//                   <p className="font-medium text-yellow-900">Still waiting...</p>
//                   <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate('/profile')}>
//                     View in Profile
//                   </Button>
//                 </div>
//               )}

//               {orderError && (
//                 <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-900">
//                   {orderError}
//                 </div>
//               )}

//               <p className="text-xs text-center text-muted-foreground mt-4">
//                 By placing order, you agree to Terms
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CheckoutPage;
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
        const res = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/me', {
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
      const res = await fetch('https://bloom-backend-hqu8.onrender.com/api/v3/kcb/stkpush', {
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
                    {shippingCost === 0 ? (
                      <Badge variant="outline" className="text-green-600">FREE</Badge>
                    ) : `Ksh ${(shippingCost / 100).toFixed(2)}`}
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