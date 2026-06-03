// import { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Leaf, Shield, Heart, Star, Truck, RotateCcw, Award, Plus, Minus, ShoppingCart, Check, ArrowLeft, XCircle, User, Eye, EyeOff, Loader2 } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { productsData } from "@/lib/products";
// import { buildApiUrl, API_CONFIG } from "@/lib/config";
// import { useCart } from "@/context/CartContext";
// import { useMaterialToast } from "@/hooks/useMaterialToast";
// import { useUserAuth } from "@/context/UserAuthContext";

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
//   const { setToken } = useUserAuth();
//   const navigate = useNavigate();
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
//       const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         const accessToken = data.data?.accessToken;
//         const refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
//         const accessTokenExpires = data.data?.accessTokenExpires;
//         const refreshTokenExpires = data.data?.refreshTokenExpires;
//         if (accessToken) {
//           setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
//         }
//         setMessage({ text: 'Login successful!', type: 'success' });
//         setTimeout(() => {
//           onSuccess();
//         }, 1500);
//       } else {
//         setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
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
//           <div className="mt-2 flex items-center justify-between">
//             <Button 
//               type="button" 
//               variant="link" 
//               size="sm" 
//               className="h-auto p-0 text-primary hover:text-primary/80 underline text-xs font-medium" 
//               onClick={() => navigate('/forgot-password')}
//             >
//               Forgot password?
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
//               Signing In...
//             </>
//           ) : (
//             'Sign In'
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
//   const { setToken } = useUserAuth();
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
//       const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/register', {
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

//       if (response.ok && data.success) {
//         let accessToken = data.data?.accessToken;
//         let refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
//         let accessTokenExpires = data.data?.accessTokenExpires;
//         let refreshTokenExpires = data.data?.refreshTokenExpires;
        
//         if (!accessToken) {
//           const loginRes = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email: formData.email, password: formData.password }),
//           });
//           const loginData = await loginRes.json();
//           if (loginRes.ok && loginData.success) {
//             accessToken = loginData.data.accessToken;
//             refreshToken = loginData.data.refreshToken || loginData.refreshToken || loginData.refresh_token;
//             accessTokenExpires = loginData.data?.accessTokenExpires;
//             refreshTokenExpires = loginData.data?.refreshTokenExpires;
//           }
//         }
//         if (accessToken) {
//           setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
//         }
//         setMessage({ text: 'Registration successful!', type: 'success' });
//         setTimeout(() => {
//           onSuccess();
//         }, 1500);
//       } else {
//         setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Register error:', error);
//       setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
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
//             'Register'
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
//           {isLogin ? 'Sign In' : 'Sign Up'} to Write a Review
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

// const ProductDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [reviewRating, setReviewRating] = useState<number>(0);
//   const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
//   const [averageRating, setAverageRating] = useState<number>(0);
//   const [totalReviews, setTotalReviews] = useState<number>(0);
//   const [hasReviewed, setHasReviewed] = useState<boolean>(false);
//   const [apiProduct, setApiProduct] = useState(null);
//   const [apiImages, setApiImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const { addToCart } = useCart();
//   const { toast } = useMaterialToast();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://bloom-backend-2.onrender.com/api/v1/products/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success && data.data) {
//             setApiProduct(data.data.product);
//             setApiImages(data.data.images || []);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const product = apiProduct || (productsData as any)[id];

//   const initialImageFromState = location.state?.image;

//   const displayImages = useMemo(() => {
//     if (!product) return [];

//     if (apiImages.length > 0) {
//       const imageUrls = apiImages.map(img => img.image_url).filter(Boolean);
//       console.log('API Images:', imageUrls);
//       return imageUrls.slice(0, 4);
//     }

//     if (initialImageFromState) {
//       return Array(4).fill(initialImageFromState);
//     }

//     const base = (product.images || []).filter(Boolean);
//     const imageUrls = base.map(img => (typeof img === 'string' ? img : img?.image_url)).filter(Boolean);
//     console.log('Local Images:', imageUrls);
//     return imageUrls.slice(0, 4);
//   }, [product, apiProduct, apiImages, initialImageFromState]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   useEffect(() => {
//     if (displayImages.length > 0 && selectedImage >= displayImages.length) {
//       setSelectedImage(0);
//     }
//   }, [displayImages, selectedImage]);

