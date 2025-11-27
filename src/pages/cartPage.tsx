// // // import { useMemo } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
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
// // //   CheckCircle2,
// // //   ArrowLeft,
// // //   Loader2
// // // } from "lucide-react";
// // // import Header from "@/components/Header";
// // // import Footer from "@/components/Footer";
// // // import { useCart } from "@/context/CartContext";

// // // const CartPage = () => {
// // //   const navigate = useNavigate();
// // //   const { items: cartItems, updateQuantity, removeItem } = useCart();

// // //   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
// // //   const shipping = subtotal > 5000 ? 0 : 350;
// // //   const total = subtotal + shipping;

// // //   const handleQuantityChange = (id, action) => {
// // //     const target = cartItems.find(i => i.id === id);
// // //     if (!target) return;
// // //     if (action === "increase") updateQuantity(id, target.quantity + 1);
// // //     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
// // //   };

// // //   const handleRemoveItem = (id) => removeItem(id);

// // //   const handleProceedToCheckout = () => {
// // //     if (cartItems.length > 0) {
// // //       navigate("/checkout");
// // //     }
// // //   };

// // //   if (cartItems.length === 0) {
// // //     return (
// // //       <div className="min-h-screen bg-background">
// // //         <Header />
// // //         <div className="container mx-auto px-4 py-20 text-center">
// // //           <div className="max-w-md mx-auto">
// // //             <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
// // //             <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
// // //             <p className="text-muted-foreground mb-8">
// // //               You haven't added any items to your cart yet.
// // //             </p>
// // //             <Button onClick={() => navigate("/")}>
// // //               Continue Shopping
// // //             </Button>
// // //           </div>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <Header />

// // //       <div className="container mx-auto px-4 py-8">
// // //         <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
// // //           <ArrowLeft className="w-4 h-4 mr-2" />
// // //           Back to Shop
// // //         </Button>

// // //         <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //           {/* Cart Items */}
// // //           <div className="lg:col-span-2">
// // //             <div className="bg-card border border-border rounded-xl p-6 mb-6">
// // //               <h2 className="text-xl font-bold mb-4">Your Items ({cartItems.length})</h2>
// // //               <div className="space-y-4">
// // //                 {cartItems.map((item) => (
// // //                   <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
// // //                     <img
// // //                       src={item.image}
// // //                       alt={item.name}
// // //                       className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
// // //                     />
// // //                     <div className="flex-1 min-w-0">
// // //                       <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
// // //                       <p className="text-sm text-muted-foreground mb-3">
// // //                         Ksh {(item.price / 100).toFixed(2)} each
// // //                       </p>
// // //                       <div className="flex items-center justify-between">
// // //                         <div className="flex items-center gap-2">
// // //                           <button
// // //                             onClick={() => handleQuantityChange(item.id, "decrease")}
// // //                             className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // //                             disabled={item.quantity <= 1}
// // //                             aria-label={`Decrease quantity of ${item.name}`}
// // //                           >
// // //                             <Minus className="w-3 h-3" />
// // //                           </button>
// // //                           <span className="w-8 text-center font-medium">{item.quantity}</span>
// // //                           <button
// // //                             onClick={() => handleQuantityChange(item.id, "increase")}
// // //                             className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
// // //                             aria-label={`Increase quantity of ${item.name}`}
// // //                           >
// // //                             <Plus className="w-3 h-3" />
// // //                           </button>
// // //                         </div>
// // //                         <div className="flex items-center gap-4">
// // //                           <span className="font-bold text-foreground">
// // //                             Ksh {((item.price * item.quantity) / 100).toFixed(2)}
// // //                           </span>
// // //                           <button
// // //                             onClick={() => handleRemoveItem(item.id)}
// // //                             className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
// // //                             aria-label={`Remove ${item.name} from cart`}
// // //                           >
// // //                             <Trash2 className="w-4 h-4" />
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Order Summary */}
// // //           <div className="lg:col-span-1">
// // //             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
// // //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// // //                 <ShoppingCart className="w-5 h-5 text-primary" />
// // //                 Order Summary
// // //               </h2>

