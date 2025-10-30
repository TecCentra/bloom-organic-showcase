// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { 
//   Search, 
//   Eye, 
//   Package,
//   Truck,
//   CheckCircle,
//   Clock,
//   XCircle,
//   Loader2,
//   RefreshCw
// } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { useAdminAuth } from '@/context/AdminAuthContext';
// import { buildApiUrl, API_CONFIG } from '@/lib/config';

// interface Order {
//   order_id: string;
//   user_id: string;
//   order_date: string;
//   status: string;
//   total_amount: string;
//   shipping_address: string;
//   billing_address: string;
//   payment_method: string;
//   payment_status: string;
//   tracking_number: string;
//   created_at: string;
//   updated_at: string;
//   shipping_method: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   items_count: string;
// }

// interface OrdersResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     orders: Order[];
//     pagination: {
//       page: number;
//       limit: number;
//       total: number;
//       pages: number;
//     };
//   };
//   timestamp: string;
// }

// const AdminOrders: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [pagination, setPagination] = useState<any>(null);
//   const { adminToken } = useAdminAuth();

//   useEffect(() => {
//     if (adminToken) {
//       fetchOrders();
//     }
//   }, [adminToken]);

//   const fetchOrders = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}?page=1&limit=10&status=&start_date=&end_date=`), {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${adminToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data: OrdersResponse = await response.json();
//         setOrders(data.data.orders);
//         setPagination(data.data.pagination);
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         setError(errorData.message || 'Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError('An error occurred while fetching orders');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
//       case 'processing':
//         return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
//       case 'shipped':
//         return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
//       case 'pending':
//         return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
//       case 'cancelled':
//         return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
//       default:
//         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return <CheckCircle className="h-4 w-4 text-green-600" />;
//       case 'processing':
//         return <Package className="h-4 w-4 text-blue-600" />;
//       case 'shipped':
//         return <Truck className="h-4 w-4 text-purple-600" />;
//       case 'pending':
//         return <Clock className="h-4 w-4 text-yellow-600" />;
//       case 'cancelled':
//         return <XCircle className="h-4 w-4 text-red-600" />;
//       default:
//         return <Clock className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = 
//       order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   const handleViewOrder = (order: any) => {
//     setSelectedOrder(order);
//     setIsOrderModalOpen(true);
//   };

//   const handleStatusUpdate = async (orderId: string, newStatus: string) => {
//     try {
//       if (!adminToken) return;
//       const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}/${orderId}/status`), {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${adminToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || 'Failed to update order status');
//       }

//       // Optimistically update local state
//       setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
//     } catch (err) {
//       console.error('Error updating order status:', err);
//       setError(err instanceof Error ? err.message : 'Failed to update order status');
//     }
//   };

//   const orderStats = {
//     total: orders.length,
//     completed: orders.filter(o => o.status === 'completed').length,
//     processing: orders.filter(o => o.status === 'processing').length,
//     pending: orders.filter(o => o.status === 'pending').length,
//     totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
//           <p className="text-gray-600 text-sm">Manage customer orders and fulfillment</p>
//         </div>
//         <Button 
//           onClick={fetchOrders} 
//           variant="outline" 
//           size="sm"
//           disabled={isLoading}
//         >
//           <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
//           Refresh
//         </Button>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Order Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
//             <p className="text-xs text-gray-600">Total Orders</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-xl font-bold text-green-600">{orderStats.completed}</div>
//             <p className="text-xs text-gray-600">Completed</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-xl font-bold text-blue-600">{orderStats.processing}</div>
//             <p className="text-xs text-gray-600">Processing</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-xl font-bold text-yellow-600">{orderStats.pending}</div>
//             <p className="text-xs text-gray-600">Pending</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-xl font-bold text-emerald-600">KSH {orderStats.totalRevenue.toFixed(2)}</div>
//             <p className="text-xs text-gray-600">Total Revenue</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search orders..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="processing">Processing</option>
//               <option value="shipped">Shipped</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Orders Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             All Orders ({filteredOrders.length})
//             {pagination && (
//               <span className="text-sm text-gray-500 ml-2">
//                 (Page {pagination.page} of {pagination.pages}, Total: {pagination.total})
//               </span>
//             )}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex items-center justify-center py-8">
//               <Loader2 className="h-6 w-6 animate-spin mr-2" />
//               <span>Loading orders...</span>
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Total</TableHead>
//                   <TableHead>Items</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Payment</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredOrders.map((order) => (
//                   <TableRow key={order.order_id}>
//                     <TableCell className="font-medium">
//                       <div>
//                         <div className="text-sm">{order.order_id}</div>
//                         <div className="text-xs text-gray-500">{order.tracking_number}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div>
//                         <div className="font-medium">{order.first_name} {order.last_name}</div>
//                         <div className="text-sm text-gray-600">{order.email}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>KSH {parseFloat(order.total_amount).toFixed(2)}</TableCell>
//                     <TableCell>{order.items_count}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-2">
//                         {getStatusIcon(order.status)}
//                         {getStatusBadge(order.status)}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <Badge 
//                           variant="outline" 
//                           className={order.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}
//                         >
//                           {order.payment_status}
//                         </Badge>
//                         <span className="text-xs text-gray-500 mt-1">{order.payment_method}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="text-sm">
//                         {new Date(order.order_date).toLocaleDateString()}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {new Date(order.order_date).toLocaleTimeString()}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleViewOrder(order)}
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <select
//                           value={order.status}
//                           onChange={(e) => handleStatusUpdate(order.order_id, e.target.value)}
//                           className="text-sm border border-gray-300 rounded px-2 py-1"
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="processing">Processing</option>
//                           <option value="shipped">Shipped</option>
//                           <option value="completed">Completed</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Order Detail Modal */}
//       <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Order Details - {selectedOrder?.order_id}</DialogTitle>
//           </DialogHeader>
//           {selectedOrder && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <p><span className="font-medium">Name:</span> {selectedOrder.first_name} {selectedOrder.last_name}</p>
//                     <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
//                     <p><span className="font-medium">User ID:</span> {selectedOrder.user_id}</p>
//                     <p><span className="font-medium">Shipping Address:</span></p>
//                     <p className="text-gray-600 ml-4">{selectedOrder.shipping_address}</p>
//                     <p><span className="font-medium">Billing Address:</span></p>
//                     <p className="text-gray-600 ml-4">{selectedOrder.billing_address}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <p><span className="font-medium">Order ID:</span> {selectedOrder.order_id}</p>
//                     <p><span className="font-medium">Tracking Number:</span> {selectedOrder.tracking_number}</p>
//                     <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.order_date).toLocaleString()}</p>
//                     <p><span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}</p>
//                     <p><span className="font-medium">Payment Status:</span> 
//                       <Badge 
//                         variant="outline" 
//                         className={`ml-2 ${selectedOrder.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}`}
//                       >
//                         {selectedOrder.payment_status}
//                       </Badge>
//                     </p>
//                     <p><span className="font-medium">Payment Method:</span> {selectedOrder.payment_method}</p>
//                     <p><span className="font-medium">Shipping Method:</span> {selectedOrder.shipping_method}</p>
//                     <p><span className="font-medium">Total:</span> KSH {parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
//                     <p><span className="font-medium">Items Count:</span> {selectedOrder.items_count}</p>
//                     <p><span className="font-medium">Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
//                     <p><span className="font-medium">Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-3">Order Timeline</h3>
//                 <div className="border rounded-lg p-4">
//                   <div className="space-y-2 text-sm">
//                     <p><span className="font-medium">Order Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
//                     <p><span className="font-medium">Last Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-2">
//                 <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
//                   Close
//                 </Button>
//                 <Button onClick={() => setIsOrderModalOpen(false)}>
//                   Update Order
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminOrders;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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

const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'paid', 'failed', 'refunded'];

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { adminToken } = useAdminAuth();

  useEffect(() => {
    if (adminToken) {
      fetchOrders();
    }
  }, [adminToken, currentPage]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}?page=${currentPage}&limit=10&status=&start_date=&end_date=`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: OrdersResponse = await response.json();
        const ordersList = data.data.orders || [];
        
        // Sort by order_date or created_at descending (newest first)
        const sortedOrders = [...ordersList].sort((a, b) => {
          const dateA = new Date(a.order_date || a.created_at || 0).getTime();
          const dateB = new Date(b.order_date || b.created_at || 0).getTime();
          return dateB - dateA; // Descending order
        });
        
        setOrders(sortedOrders);
        setPagination(data.data.pagination);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'paid':
        return <Badge className="bg-emerald-100 text-emerald-800">Paid</Badge>;
      case 'failed':
        return <Badge className="bg-orange-100 text-orange-800">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-orange-600" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    if (!allowedStatuses.includes(newStatus)) {
      setError(`Invalid status: ${newStatus}`);
      return;
    }

    try {
      if (!adminToken) return;
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}/${orderId}/status`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update order status');
      }

      setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update order status');
    }
  };

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing').length,
    pending: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 text-sm">Manage customer orders and fulfillment</p>
        </div>
        <Button
          onClick={fetchOrders}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
            <p className="text-xs text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-green-600">{orderStats.delivered}</div>
            <p className="text-xs text-gray-600">Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-blue-600">{orderStats.processing}</div>
            <p className="text-xs text-gray-600">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-yellow-600">{orderStats.pending}</div>
            <p className="text-xs text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-emerald-600">KSH {orderStats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              {allowedStatuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Orders ({filteredOrders.length})
            {pagination && (
              <span className="text-sm text-gray-500 ml-2">
                (Page {pagination.page} of {pagination.pages}, Total: {pagination.total})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading orders...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="text-sm">{order.order_id}</div>
                        <div className="text-xs text-gray-500">{order.tracking_number}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.first_name} {order.last_name}</div>
                        <div className="text-sm text-gray-600">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>KSH {parseFloat(order.total_amount).toFixed(2)}</TableCell>
                    <TableCell>{order.items_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Badge
                          variant="outline"
                          className={order.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}
                        >
                          {order.payment_status}
                        </Badge>
                        <span className="text-xs text-gray-500 mt-1">{order.payment_method}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(order.order_date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.order_date).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.order_id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          {allowedStatuses.map(status => (
                            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {/* Pagination Controls */}
          {!isLoading && pagination && pagination.pages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(pagination.pages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.pages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <PaginationItem key={pageNum}>...</PaginationItem>;
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                      className={currentPage === pagination.pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.order_id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedOrder.first_name} {selectedOrder.last_name}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                    <p><span className="font-medium">User ID:</span> {selectedOrder.user_id}</p>
                    <p><span className="font-medium">Shipping Address:</span></p>
                    <p className="text-gray-600 ml-4">{selectedOrder.shipping_address}</p>
                    <p><span className="font-medium">Billing Address:</span></p>
                    <p className="text-gray-600 ml-4">{selectedOrder.billing_address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {selectedOrder.order_id}</p>
                    <p><span className="font-medium">Tracking Number:</span> {selectedOrder.tracking_number}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.order_date).toLocaleString()}</p>
                    <p><span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}</p>
                    <p><span className="font-medium">Payment Status:</span>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${selectedOrder.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}`}
                      >
                        {selectedOrder.payment_status}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Payment Method:</span> {selectedOrder.payment_method}</p>
                    <p><span className="font-medium">Shipping Method:</span> {selectedOrder.shipping_method}</p>
                    <p><span className="font-medium">Total:</span> KSH {parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                    <p><span className="font-medium">Items Count:</span> {selectedOrder.items_count}</p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                    <p><span className="font-medium">Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Order Timeline</h3>
                <div className="border rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                    <p><span className="font-medium">Last Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsOrderModalOpen(false)}>
                  Update Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