//   // Fetch reviews stats for this product (must be before any early returns to keep hook order stable)
//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!id) return;
//       try {
//         const res = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_PRODUCT}/${id}`));
//         if (!res.ok) return;
//         const data = await res.json().catch(() => ({}));
//         if (data?.success && data?.data?.stats) {
//           setAverageRating(Number(data.data.stats.average_rating) || 0);
//           setTotalReviews(Number(data.data.stats.total_reviews) || 0);
//         }

//         // Determine if current user has already reviewed
//         if (typeof window !== 'undefined') {
//           const tokenLocal = localStorage.getItem('token');
//           if (tokenLocal && data?.data?.reviews?.length) {
//             try {
//               const meRes = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME), {
//                 headers: { 'Authorization': `Bearer ${tokenLocal}` },
//               });
//               const meData = await meRes.json().catch(() => ({}));
//               const currentEmail = meData?.data?.email || meData?.email;
//               const currentUserId = meData?.data?.user_id || meData?.user_id || meData?.id;
//               const reviewed = data.data.reviews.some((r: any) =>
//                 (currentUserId && r.user_id === currentUserId) || (currentEmail && r.email === currentEmail)
//               );
//               setHasReviewed(!!reviewed);
//             } catch {}
//           } else {
//             setHasReviewed(false);
//           }
//         }
//       } catch (e) {
//         console.error('Failed to fetch reviews', e);
//       }
//     };
//     fetchReviews();
//   }, [id]);

//   const transformedProduct = useMemo(() => {
//     if (!product) return null;

//     if (apiProduct) {
//       const imageUrls = apiImages.map(img => img.image_url).filter(Boolean);
//       return {
//         ...product,
//         images: imageUrls.length > 0 ? imageUrls : [],
//         price: parseFloat(product.price) * 100,
//         originalPrice: parseFloat(product.price) * 100 * 1.2,
//         inStock: product.stock_quantity > 0,
//         stockQuantity: product.stock_quantity,
//         category: 'Category',
//         rating: 4.5,
//         reviews: 0,
//         shortDescription: product.description || '',
//         description: product.description || '',
//         advantages: [],
//         benefits: [],
//         nutritionInfo: [],
//         certifications: [],
//         usage: []
//       };
//     }

//     return product;
//   }, [product, apiProduct, apiImages]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <h1 className="text-3xl font-bold mb-4">Loading...</h1>
//           <p className="text-muted-foreground">Loading product details...</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!transformedProduct) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
//           <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
//           <Button onClick={() => navigate("/")}>Return to Home</Button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleQuantityChange = (action) => {
//     if (action === "increase") {
//       setQuantity(prev => prev + 1);
//     } else if (action === "decrease" && quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!id || !transformedProduct) return;
//     const imageForCart = displayImages[selectedImage] || displayImages[0] || '/fallback-image.jpg';
//     console.log('Adding to cart with image:', imageForCart);
//     addToCart({ id, name: transformedProduct.name, price: transformedProduct.price, image: imageForCart }, quantity);
//   };

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


//   const handleAuthSuccess = () => {
//     setShowAuthModal(false);
//     // User is now logged in, can continue with review
//   };