// // //               <div className="space-y-2 mb-6">
// // //                 {cartItems.map((item) => (
// // //                   <div key={item.id} className="flex justify-between text-sm">
// // //                     <span className="text-muted-foreground">{item.name}</span>
// // //                     <span className="font-medium">Ksh {((item.price * item.quantity) / 100).toFixed(2)}</span>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               <div className="space-y-3 mb-6">
// // //                 <div className="flex justify-between">
// // //                   <span className="text-muted-foreground">Subtotal</span>
// // //                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-muted-foreground">Shipping</span>
// // //                   <span>
// // //                     {shipping === 0 ? (
// // //                       <Badge variant="outline" className="text-green-600 border-green-600">
// // //                         FREE
// // //                       </Badge>
// // //                     ) : (
// // //                       `Ksh ${(shipping / 100).toFixed(2)}`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 {subtotal < 5000 && (
// // //                   <p className="text-xs text-muted-foreground">
// // //                     Add Ksh {((5000 - subtotal) / 100).toFixed(2)} more for free shipping
// // //                   </p>
// // //                 )}
// // //                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
// // //                   <span>Total</span>
// // //                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
// // //                 </div>
// // //               </div>

// // //               <Button
// // //                 className="w-full text-lg py-6"
// // //                 size="lg"
// // //                 onClick={handleProceedToCheckout}
// // //                 disabled={cartItems.length === 0}
// // //               >
// // //                 Proceed to Checkout
// // //               </Button>

// // //               <p className="text-xs text-muted-foreground text-center mt-4">
// // //                 Shipping calculated at checkout
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // export default CartPage;
// // import { useMemo, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Separator } from "@/components/ui/separator";
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
// //   CheckCircle2,
// //   ArrowLeft,
// //   Loader2,
// //   Eye,
// //   EyeOff
// // } from "lucide-react";
// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";
// // import { useCart } from "@/context/CartContext";

// // interface LoginFormData {
// //   email: string;
// //   password: string;
// // }

// // interface RegisterFormData {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   password: string;
// //   confirmPassword: string;
// // }

// // const LoginForm = ({ onSuccess, onSwitchToSignup }: { onSuccess: () => void; onSwitchToSignup: () => void }) => {
// //   const [formData, setFormData] = useState<LoginFormData>({
// //     email: '',
// //     password: '',
// //   });
// //   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const togglePasswordVisibility = () => setShowPassword(!showPassword);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     if (formData.password.length < 6) {
// //       setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
// //       return;
// //     }

// //     setIsLoading(true);
// //     setMessage(null);

// //     try {
// //       const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         // In a real app, store token: localStorage.setItem('token', data.token);
// //         setMessage({ text: 'Login successful! Redirecting to checkout...', type: 'success' });
// //         setTimeout(() => {
// //           onSuccess();
// //         }, 1500);
// //       } else {
// //         setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
// //       }
// //     } catch (error) {
// //       setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
// //       console.error('Error:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <form className="space-y-6" onSubmit={handleSubmit}>
// //         <div>
// //           <Label htmlFor="email" className="text-sm font-medium text-foreground">
// //             Email <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="email"
// //             name="email"
// //             type="email"
// //             required
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="Enter your email address"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="password" className="text-sm font-medium text-foreground">
// //             Password <span className="text-destructive">*</span>
// //           </Label>
// //           <div className="relative">
// //             <Input
// //               id="password"
// //               name="password"
// //               type={showPassword ? "text" : "password"}
// //               required
// //               minLength={6}
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
// //               placeholder="Enter your password"
// //             />
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               size="sm"
// //               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
// //               onClick={togglePasswordVisibility}
// //             >
// //               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //             </Button>
// //           </div>
// //           <p className="mt-1 text-xs text-muted-foreground">Forgot password? <Button variant="link" size="sm" className="h-auto p-0 text-primary hover:text-primary/80">Reset</Button></p>
// //         </div>

// //         {message && (
// //           <div
// //             className={`p-3 rounded-md text-sm text-center ${
// //               message.type === 'success'
// //                 ? 'bg-green-50 border border-green-200 text-green-800'
// //                 : 'bg-destructive/10 border border-destructive/30 text-destructive'
// //             }`}
// //           >
// //             {message.text}
// //           </div>
// //         )}

