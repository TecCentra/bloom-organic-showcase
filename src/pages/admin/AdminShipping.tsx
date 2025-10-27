import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Edit,
  Copy,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getApiUrl } from '@/lib/config';

// Define interfaces for TypeScript
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
  email: string;
  first_name: string;
  last_name: string;
  items_count: string;
}

interface OrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  timestamp: string;
}

const AdminShipping: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const { adminToken } = useAdminAuth();

  // Fetch orders from API
  const fetchOrders = async () => {
    if (!adminToken) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(getApiUrl('ADMIN', 'ORDERS'), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();

       if (data.success) {
         console.log('📦 All orders:', data.data.orders);
         
         // Filter orders with shipping_method as 'delivery' AND not pickup addresses
         const deliveryOrders = data.data.orders.filter(
           (order) => 
             order.shipping_method === 'delivery' && 
             !order.shipping_address.toLowerCase().includes('pickup') &&
             !order.shipping_address.toLowerCase().includes('in-store')
         );
         
         console.log('🚚 Delivery orders after filter:', deliveryOrders);
         console.log('🚚 Delivery orders count:', deliveryOrders.length);
         
         // Log each order's shipping details for debugging
         deliveryOrders.forEach((order, index) => {
           console.log(`Order ${index + 1}:`, {
             order_id: order.order_id,
             shipping_method: order.shipping_method,
             shipping_address: order.shipping_address,
             customer: `${order.first_name} ${order.last_name}`
           });
         });
         
         setOrders(deliveryOrders);
       } else {
         throw new Error(data.message || 'Failed to fetch orders');
       }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to fetch orders',
      );
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    if (adminToken) {
      fetchOrders();
    }
  }, [adminToken]);

  // Filter orders based on search term
  // Filter orders based on search term
const filteredOrders = searchTerm.trim()
? orders.filter((order) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      order.order_id?.toLowerCase().includes(term) ||
      order.first_name?.toLowerCase().includes(term) ||
      order.last_name?.toLowerCase().includes(term) ||
      order.email?.toLowerCase().includes(term) ||
      order.shipping_address?.toLowerCase().includes(term) ||
      order.tracking_number?.toLowerCase().includes(term)
    );
  })
: orders;

  // Helper functions for UI
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    const className = statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 border-gray-200';
    return <Badge className={className}>{status}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
    };
    const className = statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 border-gray-200';
    return <Badge className={className}>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Event handlers
  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsUpdateStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus || !adminToken) return;

    try {
      // Simulate API call to update order status
      console.log('Updating order status:', selectedOrder.order_id, 'to', newStatus);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === selectedOrder.order_id
            ? { ...order, status: newStatus }
            : order,
        ),
      );

      setIsUpdateStatusModalOpen(false);
      setSelectedOrder(null);
      setNewStatus('');
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleRefreshOrders = () => {
    fetchOrders();
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId).then(() => {
      console.log('Order ID copied to clipboard:', orderId);
    });
  };

  // Render UI
  if (!adminToken) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delivery Orders</h1>
            <p className="text-gray-600 mt-2">
              Manage delivery orders and shipping status
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-gray-600">
              {/* <User className="h-12 w-12 mx-auto mb-4" /> */}
              <p className="text-lg font-medium">Authentication Required</p>
              <p className="text-sm">Please log in to view delivery orders.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Orders</h1>
          <p className="text-gray-600 mt-2">
            Manage delivery orders and shipping status
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefreshOrders}>
            <Package className="h-4 w-4 mr-2" />
            Refresh Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Delivery Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === 'processing').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === 'shipped').length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === 'delivered').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === 'cancelled').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search delivery orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <XCircle className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Error loading orders</p>
              <p className="text-sm">{error}</p>
              <Button onClick={handleRefreshOrders} className="mt-4">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading delivery orders...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      {!loading && !error && (
        <Card>
          <CardHeader>
              <CardTitle>
                Delivery Orders ({filteredOrders.length})
                <span className="text-sm font-normal text-blue-600 ml-2 bg-blue-50 px-2 py-1 rounded">
                  🚚 True delivery orders only (excludes pickup addresses)
                </span>
              </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold">Shipping Address</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Payment</TableHead>
                  <TableHead className="font-semibold">Tracking</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="font-mono text-sm" title={order.order_id}>
                          {order.order_id}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyOrderId(order.order_id)}
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {order.first_name} {order.last_name}
                        </div>
                        <div className="text-sm text-gray-600">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-semibold text-lg text-gray-900">
                          {order.items_count}
                        </div>
                        <div className="text-xs text-gray-500">items</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={order.shipping_address}>
                        {order.shipping_address}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">KSH {order.total_amount}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentStatusBadge(order.payment_status)}</TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{order.tracking_number}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(order.order_date)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(order)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Update Status Modal */}
      <Dialog
        open={isUpdateStatusModalOpen}
        onOpenChange={setIsUpdateStatusModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOrder && (
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Order ID</label>
                  <div className="text-sm text-gray-600 font-mono">
                    {selectedOrder.order_id}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Customer</label>
                  <div className="text-sm text-gray-600">
                    {selectedOrder.first_name} {selectedOrder.last_name}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Status</label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsUpdateStatusModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate}>Update Status</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminShipping;