//   const submitReview = async () => {
//     if (!token) {
//       setShowAuthModal(true);
//       return;
//     }
//     if (!id || !reviewRating) return;
//     try {
//       setIsSubmittingReview(true);
//       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.REVIEWS.CREATE), {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           product_id: id,
//           rating: reviewRating,
//           // comment omitted for star-only reviews
//         }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok || !data.success) {
//         throw new Error(data.message || 'Failed to submit review');
//       }
//       setReviewRating(0);
//       // Refresh reviews to update average
//       try {
//         const refresh = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_PRODUCT}/${id}`));
//         const refreshData = await refresh.json().catch(() => ({}));
//         if (refreshData?.success && refreshData?.data?.stats) {
//           setAverageRating(Number(refreshData.data.stats.average_rating) || 0);
//           setTotalReviews(Number(refreshData.data.stats.total_reviews) || 0);
//         }
//         setHasReviewed(true);
//       } catch {}
//       toast({ description: 'Review submitted successfully', variant: 'success', duration: 3000 });
//     } catch (e: any) {
//       console.error(e);
//       toast({ description: e?.message || 'Failed to submit review', variant: 'destructive', duration: 3000 });
//     } finally {
//       setIsSubmittingReview(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Shop
//         </Button>
//         <div className="text-sm text-muted-foreground mb-6">
//           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
//           <span className="mx-2">/</span>
//           <span className="hover:text-primary cursor-pointer">Shop</span>
//           <span className="mx-2">/</span>
//           <span className="hover:text-primary cursor-pointer">{transformedProduct.category}</span>
//           <span className="mx-2">/</span>
//           <span className="text-foreground">{transformedProduct.name}</span>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           <div className="space-y-4 order-1">
//             <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
//               {displayImages.length > 0 && displayImages[selectedImage] ? (
//                 <img
//                   src={displayImages[selectedImage]}
//                   alt={transformedProduct.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     console.error('Image failed to load:', displayImages[selectedImage]);
//                     e.currentTarget.src = '/fallback-image.jpg';
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-secondary">
//                   <span className="text-muted-foreground">No image available</span>
//                 </div>
//               )}
//               {!transformedProduct.inStock && (
//                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                   <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
//                 </div>
//               )}
//             </div>
//             {displayImages.length > 0 && (
//               <div className="grid grid-cols-4 gap-3">
//                 {displayImages.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
//                       selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Product view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         console.error('Thumbnail failed to load:', image);
//                         e.currentTarget.src = '/fallback-image.jpg';
//                       }}
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="order-2">
//             <div className="flex items-start justify-between mb-3">
//               <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
//                 {transformedProduct.category}
//               </Badge>
//               {transformedProduct.inStock ? (
//                 <Badge variant="outline" className="border-green-500 text-green-600">
//                   <Check className="w-3 h-3 mr-1" />
//                   In Stock
//                 </Badge>
//               ) : (
//                 <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50">
//                   <XCircle className="w-3 h-3 mr-1" />
//                   Out of Stock
//                 </Badge>
//               )}
//             </div>
//             <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
//               {transformedProduct.name}
//             </h1>
//             <div className="flex items-center gap-2 mb-3">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => {
//                   const fillPercent = Math.max(0, Math.min(100, (averageRating - i) * 100));
//                   return (
//                     <div key={i} className="relative w-5 h-5">
//                       <Star className="w-5 h-5 text-gray-300" />
//                       <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
//                         <Star className="w-5 h-5 fill-primary text-primary" />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <span className="text-xs text-muted-foreground">
//                 {averageRating.toFixed(1)} ({totalReviews} reviews)
//               </span>
//             </div>
//             <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
//               {transformedProduct.shortDescription}
//             </p>
//             <div className="flex items-baseline gap-2 mb-5">
//               <span className="text-3xl md:text-4xl font-bold text-foreground">
//                 Ksh {(transformedProduct.price / 100).toFixed(2)}
//               </span>
//               <span className="text-lg md:text-xl text-muted-foreground line-through">
//                 Ksh {(transformedProduct.originalPrice / 100).toFixed(2)}
//               </span>
//               <Badge variant="destructive" className="ml-2">
//                 Save {Math.round(((transformedProduct.originalPrice - transformedProduct.price) / transformedProduct.originalPrice) * 100)}%
//               </Badge>
//             </div>
//             <div className="flex flex-wrap gap-2 mb-5">
//               {transformedProduct.certifications.map((cert, index) => (
//                 <Badge key={index} variant="outline" className="border-primary/30 text-primary text-xs md:text-sm py-1">
//                   <Leaf className="w-3 h-3 mr-1" />
//                   {cert}
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
//               <div className="flex items-center border border-border rounded-lg flex-shrink-0">
//                 <button
//                   onClick={() => handleQuantityChange("decrease")}
//                   className="p-3 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={quantity <= 1 || !transformedProduct.inStock}
//                   aria-label="Decrease quantity"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-6 py-3 font-semibold">{quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange("increase")}
//                   className="p-3 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!transformedProduct.inStock}
//                   aria-label="Increase quantity"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
//                 <Button
//                   size="lg"
//                   className="text-lg py-6 rounded-lg w-full sm:flex-1 sm:w-auto"
//                   disabled={!transformedProduct.inStock}
//                   onClick={handleAddToCart}
//                 >
//                   {transformedProduct.inStock ? (
//                     <>
//                       <ShoppingCart className="w-5 h-5 mr-2" />
//                       Add to Cart
//                     </>
//                   ) : (
//                     <>
//                       <XCircle className="w-5 h-5 mr-2" />
//                       Out of Stock
//                     </>
//                   )}
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="text-lg py-6 rounded-lg w-full sm:w-auto whitespace-nowrap"
//                   onClick={() => navigate("/cart")}
//                 >
//                   <ShoppingCart className="w-5 h-5 mr-2" />
//                   View Cart
//                 </Button>
//               </div>
//             </div>
//             {/* Write a Review (only for logged-in users and not yet reviewed) */}
//             {!hasReviewed && (
//             <div className="mt-4 border-t border-border pt-4">
//               <h3 className="text-sm font-semibold text-foreground mb-2">Write a review</h3>
//               {token ? (
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-muted-foreground">Your rating:</span>
//                     <div className="flex items-center gap-1">
//                       {[1,2,3,4,5].map(r => (
//                         <button
//                           key={r}
//                           onClick={() => setReviewRating(r)}
//                           aria-label={`Rate ${r} star${r>1?'s':''}`}
//                           className="p-1"
//                         >
//                           <Star className={`w-6 h-6 ${r <= reviewRating ? 'fill-primary text-primary' : 'text-gray-300'}`} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <Button
//                     size="sm"
//                     disabled={isSubmittingReview || reviewRating === 0}
//                     onClick={submitReview}
//                   >
//                     {isSubmittingReview ? 'Submitting...' : 'Submit Rating'}
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="text-xs text-muted-foreground">
//                   Please <button className="text-primary underline" onClick={() => setShowAuthModal(true)}>log in</button> to write a review.
//                 </div>
//               )}
//             </div>
//             )}