// //         <Button
// //           type="submit"
// //           disabled={isLoading}
// //           className="w-full h-12 text-base font-semibold"
// //           size="lg"
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //               Signing In...
// //             </>
// //           ) : (
// //             'Sign In & Continue to Checkout'
// //           )}
// //         </Button>
// //       </form>

// //       <div className="text-center pt-6">
// //         <Separator className="my-4" />
// //         <p className="text-sm text-muted-foreground mb-4">Don't have an account?</p>
// //         <Button
// //           variant="outline"
// //           onClick={onSwitchToSignup}
// //           className="px-8"
// //         >
// //           Sign Up
// //         </Button>
// //       </div>
// //     </>
// //   );
// // };

// // const SignupForm = ({ onSuccess, onSwitchToLogin }: { onSuccess: () => void; onSwitchToLogin: () => void }) => {
// //   const [formData, setFormData] = useState<RegisterFormData>({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //   });
// //   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
// //     if (field === 'password') setShowPassword(!showPassword);
// //     else setShowConfirmPassword(!showConfirmPassword);
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     if (formData.password !== formData.confirmPassword) {
// //       setMessage({ text: 'Passwords do not match!', type: 'error' });
// //       return;
// //     }

// //     if (formData.password.length < 6) {
// //       setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
// //       return;
// //     }

// //     setIsLoading(true);
// //     setMessage(null);

// //     try {
// //       const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setMessage({ text: 'Registration successful! Redirecting to checkout...', type: 'success' });
// //         setTimeout(() => {
// //           onSuccess();
// //         }, 1500);
// //       } else {
// //         setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
// //       }
// //     } catch (error) {
// //       setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
// //       console.error('Error:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <form className="space-y-6" onSubmit={handleSubmit}>
// //         <div>
// //           <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
// //             First Name <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="firstName"
// //             name="firstName"
// //             type="text"
// //             required
// //             value={formData.firstName}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="Enter your first name"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
// //             Last Name <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="lastName"
// //             name="lastName"
// //             type="text"
// //             required
// //             value={formData.lastName}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="Enter your last name"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="email" className="text-sm font-medium text-foreground">
// //             Email <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="email"
// //             name="email"
// //             type="email"
// //             required
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="Enter your email address"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="password" className="text-sm font-medium text-foreground">
// //             Password <span className="text-destructive">*</span>
// //           </Label>
// //           <div className="relative">
// //             <Input
// //               id="password"
// //               name="password"
// //               type={showPassword ? "text" : "password"}
// //               required
// //               minLength={6}
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
// //               placeholder="Enter your password"
// //             />
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               size="sm"
// //               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
// //               onClick={() => togglePasswordVisibility('password')}
// //             >
// //               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //             </Button>
// //           </div>
// //           <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
// //         </div>

// //         <div>
// //           <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
// //             Confirm Password <span className="text-destructive">*</span>
// //           </Label>
// //           <div className="relative">
// //             <Input
// //               id="confirmPassword"
// //               name="confirmPassword"
// //               type={showConfirmPassword ? "text" : "password"}
// //               required
// //               minLength={6}
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
// //               placeholder="Confirm your password"
// //             />
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               size="sm"
// //               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
// //               onClick={() => togglePasswordVisibility('confirmPassword')}
// //             >
// //               {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //             </Button>
// //           </div>
// //         </div>

// //         {message && (
// //           <div
// //             className={`p-3 rounded-md text-sm text-center ${
// //               message.type === 'success'
// //                 ? 'bg-green-50 border border-green-200 text-green-800'
// //                 : 'bg-destructive/10 border border-destructive/30 text-destructive'
// //             }`}
// //           >
// //             {message.text}
// //           </div>
// //         )}

// //         <Button
// //           type="submit"
// //           disabled={isLoading}
// //           className="w-full h-12 text-base font-semibold"
// //           size="lg"
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //               Registering...
// //             </>
// //           ) : (
// //             'Register & Continue to Checkout'
// //           )}
// //         </Button>

// //         <p className="text-xs text-muted-foreground text-center">
// //           By registering, you agree to our Terms of Service and Privacy Policy.
// //         </p>
// //       </form>

// //       <div className="text-center pt-6">
// //         <Separator className="my-4" />
// //         <p className="text-sm text-muted-foreground mb-4">Already have an account?</p>
// //         <Button
// //           variant="outline"
// //           onClick={onSwitchToLogin}
// //           className="px-8"
// //         >
// //           Sign In
// //         </Button>
// //       </div>
// //     </>
// //   );
// // };

// // const AuthModalContent = ({ onSuccess }: { onSuccess: () => void }) => {
// //   const [isLogin, setIsLogin] = useState(true);

// //   return (
// //     <div className="p-6">
// //       <DialogHeader className="mb-6">
// //         <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
// //           <User className="w-6 h-6 text-primary" />
// //           {isLogin ? 'Sign In' : 'Sign Up'} to Checkout
// //         </DialogTitle>
// //       </DialogHeader>
// //       {isLogin ? (
// //         <LoginForm onSuccess={onSuccess} onSwitchToSignup={() => setIsLogin(false)} />
// //       ) : (
// //         <SignupForm onSuccess={onSuccess} onSwitchToLogin={() => setIsLogin(true)} />
// //       )}
// //     </div>
// //   );
// // };

// // const CartPage = () => {
// //   const navigate = useNavigate();
// //   const { items: cartItems, updateQuantity, removeItem } = useCart();
// //   const [showAuthModal, setShowAuthModal] = useState(false);

// //   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
// //   const shipping = subtotal > 5000 ? 0 : 350;
// //   const total = subtotal + shipping;

// //   const handleQuantityChange = (id, action) => {
// //     const target = cartItems.find(i => i.id === id);
// //     if (!target) return;
// //     if (action === "increase") updateQuantity(id, target.quantity + 1);
// //     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
// //   };

// //   const handleRemoveItem = (id) => removeItem(id);

// //   const handleProceedToCheckout = () => {
// //     if (cartItems.length > 0) {
// //       setShowAuthModal(true);
// //     }
// //   };

// //   const handleAuthSuccess = () => {
// //     setShowAuthModal(false);
// //     navigate("/checkout");
// //   };

// //   if (cartItems.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         <Header />
// //         <div className="container mx-auto px-4 py-20 text-center">
// //           <div className="max-w-md mx-auto">
// //             <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
// //             <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
// //             <p className="text-muted-foreground mb-8">
// //               You haven't added any items to your cart yet.
// //             </p>
// //             <Button onClick={() => navigate("/")}>
// //               Continue Shopping
// //             </Button>
// //           </div>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header />

// //       <div className="container mx-auto px-4 py-8">
// //         <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
// //           <ArrowLeft className="w-4 h-4 mr-2" />
// //           Back to Shop
// //         </Button>

// //         <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Cart Items */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-card border border-border rounded-xl p-6 mb-6">
// //               <h2 className="text-xl font-bold mb-4">Your Items ({cartItems.length})</h2>
// //               <div className="space-y-4">
// //                 {cartItems.map((item) => (
// //                   <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
// //                     />
// //                     <div className="flex-1 min-w-0">
// //                       <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
// //                       <p className="text-sm text-muted-foreground mb-3">
// //                         Ksh {(item.price / 100).toFixed(2)} each
// //                       </p>
// //                       <div className="flex items-center justify-between">
// //                         <div className="flex items-center gap-2">
// //                           <button
// //                             onClick={() => handleQuantityChange(item.id, "decrease")}
// //                             className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
// //                             disabled={item.quantity <= 1}
// //                             aria-label={`Decrease quantity of ${item.name}`}
// //                           >
// //                             <Minus className="w-3 h-3" />
// //                           </button>
// //                           <span className="w-8 text-center font-medium">{item.quantity}</span>
// //                           <button
// //                             onClick={() => handleQuantityChange(item.id, "increase")}
// //                             className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
// //                             aria-label={`Increase quantity of ${item.name}`}
// //                           >
// //                             <Plus className="w-3 h-3" />
// //                           </button>
// //                         </div>
// //                         <div className="flex items-center gap-4">
// //                           <span className="font-bold text-foreground">
// //                             Ksh {((item.price * item.quantity) / 100).toFixed(2)}
// //                           </span>
// //                           <button
// //                             onClick={() => handleRemoveItem(item.id)}
// //                             className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
// //                             aria-label={`Remove ${item.name} from cart`}
// //                           >
// //                             <Trash2 className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Order Summary */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
// //               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
// //                 <ShoppingCart className="w-5 h-5 text-primary" />
// //                 Order Summary
// //               </h2>

// //               <div className="space-y-2 mb-6">
// //                 {cartItems.map((item) => (
// //                   <div key={item.id} className="flex justify-between text-sm">
// //                     <span className="text-muted-foreground">{item.name}</span>
// //                     <span className="font-medium">Ksh {((item.price * item.quantity) / 100).toFixed(2)}</span>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="space-y-3 mb-6">
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Subtotal</span>
// //                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-muted-foreground">Shipping</span>
// //                   <span>
// //                     {shipping === 0 ? (
// //                       <Badge variant="outline" className="text-green-600 border-green-600">
// //                         FREE
// //                       </Badge>
// //                     ) : (
// //                       `Ksh ${(shipping / 100).toFixed(2)}`
// //                     )}
// //                   </span>
// //                 </div>
// //                 {subtotal < 5000 && (
// //                   <p className="text-xs text-muted-foreground">
// //                     Add Ksh {((5000 - subtotal) / 100).toFixed(2)} more for free shipping
// //                   </p>
// //                 )}
// //                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
// //                   <span>Total</span>
// //                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
// //                 <DialogTrigger asChild>
// //                   <Button
// //                     className="w-full text-lg py-6"
// //                     size="lg"
// //                     onClick={handleProceedToCheckout}
// //                     disabled={cartItems.length === 0}
// //                   >
// //                     Proceed to Checkout
// //                   </Button>
// //                 </DialogTrigger>
// //                 <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
// //                   <AuthModalContent onSuccess={handleAuthSuccess} />
// //                 </DialogContent>
// //               </Dialog>

// //               <p className="text-xs text-muted-foreground text-center mt-4">
// //                 Shipping calculated at checkout
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CartPage;
// import { useMemo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
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
//   CheckCircle2,
//   ArrowLeft,
//   Loader2,
//   Eye,
//   EyeOff
// } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useCart } from "@/context/CartContext";

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// interface RegisterFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phone: string;
// }

// const LoginForm = ({ onSuccess, onSwitchToSignup }: { onSuccess: () => void; onSwitchToSignup: () => void }) => {
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: '',
//     password: '',
//   });
//   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (formData.password.length < 6) {
//       setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage(null);

//     try {
//       console.log('Attempting login with:', formData);
//       const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log('Login response:', response.status, data);

//       if (response.ok && data.success) {
//         const accessToken = data.data?.accessToken;
//         if (accessToken) {
//           localStorage.setItem('token', accessToken);
//         } else {
//           console.warn('No accessToken in response');
//         }
//         setMessage({ text: 'Login successful! Redirecting to checkout...', type: 'success' });
//         setTimeout(() => {
//           console.log('Navigating to checkout after login');
//           onSuccess();
//         }, 1500);
//       } else {
//         setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage({ text: 'Network error. Please check your connection and backend status.', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <Label htmlFor="email" className="text-sm font-medium text-foreground">
//             Email <span className="text-destructive">*</span>
//           </Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
//             placeholder="Enter your email address"
//           />
//         </div>

//         <div>
//           <Label htmlFor="password" className="text-sm font-medium text-foreground">
//             Password <span className="text-destructive">*</span>
//           </Label>
//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               required
//               minLength={6}
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
//               placeholder="Enter your password"
//             />
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </Button>
//           </div>
//           <p className="mt-1 text-xs text-muted-foreground">Forgot password? <Button variant="link" size="sm" className="h-auto p-0 text-primary hover:text-primary/80">Reset</Button></p>
//         </div>

//         {message && (
//           <div
//             className={`p-3 rounded-md text-sm text-center ${
//               message.type === 'success'
//                 ? 'bg-green-50 border border-green-200 text-green-800'
//                 : 'bg-destructive/10 border border-destructive/30 text-destructive'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full h-12 text-base font-semibold"
//           size="lg"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Signing In...
//             </>
//           ) : (
//             'Sign In & Continue to Checkout'
//           )}
//         </Button>
//       </form>

//       <div className="text-center pt-6">
//         <Separator className="my-4" />
//         <p className="text-sm text-muted-foreground mb-4">Don't have an account?</p>
//         <Button
//           variant="outline"
//           onClick={onSwitchToSignup}
//           className="px-8"
//         >
//           Sign Up
//         </Button>
//       </div>
//     </>
//   );
// };

// const SignupForm = ({ onSuccess, onSwitchToLogin }: { onSuccess: () => void; onSwitchToLogin: () => void }) => {
//   const [formData, setFormData] = useState<RegisterFormData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });
//   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
//     if (field === 'password') setShowPassword(!showPassword);
//     else setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setMessage({ text: 'Passwords do not match!', type: 'error' });
//       return;
//     }

//     if (formData.password.length < 6) {
//       setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage(null);

//     try {
//       console.log('Attempting register with:', formData);
//       const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone,
//           confirmPassword: formData.confirmPassword,
//         }),
//       });

//       const data = await response.json();
//       console.log('Register response:', response.status, data);

//       if (response.ok && data.success) {
//         // Try to set token; if missing, auto-login with new creds
//         let accessToken = data.data?.accessToken;
//         if (!accessToken) {
//           // Fallback: Login immediately after register
//           console.log('No token from register, auto-logging in...');
//           const loginRes = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email: formData.email, password: formData.password }),
//           });
//           const loginData = await loginRes.json();
//           if (loginRes.ok && loginData.success) {
//             accessToken = loginData.data.accessToken;
//           }
//         }
//         if (accessToken) {
//           localStorage.setItem('token', accessToken);
//         } else {
//           console.warn('No accessToken obtained');
//         }
//         setMessage({ text: 'Registration successful! Redirecting to checkout...', type: 'success' });
//         setTimeout(() => {
//           console.log('Navigating to checkout after register');
//           onSuccess();
//         }, 1500);
//       } else {
//         setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Register error:', error);
//       setMessage({ text: 'Network error. Please check your connection and backend status.', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
//             First Name <span className="text-destructive">*</span>
//           </Label>
//           <Input
//             id="firstName"
//             name="firstName"
//             type="text"
//             required
//             value={formData.firstName}
//             onChange={handleChange}
//             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
//             placeholder="Enter your first name"
//           />
//         </div>

//         <div>
//           <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
//             Last Name <span className="text-destructive">*</span>
//           </Label>
//           <Input
//             id="lastName"
//             name="lastName"
//             type="text"
//             required
//             value={formData.lastName}
//             onChange={handleChange}
//             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
//             placeholder="Enter your last name"
//           />
//         </div>

//         <div>
//           <Label htmlFor="email" className="text-sm font-medium text-foreground">
//             Email <span className="text-destructive">*</span>
//           </Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
//             placeholder="Enter your email address"
//           />
//         </div>

//         <div>
//           <Label htmlFor="phone" className="text-sm font-medium text-foreground">
//             Phone <span className="text-destructive">*</span>
//           </Label>
//           <Input
//             id="phone"
//             name="phone"
//             type="tel"
//             required
//             value={formData.phone}
//             onChange={handleChange}
//             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
//             placeholder="e.g., 254114096574"
//           />
//           <p className="mt-1 text-xs text-muted-foreground">Enter your phone number without spaces</p>
//         </div>

//         <div>
//           <Label htmlFor="password" className="text-sm font-medium text-foreground">
//             Password <span className="text-destructive">*</span>
//           </Label>
//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               required
//               minLength={6}
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
//               placeholder="Enter your password"
//             />
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
//               onClick={() => togglePasswordVisibility('password')}
//             >
//               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </Button>
//           </div>
//           <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
//         </div>

//         <div>
//           <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
//             Confirm Password <span className="text-destructive">*</span>
//           </Label>
//           <div className="relative">
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               required
//               minLength={6}
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
//               placeholder="Confirm your password"
//             />
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
//               onClick={() => togglePasswordVisibility('confirmPassword')}
//             >
//               {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </Button>
//           </div>
//         </div>

//         {message && (
//           <div
//             className={`p-3 rounded-md text-sm text-center ${
//               message.type === 'success'
//                 ? 'bg-green-50 border border-green-200 text-green-800'
//                 : 'bg-destructive/10 border border-destructive/30 text-destructive'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full h-12 text-base font-semibold"
//           size="lg"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Registering...
//             </>
//           ) : (
//             'Register & Continue to Checkout'
//           )}
//         </Button>

//         <p className="text-xs text-muted-foreground text-center">
//           By registering, you agree to our Terms of Service and Privacy Policy.
//         </p>
//       </form>

//       <div className="text-center pt-6">
//         <Separator className="my-4" />
//         <p className="text-sm text-muted-foreground mb-4">Already have an account?</p>
//         <Button
//           variant="outline"
//           onClick={onSwitchToLogin}
//           className="px-8"
//         >
//           Sign In
//         </Button>
//       </div>
//     </>
//   );
// };

// const AuthModalContent = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="p-6">
//       <DialogHeader className="mb-6">
//         <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
//           <User className="w-6 h-6 text-primary" />
//           {isLogin ? 'Sign In' : 'Sign Up'} to Checkout
//         </DialogTitle>
//       </DialogHeader>
//       {isLogin ? (
//         <LoginForm onSuccess={onSuccess} onSwitchToSignup={() => setIsLogin(false)} />
//       ) : (
//         <SignupForm onSuccess={onSuccess} onSwitchToLogin={() => setIsLogin(true)} />
//       )}
//     </div>
//   );
// };

// const CartPage = () => {
//   const navigate = useNavigate();
//   const { items: cartItems, updateQuantity, removeItem } = useCart();
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   // Debug cart items
//   useEffect(() => {
//     console.log('Cart items:', cartItems.map(item => ({ name: item.name, image: item.image, hasImage: !!item.image })));
//   }, [cartItems]);

//   const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
//   const shipping = subtotal > 5000 ? 0 : 350;
//   const total = subtotal + shipping;

//   const handleQuantityChange = (id, action) => {
//     const target = cartItems.find(i => i.id === id);
//     if (!target) return;
//     if (action === "increase") updateQuantity(id, target.quantity + 1);
//     if (action === "decrease" && target.quantity > 1) updateQuantity(id, target.quantity - 1);
//   };

//   const handleRemoveItem = (id) => removeItem(id);

//   const handleProceedToCheckout = () => {
//     if (cartItems.length > 0) {
//       setShowAuthModal(true);
//     }
//   };

//   const handleAuthSuccess = () => {
//     console.log('handleAuthSuccess called');
//     setShowAuthModal(false);
//     navigate("/checkout");
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <div className="max-w-md mx-auto">
//             <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
//             <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any items to your cart yet.
//             </p>
//             <Button onClick={() => navigate("/")}>
//               Continue Shopping
//             </Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Shop
//         </Button>

//         <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="bg-card border border-border rounded-xl p-6 mb-6">
//               <h2 className="text-xl font-bold mb-4">Your Items ({cartItems.length})</h2>
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
//                       <p className="text-sm text-muted-foreground mb-3">
//                         Ksh {(item.price / 100).toFixed(2)} each
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => handleQuantityChange(item.id, "decrease")}
//                             className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
//                             disabled={item.quantity <= 1}
//                             aria-label={`Decrease quantity of ${item.name}`}
//                           >
//                             <Minus className="w-3 h-3" />
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => handleQuantityChange(item.id, "increase")}
//                             className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary"
//                             aria-label={`Increase quantity of ${item.name}`}
//                           >
//                             <Plus className="w-3 h-3" />
//                           </button>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="font-bold text-foreground">
//                             Ksh {((item.price * item.quantity) / 100).toFixed(2)}
//                           </span>
//                           <button
//                             onClick={() => handleRemoveItem(item.id)}
//                             className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
//                             aria-label={`Remove ${item.name} from cart`}
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
//               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <ShoppingCart className="w-5 h-5 text-primary" />
//                 Order Summary
//               </h2>

