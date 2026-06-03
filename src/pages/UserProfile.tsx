import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Shield,
  ShoppingBag,
  MapPin,
  LogOut,
  Loader2,
  ArrowLeft,
  Calendar,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Ban,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMaterialToast } from "@/hooks/useMaterialToast";
import { useUserAuth } from "@/context/UserAuthContext";
import { buildApiUrl, API_CONFIG } from "@/lib/config";

interface UserData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone?: string;
  created_at?: string;
}

interface OrderItem {
  order_item_id: string;
  product_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  product_image: string;
}

interface Order {
  order_id: string;
  user_id: string;
  order_date: string;
  status: string;
  total_amount: string;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  payment_status: string;
  tracking_number: string;
  created_at: string;
  updated_at: string;
  shipping_method: string;
  items_count: string;
  items: OrderItem[];
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useMaterialToast();
  const { removeToken } = useUserAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cancellation modal states
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Password update states
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/signup');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Profile response:', data);

        if (response.ok && data.success) {
          setUser(data.data?.user);
        } else {
          throw new Error(data.message || 'Failed to fetch profile');
        }
      } catch (err: any) {
        console.error('Profile fetch error:', err);
        setError(err.message);
        // Redirect to signup if unauthorized
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) return;

      try {
        setIsLoadingOrders(true);
        const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/orders?status=&page=1&limit=10', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Orders response:', data);

        if (response.ok && data.success) {
          setOrders(data.data?.orders || []);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (err: any) {
        console.error('Orders fetch error:', err);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.newPasswordConfirm) {
      toast({ description: "Please fill in all password fields", variant: "destructive", duration: 3000 });
      return;
    }

    if (passwordData.newPassword !== passwordData.newPasswordConfirm) {
      toast({ description: "New passwords do not match", variant: "destructive", duration: 3000 });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({ description: "New password must be at least 6 characters long", variant: "destructive", duration: 3000 });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({ description: "You must be logged in to update your password", variant: "destructive", duration: 3000 });
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PASSWORD), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          newPasswordConfirm: passwordData.newPasswordConfirm
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({ description: "Password updated successfully", duration: 3000 });
        setPasswordModalOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });
      } else {
        toast({ description: data.message || "Failed to update password", variant: "destructive", duration: 3000 });
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast({ description: "An error occurred while updating your password", variant: "destructive", duration: 3000 });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case 'customer':
        return <Badge className="bg-blue-100 text-blue-800">Customer</Badge>;
      case 'moderator':
        return <Badge className="bg-purple-100 text-purple-800">Moderator</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">User</Badge>;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" />Delivered</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800"><Truck className="w-3 h-3 mr-1" />Shipped</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  // Check if order can be cancelled (not delivered, shipped, or already cancelled)
  const canCancelOrder = (order: Order) => {
    const nonCancellableStatuses = ['delivered', 'shipped', 'cancelled'];
    return !nonCancellableStatuses.includes(order.status.toLowerCase());
  };

  // Open cancel modal
  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelReason("");
    setCancelModalOpen(true);
  };

  // Submit cancellation request
  const handleCancelOrder = async () => {
    if (!selectedOrderId || !cancelReason.trim()) {
      toast({ description: "Please provide a reason for cancellation", variant: "destructive", duration: 3000 });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({ description: "You must be logged in to cancel orders", variant: "destructive", duration: 3000 });
      return;
    }

    try {
      setIsCancelling(true);
      const response = await fetch(
        `https://bloom-backend-2.onrender.com/api/v1/orders/${selectedOrderId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: cancelReason.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast({ description: "Order cancellation request submitted successfully", duration: 3000 });

        // Update the order status in the local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.order_id === selectedOrderId
              ? { ...order, status: 'cancelled' }
              : order
          )
        );

        // Close modal and reset states
        setCancelModalOpen(false);
        setSelectedOrderId(null);
        setCancelReason("");
      } else {
        toast({ description: data.message || "Failed to cancel order", variant: "destructive", duration: 3000 });
      }
    } catch (error: any) {
      console.error('Error cancelling order:', error);
      toast({ description: "An error occurred while cancelling the order", variant: "destructive", duration: 3000 });
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'Unable to load profile. Redirecting to login...'}
            </p>
            <Button onClick={() => navigate('/signup')}>Go to Login</Button>
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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <Button 
                variant="ghost" 
                size="sm"
                className="mb-2"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground mt-1">Manage your account and view your orders</p>
            </div>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info (1/3 width on large screens) */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Info Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                      {user.first_name} {user.last_name}
                    </h2>
                    <div className="mb-3">
                      {getRoleBadge(user.role)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      User ID: <span className="font-mono text-xs">{user.user_id.slice(0, 8)}...</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Email Address</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium break-all">{user.email}</span>
                      </div>
                    </div>
                    
                    {user.phone && (
                      <div className="pb-4 border-b">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Phone Number</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{user.phone}</span>
                        </div>
                      </div>
                    )}
                    
                    {user.created_at && (
                      <div className="pb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Member Since</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {new Date(user.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                        <p className="text-xl font-bold">{orders.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Completed</p>
                        <p className="text-xl font-bold text-green-600">
                          {orders.filter(o => o.payment_status === 'completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                        <p className="text-lg font-bold text-primary">
                          Ksh {orders.filter(o => o.payment_status === 'completed')
                            .reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
                            .toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setPasswordModalOpen(true)}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View My Cart
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/products')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                  {user.role?.toLowerCase() === 'admin' && (
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => navigate('/admin')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order History (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    Order History
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    View and manage your recent orders
                  </p>
                </CardHeader>
                <CardContent>
              {isLoadingOrders ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Button onClick={() => navigate('/products')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.order_id} className="border-2">
                      <CardContent className="pt-6">
                        {/* Order Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-mono font-semibold">{order.tracking_number}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {getOrderStatusBadge(order.status)}
                            {getPaymentStatusBadge(order.payment_status)}
                          </div>
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b">
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Order Date
                            </p>
                            <p className="font-medium">
                              {new Date(order.order_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <CreditCard className="w-4 h-4" />
                              Total Amount
                            </p>
                            <p className="font-bold text-lg text-primary">
                              Ksh {parseFloat(order.total_amount).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              {order.shipping_method === 'pickup' ? (
                                <Package className="w-4 h-4" />
                              ) : (
                                <Truck className="w-4 h-4" />
                              )}
                              Delivery Method
                            </p>
                            <p className="font-medium capitalize">{order.shipping_method}</p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <p className="text-sm font-semibold mb-2">Items ({order.items_count})</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.order_item_id} className="flex items-center gap-3 p-2 bg-secondary/30 rounded-lg">
                                <div className="w-12 h-12 bg-background rounded flex items-center justify-center">
                                  {item.product_image ? (
                                    <img 
                                      src={item.product_image} 
                                      alt={item.product_name}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  ) : (
                                    <Package className="w-6 h-6 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{item.product_name}</p>
                                  <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">x{item.quantity}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Ksh {item.unit_price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Shipping Address
                          </p>
                          <p className="text-sm">{order.shipping_address}</p>
                        </div>

                        {/* Cancel Order Button */}
                        {canCancelOrder(order) && (
                          <div className="mt-4 pt-4 border-t">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelClick(order.order_id)}
                              className="w-full md:w-auto"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Request Cancellation
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password *</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password *</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password *</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={passwordData.newPasswordConfirm}
                  onChange={(e) => setPasswordData({ ...passwordData, newPasswordConfirm: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setPasswordModalOpen(false);
                setPasswordData({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });
                setShowPasswords({ current: false, new: false, confirm: false });
              }}
              disabled={isUpdatingPassword}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordUpdate}
              disabled={isUpdatingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.newPasswordConfirm}
            >
              {isUpdatingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Modal */}
      <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this order. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="cancel-reason" className="text-sm font-medium">
                Cancellation Reason <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="cancel-reason"
                placeholder="e.g., Changed my mind about the purchase"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Please be specific about why you want to cancel this order.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCancelModalOpen(false);
                setCancelReason("");
                setSelectedOrderId(null);
              }}
              disabled={isCancelling}
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelOrder}
              disabled={isCancelling || !cancelReason.trim()}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <Ban className="w-4 h-4 mr-2" />
                  Cancel Order
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default UserProfile;