//             <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
//               <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
//                 <AuthModalContent onSuccess={handleAuthSuccess} />
//               </DialogContent>
//             </Dialog>

//             <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
//               <div className="flex flex-col items-center text-center p-3">
//                 <Truck className="w-6 h-6 text-primary mb-2" />
//                 <span className="text-xs font-medium">Zone-based Shipping</span>
//                 <span className="text-xs text-muted-foreground">Calculated at checkout</span>
//               </div>
//               <div className="flex flex-col items-center text-center p-3">
//                 <RotateCcw className="w-6 h-6 text-primary mb-2" />
//                 <span className="text-xs font-medium">Easy Returns</span>
//                 <span className="text-xs text-muted-foreground">30-day guarantee</span>
//               </div>
//               <div className="flex flex-col items-center text-center p-3">
//                 <Shield className="w-6 h-6 text-primary mb-2" />
//                 <span className="text-xs font-medium">Secure Payment</span>
//                 <span className="text-xs text-muted-foreground">100% protected</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className="space-y-12">
//           <section>
//             <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
//               Product Description
//             </h2>
//             <p className="text-muted-foreground leading-relaxed text-lg">
//               {transformedProduct.description}
//             </p>
//           </section>
          
          
//         </div> */}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Leaf, Shield, Star, Truck, RotateCcw, Plus, Minus, ShoppingCart, Check, ArrowLeft, XCircle, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productsData } from "@/lib/products";
import { buildApiUrl, API_CONFIG } from "@/lib/config";
import { useCart } from "@/context/CartContext";
import { useMaterialToast } from "@/hooks/useMaterialToast";
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

// ============================================================
// LoginForm
// ============================================================
const LoginForm = ({ onSuccess, onSwitchToSignup }: { onSuccess: () => void; onSwitchToSignup: () => void }) => {
  const { setToken } = useUserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const accessToken = data.data?.accessToken;
        const refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
        const accessTokenExpires = data.data?.accessTokenExpires;
        const refreshTokenExpires = data.data?.refreshTokenExpires;
        if (accessToken) setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
        setMessage({ text: 'Login successful!', type: 'success' });
        setTimeout(() => onSuccess(), 1500);
      } else {
        setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
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
            id="email" name="email" type="email" required
            value={formData.email} onChange={handleChange}
            className="mt-1 bg-background border-border"
            placeholder="Enter your email address"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password" name="password"
              type={showPassword ? "text" : "password"}
              required minLength={6}
              value={formData.password} onChange={handleChange}
              className="mt-1 bg-background border-border pr-10"
              placeholder="Enter your password"
            />
            <Button type="button" variant="ghost" size="sm"
              className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <Button type="button" variant="link" size="sm"
            className="h-auto p-0 mt-2 text-primary underline text-xs font-medium"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </Button>
        </div>
        {message && (
          <div className={`p-3 rounded-md text-sm text-center ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-destructive/10 border border-destructive/30 text-destructive'
          }`}>
            {message.text}
          </div>
        )}
        <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold" size="lg">
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing In...</> : 'Sign In'}
        </Button>
      </form>
      <div className="text-center pt-6">
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mb-4">Don't have an account?</p>
        <Button variant="outline" onClick={onSwitchToSignup} className="px-8">Sign Up</Button>
      </div>
    </>
  );
};