//               <div className="space-y-2 mb-6">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">{item.name}</span>
//                     <span className="font-medium">Ksh {((item.price * item.quantity) / 100).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span>Ksh {(subtotal / 100).toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Shipping</span>
//                   <span>
//                     {shipping === 0 ? (
//                       <Badge variant="outline" className="text-green-600 border-green-600">
//                         FREE
//                       </Badge>
//                     ) : (
//                       `Ksh ${(shipping / 100).toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//                 {subtotal < 5000 && (
//                   <p className="text-xs text-muted-foreground">
//                     Add Ksh {((5000 - subtotal) / 100).toFixed(2)} more for free shipping
//                   </p>
//                 )}
//                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
//                   <span>Total</span>
//                   <span className="text-primary">Ksh {(total / 100).toFixed(2)}</span>
//                 </div>
//               </div>

//               <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
//                 <DialogTrigger asChild>
//                   <Button
//                     className="w-full text-lg py-6"
//                     size="lg"
//                     onClick={handleProceedToCheckout}
//                     disabled={cartItems.length === 0}
//                   >
//                     Proceed to Checkout
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
//                   <AuthModalContent onSuccess={handleAuthSuccess} />
//                 </DialogContent>
//               </Dialog>

//               <p className="text-xs text-muted-foreground text-center mt-4">
//                 Shipping calculated at checkout
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CartPage;
// CartPage Component
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
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
      console.log('Attempting login with:', formData);
      const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', response.status, data);

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
        setMessage({ text: 'Login successful! Redirecting to checkout...', type: 'success' });
        setTimeout(() => {
          console.log('Navigating to checkout after login');
          onSuccess();
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
          <div className="mt-2 flex items-center justify-between">
            <Button 
              type="button" 
              variant="link" 
              size="sm" 
              className="h-auto p-0 text-primary hover:text-primary/80 underline text-xs font-medium" 
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
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
              Signing In...
            </>
          ) : (
            'Sign In & Continue to Checkout'
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
      console.log('Attempting register with:', formData);
      const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();
      console.log('Register response:', response.status, data);

      if (response.ok && data.success) {
        let accessToken = data.data?.accessToken;
        let refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
        if (!accessToken) {
          console.log('No token from register, auto-logging in...');
          const loginRes = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.success) {
            accessToken = loginData.data.accessToken;
            refreshToken = loginData.data.refreshToken || loginData.refreshToken || loginData.refresh_token;
          }
        }
        if (accessToken) {
          const accessTokenExpires = loginData?.data?.accessTokenExpires;
          const refreshTokenExpires = loginData?.data?.refreshTokenExpires;
          setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
        } else {
          console.warn('No accessToken obtained');
        }
        setMessage({ text: 'Registration successful! Redirecting to checkout...', type: 'success' });
        setTimeout(() => {
          console.log('Navigating to checkout after register');
          onSuccess();
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Register error:', error);
      setMessage({ text: 'Network error. Please check your connection and backend status.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            placeholder="Enter your first name"
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
            placeholder="Enter your last name"
          />
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
            placeholder="e.g., 254114096574"
          />
          <p className="mt-1 text-xs text-muted-foreground">Enter your phone number without spaces</p>
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
          <p className="mt-1 text-xs text-muted-foreground">Must be at least 6 characters</p>
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
              Registering...
            </>
          ) : (
            'Register & Continue to Checkout'
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
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

const AuthModalContent = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="p-6">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-primary" />
          {isLogin ? 'Sign In' : 'Sign Up'} to Checkout
        </DialogTitle>
      </DialogHeader>
      {isLogin ? (
        <LoginForm onSuccess={onSuccess} onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSuccess={onSuccess} onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeItem } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Debug cart items
  useEffect(() => {
    console.log('Cart items:', cartItems.map(item => ({ name: item.name, image: item.image, hasImage: !!item.image })));
  }, [cartItems]);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
  const shipping = 0; // Shipping cost calculated at checkout based on selected zone
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
      // Check if user is already logged in
      const token = localStorage.getItem('token');
      if (token) {
        // User is already logged in, go directly to checkout
        console.log('User already logged in, navigating to checkout');
        navigate("/checkout");
      } else {
        // User not logged in, show auth modal
        console.log('User not logged in, showing auth modal');
        setShowAuthModal(true);
      }
    }
  };

  const handleAuthSuccess = () => {
    console.log('handleAuthSuccess called');
    setShowAuthModal(false);
    navigate("/checkout");
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
                      src={item.image || '/fallback-image.jpg'}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/fallback-image.jpg';
                      }}
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

              <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full text-lg py-6"
                    size="lg"
                    onClick={handleProceedToCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
                  <AuthModalContent onSuccess={handleAuthSuccess} />
                </DialogContent>
              </Dialog>

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