// ============================================================
// SignupForm
// ============================================================
const SignupForm = ({ onSuccess, onSwitchToLogin }: { onSuccess: () => void; onSwitchToLogin: () => void }) => {
  const { setToken } = useUserAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName, lastName: formData.lastName,
          email: formData.email, password: formData.password,
          phone: formData.phone, confirmPassword: formData.confirmPassword,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        let accessToken = data.data?.accessToken;
        let refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
        let accessTokenExpires = data.data?.accessTokenExpires;
        let refreshTokenExpires = data.data?.refreshTokenExpires;
        if (!accessToken) {
          const loginRes = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.success) {
            accessToken = loginData.data.accessToken;
            refreshToken = loginData.data.refreshToken || loginData.refreshToken || loginData.refresh_token;
            accessTokenExpires = loginData.data?.accessTokenExpires;
            refreshTokenExpires = loginData.data?.refreshTokenExpires;
          }
        }
        if (accessToken) setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
        setMessage({ text: 'Registration successful!', type: 'success' });
        setTimeout(() => onSuccess(), 1500);
      } else {
        setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {[
          { id: 'firstName', label: 'First Name', placeholder: 'Enter your first name' },
          { id: 'lastName', label: 'Last Name', placeholder: 'Enter your last name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address' },
          { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'e.g., 254114096574' },
        ].map(({ id, label, type = 'text', placeholder }) => (
          <div key={id}>
            <Label htmlFor={id} className="text-sm font-medium text-foreground">
              {label} <span className="text-destructive">*</span>
            </Label>
            <Input
              id={id} name={id} type={type} required
              value={(formData as any)[id]} onChange={handleChange}
              className="mt-1 bg-background border-border"
              placeholder={placeholder}
            />
          </div>
        ))}
        {[
          { id: 'password', show: showPassword, toggle: () => setShowPassword(!showPassword), label: 'Password' },
          { id: 'confirmPassword', show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword), label: 'Confirm Password' },
        ].map(({ id, show, toggle, label }) => (
          <div key={id}>
            <Label htmlFor={id} className="text-sm font-medium text-foreground">
              {label} <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id={id} name={id} type={show ? "text" : "password"}
                required minLength={6}
                value={(formData as any)[id]} onChange={handleChange}
                className="mt-1 bg-background border-border pr-10"
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              <Button type="button" variant="ghost" size="sm"
                className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                onClick={toggle}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ))}
        {message && (
          <div className={`p-3 rounded-md text-sm text-center ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-destructive/10 border border-destructive/30 text-destructive'
          }`}>
            {message.text}
          </div>
        )}
        <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold" size="lg">
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Registering...</> : 'Register'}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
      <div className="text-center pt-6">
        <Separator className="my-4" />
        <p className="text-sm text-muted-foreground mb-4">Already have an account?</p>
        <Button variant="outline" onClick={onSwitchToLogin} className="px-8">Sign In</Button>
      </div>
    </>
  );
};

// ============================================================
// AuthModalContent
// ============================================================
const AuthModalContent = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="p-6">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-primary" />
          {isLogin ? 'Sign In' : 'Sign Up'} to Write a Review
        </DialogTitle>
      </DialogHeader>
      {isLogin
        ? <LoginForm onSuccess={onSuccess} onSwitchToSignup={() => setIsLogin(false)} />
        : <SignupForm onSuccess={onSuccess} onSwitchToLogin={() => setIsLogin(true)} />
      }
    </div>
  );
};

// ============================================================
// ProductDetail
// ============================================================
const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [apiProduct, setApiProduct] = useState(null);
  const [apiImages, setApiImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useMaterialToast();

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://bloom-backend-2.onrender.com/api/v1/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setApiProduct(data.data.product);
            setApiImages(data.data.images || []);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      try {
        const res = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_PRODUCT}/${id}`));
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        if (data?.success && data?.data?.stats) {
          setAverageRating(Number(data.data.stats.average_rating) || 0);
          setTotalReviews(Number(data.data.stats.total_reviews) || 0);
        }
        if (typeof window !== 'undefined') {
          const tokenLocal = localStorage.getItem('token');
          if (tokenLocal && data?.data?.reviews?.length) {
            try {
              const meRes = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME), {
                headers: { 'Authorization': `Bearer ${tokenLocal}` },
              });
              const meData = await meRes.json().catch(() => ({}));
              const currentEmail = meData?.data?.email || meData?.email;
              const currentUserId = meData?.data?.user_id || meData?.user_id || meData?.id;
              const reviewed = data.data.reviews.some((r: any) =>
                (currentUserId && r.user_id === currentUserId) || (currentEmail && r.email === currentEmail)
              );
              setHasReviewed(!!reviewed);
            } catch {}
          } else {
            setHasReviewed(false);
          }
        }
      } catch (e) {
        console.error('Failed to fetch reviews', e);
      }
    };
    fetchReviews();
  }, [id]);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = apiProduct || (productsData as any)[id];
  const initialImageFromState = location.state?.image;

  const displayImages = useMemo(() => {
    if (!product) return [];
    if (apiImages.length > 0) {
      return apiImages.map((img: any) => img.image_url).filter(Boolean).slice(0, 4);
    }
    if (initialImageFromState) return Array(4).fill(initialImageFromState);
    const base = (product.images || []).filter(Boolean);
    return base.map((img: any) => (typeof img === 'string' ? img : img?.image_url)).filter(Boolean).slice(0, 4);
  }, [product, apiProduct, apiImages, initialImageFromState]);

  const transformedProduct = useMemo(() => {
    if (!product) return null;
    if (apiProduct) {
      const imageUrls = apiImages.map((img: any) => img.image_url).filter(Boolean);
      return {
        ...product,
        images: imageUrls.length > 0 ? imageUrls : [],
        price: parseFloat(product.price) * 100,
        originalPrice: parseFloat(product.price) * 100 * 1.2,
        inStock: product.stock_quantity > 0,
        stockQuantity: product.stock_quantity,
        category: 'Category',
        rating: 4.5,
        reviews: 0,
        shortDescription: product.description || '',
        description: product.description || '',
        advantages: [],
        benefits: [],
        nutritionInfo: [],
        certifications: [],
        usage: [],
      };
    }
    return product;
  }, [product, apiProduct, apiImages]);

  // ✅ TikTok ViewContent — fires when product data is ready
  useEffect(() => {
    if (!transformedProduct) return;
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('ViewContent', {
        content_id: id,
        content_name: transformedProduct.name,
        content_type: 'product',
        currency: 'KES',
        value: transformedProduct.price / 100,
      });
    }
  }, [transformedProduct?.name]);

  // Fix selected image index if images change
  useEffect(() => {
    if (displayImages.length > 0 && selectedImage >= displayImages.length) {
      setSelectedImage(0);
    }
  }, [displayImages, selectedImage]);

  // Loading / not found states
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!transformedProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") setQuantity(prev => prev + 1);
    else if (action === "decrease" && quantity > 1) setQuantity(prev => prev - 1);
  };

  // ✅ TikTok AddToCart — fires when user clicks Add to Cart
  const handleAddToCart = () => {
    if (!id || !transformedProduct) return;
    const imageForCart = displayImages[selectedImage] || displayImages[0] || '/fallback-image.jpg';
    addToCart({ id, name: transformedProduct.name, price: transformedProduct.price, image: imageForCart }, quantity);
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('AddToCart', {
        content_id: id,
        content_name: transformedProduct.name,
        content_type: 'product',
        currency: 'KES',
        value: (transformedProduct.price / 100) * quantity,
        quantity: quantity,
      });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const submitReview = async () => {
    if (!token) { setShowAuthModal(true); return; }
    if (!id || !reviewRating) return;
    try {
      setIsSubmittingReview(true);
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.REVIEWS.CREATE), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: id, rating: reviewRating }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to submit review');
      setReviewRating(0);
      try {
        const refresh = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_PRODUCT}/${id}`));
        const refreshData = await refresh.json().catch(() => ({}));
        if (refreshData?.success && refreshData?.data?.stats) {
          setAverageRating(Number(refreshData.data.stats.average_rating) || 0);
          setTotalReviews(Number(refreshData.data.stats.total_reviews) || 0);
        }
        setHasReviewed(true);
      } catch {}
      toast({ description: 'Review submitted successfully', variant: 'success', duration: 3000 });
    } catch (e: any) {
      toast({ description: e?.message || 'Failed to submit review', variant: 'destructive', duration: 3000 });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">Shop</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer">{transformedProduct.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{transformedProduct.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4 order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border">
              {displayImages.length > 0 && displayImages[selectedImage] ? (
                <img
                  src={displayImages[selectedImage]}
                  alt={transformedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/fallback-image.jpg'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
              {!transformedProduct.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>
            {displayImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
                      selectedImage === index ? "border-primary opacity-100" : "border-border opacity-60"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/fallback-image.jpg'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="order-2">
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                {transformedProduct.category}
              </Badge>
              {transformedProduct.inStock ? (
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Check className="w-3 h-3 mr-1" />In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50">
                  <XCircle className="w-3 h-3 mr-1" />Out of Stock
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              {transformedProduct.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const fillPercent = Math.max(0, Math.min(100, (averageRating - i) * 100));
                  return (
                    <div key={i} className="relative w-5 h-5">
                      <Star className="w-5 h-5 text-gray-300" />
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground">
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>

            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              {transformedProduct.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                Ksh {(transformedProduct.price / 100).toFixed(2)}
              </span>
              <span className="text-lg md:text-xl text-muted-foreground line-through">
                Ksh {(transformedProduct.originalPrice / 100).toFixed(2)}
              </span>
              <Badge variant="destructive" className="ml-2">
                Save {Math.round(((transformedProduct.originalPrice - transformedProduct.price) / transformedProduct.originalPrice) * 100)}%
              </Badge>
            </div>

            {/* Certifications */}
            {transformedProduct.certifications?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {transformedProduct.certifications.map((cert: string, index: number) => (
                  <Badge key={index} variant="outline" className="border-primary/30 text-primary text-xs md:text-sm py-1">
                    <Leaf className="w-3 h-3 mr-1" />{cert}
                  </Badge>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg flex-shrink-0">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || !transformedProduct.inStock}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!transformedProduct.inStock}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
                <Button
                  size="lg"
                  className="text-lg py-6 rounded-lg w-full sm:flex-1 sm:w-auto"
                  disabled={!transformedProduct.inStock}
                  onClick={handleAddToCart}
                >
                  {transformedProduct.inStock ? (
                    <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart</>
                  ) : (
                    <><XCircle className="w-5 h-5 mr-2" />Out of Stock</>
                  )}
                </Button>
                <Button
                  size="lg" variant="outline"
                  className="text-lg py-6 rounded-lg w-full sm:w-auto whitespace-nowrap"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />View Cart
                </Button>
              </div>
            </div>

            {/* Review Section */}
            {!hasReviewed && (
              <div className="mt-4 border-t border-border pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Write a review</h3>
                {token ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Your rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(r => (
                          <button key={r} onClick={() => setReviewRating(r)}
                            aria-label={`Rate ${r} star${r > 1 ? 's' : ''}`} className="p-1"
                          >
                            <Star className={`w-6 h-6 ${r <= reviewRating ? 'fill-primary text-primary' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" disabled={isSubmittingReview || reviewRating === 0} onClick={submitReview}>
                      {isSubmittingReview ? 'Submitting...' : 'Submit Rating'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Please{' '}
                    <button className="text-primary underline" onClick={() => setShowAuthModal(true)}>
                      log in
                    </button>{' '}
                    to write a review.
                  </div>
                )}
              </div>
            )}

            {/* Auth Modal */}
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
                <AuthModalContent onSuccess={handleAuthSuccess} />
              </DialogContent>
            </Dialog>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center p-3">
                <Truck className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Zone-based Shipping</span>
                <span className="text-xs text-muted-foreground">Calculated at checkout</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <RotateCcw className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Easy Returns</span>
                <span className="text-xs text-muted-foreground">30-day guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs font-medium">Secure Payment</span>
                <span className="text-xs text-muted-foreground">100% protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;