// // // import React, { useState, useEffect } from 'react';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Badge } from '@/components/ui/badge';
// // // import { 
// // //   Table, 
// // //   TableBody, 
// // //   TableCell, 
// // //   TableHead, 
// // //   TableHeader, 
// // //   TableRow 
// // // } from '@/components/ui/table';
// // // import { 
// // //   Search, 
// // //   Eye, 
// // //   Package,
// // //   Truck,
// // //   CheckCircle,
// // //   Clock,
// // //   XCircle,
// // //   Loader2,
// // //   RefreshCw
// // // } from 'lucide-react';
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// // // import { useAdminAuth } from '@/context/AdminAuthContext';
// // // import { buildApiUrl, API_CONFIG } from '@/lib/config';

// // // interface Order {
// // //   order_id: string;
// // //   user_id: string;
// // //   order_date: string;
// // //   status: string;
// // //   total_amount: string;
// // //   shipping_address: string;
// // //   billing_address: string;
// // //   payment_method: string;
// // //   payment_status: string;
// // //   tracking_number: string;
// // //   created_at: string;
// // //   updated_at: string;
// // //   shipping_method: string;
// // //   email: string;
// // //   first_name: string;
// // //   last_name: string;
// // //   items_count: string;
// // // }

// // // interface OrdersResponse {
// // //   success: boolean;
// // //   statusCode: number;
// // //   message: string;
// // //   data: {
// // //     orders: Order[];
// // //     pagination: {
// // //       page: number;
// // //       limit: number;
// // //       total: number;
// // //       pages: number;
// // //     };
// // //   };
// // //   timestamp: string;
// // // }

// // // const AdminOrders: React.FC = () => {
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// // //   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
// // //   const [statusFilter, setStatusFilter] = useState('all');
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [pagination, setPagination] = useState<any>(null);
// // //   const { adminToken } = useAdminAuth();

// // //   useEffect(() => {
// // //     if (adminToken) {
// // //       fetchOrders();
// // //     }
// // //   }, [adminToken]);

// // //   const fetchOrders = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);
      
// // //       const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}?page=1&limit=10&status=&start_date=&end_date=`), {
// // //         method: 'GET',
// // //         headers: {
// // //           'Authorization': `Bearer ${adminToken}`,
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });

// // //       if (response.ok) {
// // //         const data: OrdersResponse = await response.json();
// // //         setOrders(data.data.orders);
// // //         setPagination(data.data.pagination);
// // //       } else {
// // //         const errorData = await response.json().catch(() => ({}));
// // //         setError(errorData.message || 'Failed to fetch orders');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching orders:', error);
// // //       setError('An error occurred while fetching orders');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const getStatusBadge = (status: string) => {
// // //     switch (status) {
// // //       case 'completed':
// // //         return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
// // //       case 'processing':
// // //         return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
// // //       case 'shipped':
// // //         return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
// // //       case 'pending':
// // //         return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
// // //       case 'cancelled':
// // //         return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
// // //       default:
// // //         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
// // //     }
// // //   };

// // //   const getStatusIcon = (status: string) => {
// // //     switch (status) {
// // //       case 'completed':
// // //         return <CheckCircle className="h-4 w-4 text-green-600" />;
// // //       case 'processing':
// // //         return <Package className="h-4 w-4 text-blue-600" />;
// // //       case 'shipped':
// // //         return <Truck className="h-4 w-4 text-purple-600" />;
// // //       case 'pending':
// // //         return <Clock className="h-4 w-4 text-yellow-600" />;
// // //       case 'cancelled':
// // //         return <XCircle className="h-4 w-4 text-red-600" />;
// // //       default:
// // //         return <Clock className="h-4 w-4 text-gray-600" />;
// // //     }
// // //   };

// // //   const filteredOrders = orders.filter(order => {
// // //     const matchesSearch = 
// // //       order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase());
    
// // //     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
// // //     return matchesSearch && matchesStatus;
// // //   });

// // //   const handleViewOrder = (order: any) => {
// // //     setSelectedOrder(order);
// // //     setIsOrderModalOpen(true);
// // //   };

// // //   const handleStatusUpdate = async (orderId: string, newStatus: string) => {
// // //     try {
// // //       if (!adminToken) return;
// // //       const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}/${orderId}/status`), {
// // //         method: 'PATCH',
// // //         headers: {
// // //           'Authorization': `Bearer ${adminToken}`,
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ status: newStatus }),
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json().catch(() => ({}));
// // //         throw new Error(errorData.message || 'Failed to update order status');
// // //       }

// // //       // Optimistically update local state
// // //       setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
// // //     } catch (err) {
// // //       console.error('Error updating order status:', err);
// // //       setError(err instanceof Error ? err.message : 'Failed to update order status');
// // //     }
// // //   };

// // //   const orderStats = {
// // //     total: orders.length,
// // //     completed: orders.filter(o => o.status === 'completed').length,
// // //     processing: orders.filter(o => o.status === 'processing').length,
// // //     pending: orders.filter(o => o.status === 'pending').length,
// // //     totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
// // //   };

// // //   return (
// // //     <div className="space-y-4">
// // //       <div className="flex justify-between items-center">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
// // //           <p className="text-gray-600 text-sm">Manage customer orders and fulfillment</p>
// // //         </div>
// // //         <Button 
// // //           onClick={fetchOrders} 
// // //           variant="outline" 
// // //           size="sm"
// // //           disabled={isLoading}
// // //         >
// // //           <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
// // //           Refresh
// // //         </Button>
// // //       </div>

// // //       {error && (
// // //         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// // //           {error}
// // //         </div>
// // //       )}

// // //       {/* Order Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
// // //         <Card>
// // //           <CardContent className="p-4">
// // //             <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
// // //             <p className="text-xs text-gray-600">Total Orders</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardContent className="p-4">
// // //             <div className="text-xl font-bold text-green-600">{orderStats.completed}</div>
// // //             <p className="text-xs text-gray-600">Completed</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardContent className="p-4">
// // //             <div className="text-xl font-bold text-blue-600">{orderStats.processing}</div>
// // //             <p className="text-xs text-gray-600">Processing</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardContent className="p-4">
// // //             <div className="text-xl font-bold text-yellow-600">{orderStats.pending}</div>
// // //             <p className="text-xs text-gray-600">Pending</p>
// // //           </CardContent>
// // //         </Card>
// // //         <Card>
// // //           <CardContent className="p-4">
// // //             <div className="text-xl font-bold text-emerald-600">KSH {orderStats.totalRevenue.toFixed(2)}</div>
// // //             <p className="text-xs text-gray-600">Total Revenue</p>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       {/* Search and Filters */}
// // //       <Card>
// // //         <CardContent className="p-4">
// // //           <div className="flex space-x-4">
// // //             <div className="flex-1">
// // //               <div className="relative">
// // //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // //                 <Input
// // //                   placeholder="Search orders..."
// // //                   value={searchTerm}
// // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // //                   className="pl-10"
// // //                 />
// // //               </div>
// // //             </div>
// // //             <select
// // //               value={statusFilter}
// // //               onChange={(e) => setStatusFilter(e.target.value)}
// // //               className="px-3 py-2 border border-gray-300 rounded-md"
// // //             >
// // //               <option value="all">All Status</option>
// // //               <option value="pending">Pending</option>
// // //               <option value="processing">Processing</option>
// // //               <option value="shipped">Shipped</option>
// // //               <option value="completed">Completed</option>
// // //               <option value="cancelled">Cancelled</option>
// // //             </select>
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       {/* Orders Table */}
// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>
// // //             All Orders ({filteredOrders.length})
// // //             {pagination && (
// // //               <span className="text-sm text-gray-500 ml-2">
// // //                 (Page {pagination.page} of {pagination.pages}, Total: {pagination.total})
// // //               </span>
// // //             )}
// // //           </CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           {isLoading ? (
// // //             <div className="flex items-center justify-center py-8">
// // //               <Loader2 className="h-6 w-6 animate-spin mr-2" />
// // //               <span>Loading orders...</span>
// // //             </div>
// // //           ) : (
// // //             <Table>
// // //               <TableHeader>
// // //                 <TableRow>
// // //                   <TableHead>Order ID</TableHead>
// // //                   <TableHead>Customer</TableHead>
// // //                   <TableHead>Total</TableHead>
// // //                   <TableHead>Items</TableHead>
// // //                   <TableHead>Status</TableHead>
// // //                   <TableHead>Payment</TableHead>
// // //                   <TableHead>Date</TableHead>
// // //                   <TableHead>Actions</TableHead>
// // //                 </TableRow>
// // //               </TableHeader>
// // //               <TableBody>
// // //                 {filteredOrders.map((order) => (
// // //                   <TableRow key={order.order_id}>
// // //                     <TableCell className="font-medium">
// // //                       <div>
// // //                         <div className="text-sm">{order.order_id}</div>
// // //                         <div className="text-xs text-gray-500">{order.tracking_number}</div>
// // //                       </div>
// // //                     </TableCell>
// // //                     <TableCell>
// // //                       <div>
// // //                         <div className="font-medium">{order.first_name} {order.last_name}</div>
// // //                         <div className="text-sm text-gray-600">{order.email}</div>
// // //                       </div>
// // //                     </TableCell>
// // //                     <TableCell>KSH {parseFloat(order.total_amount).toFixed(2)}</TableCell>
// // //                     <TableCell>{order.items_count}</TableCell>
// // //                     <TableCell>
// // //                       <div className="flex items-center space-x-2">
// // //                         {getStatusIcon(order.status)}
// // //                         {getStatusBadge(order.status)}
// // //                       </div>
// // //                     </TableCell>
// // //                     <TableCell>
// // //                       <div className="flex flex-col">
// // //                         <Badge 
// // //                           variant="outline" 
// // //                           className={order.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}
// // //                         >
// // //                           {order.payment_status}
// // //                         </Badge>
// // //                         <span className="text-xs text-gray-500 mt-1">{order.payment_method}</span>
// // //                       </div>
// // //                     </TableCell>
// // //                     <TableCell>
// // //                       <div className="text-sm">
// // //                         {new Date(order.order_date).toLocaleDateString()}
// // //                       </div>
// // //                       <div className="text-xs text-gray-500">
// // //                         {new Date(order.order_date).toLocaleTimeString()}
// // //                       </div>
// // //                     </TableCell>
// // //                     <TableCell>
// // //                       <div className="flex space-x-2">
// // //                         <Button
// // //                           variant="ghost"
// // //                           size="sm"
// // //                           onClick={() => handleViewOrder(order)}
// // //                         >
// // //                           <Eye className="h-4 w-4" />
// // //                         </Button>
// // //                         <select
// // //                           value={order.status}
// // //                           onChange={(e) => handleStatusUpdate(order.order_id, e.target.value)}
// // //                           className="text-sm border border-gray-300 rounded px-2 py-1"
// // //                         >
// // //                           <option value="pending">Pending</option>
// // //                           <option value="processing">Processing</option>
// // //                           <option value="shipped">Shipped</option>
// // //                           <option value="completed">Completed</option>
// // //                           <option value="cancelled">Cancelled</option>
// // //                         </select>
// // //                       </div>
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 ))}
// // //               </TableBody>
// // //             </Table>
// // //           )}
// // //         </CardContent>
// // //       </Card>

// // //       {/* Order Detail Modal */}
// // //       <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
// // //         <DialogContent className="max-w-4xl">
// // //           <DialogHeader>
// // //             <DialogTitle>Order Details - {selectedOrder?.order_id}</DialogTitle>
// // //           </DialogHeader>
// // //           {selectedOrder && (
// // //             <div className="space-y-6">
// // //               <div className="grid grid-cols-2 gap-6">
// // //                 <div>
// // //                   <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
// // //                   <div className="space-y-2 text-sm">
// // //                     <p><span className="font-medium">Name:</span> {selectedOrder.first_name} {selectedOrder.last_name}</p>
// // //                     <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
// // //                     <p><span className="font-medium">User ID:</span> {selectedOrder.user_id}</p>
// // //                     <p><span className="font-medium">Shipping Address:</span></p>
// // //                     <p className="text-gray-600 ml-4">{selectedOrder.shipping_address}</p>
// // //                     <p><span className="font-medium">Billing Address:</span></p>
// // //                     <p className="text-gray-600 ml-4">{selectedOrder.billing_address}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
// // //                   <div className="space-y-2 text-sm">
// // //                     <p><span className="font-medium">Order ID:</span> {selectedOrder.order_id}</p>
// // //                     <p><span className="font-medium">Tracking Number:</span> {selectedOrder.tracking_number}</p>
// // //                     <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.order_date).toLocaleString()}</p>
// // //                     <p><span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}</p>
// // //                     <p><span className="font-medium">Payment Status:</span> 
// // //                       <Badge 
// // //                         variant="outline" 
// // //                         className={`ml-2 ${selectedOrder.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}`}
// // //                       >
// // //                         {selectedOrder.payment_status}
// // //                       </Badge>
// // //                     </p>
// // //                     <p><span className="font-medium">Payment Method:</span> {selectedOrder.payment_method}</p>
// // //                     <p><span className="font-medium">Shipping Method:</span> {selectedOrder.shipping_method}</p>
// // //                     <p><span className="font-medium">Total:</span> KSH {parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
// // //                     <p><span className="font-medium">Items Count:</span> {selectedOrder.items_count}</p>
// // //                     <p><span className="font-medium">Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
// // //                     <p><span className="font-medium">Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
              
// // //               <div>
// // //                 <h3 className="font-medium text-gray-900 mb-3">Order Timeline</h3>
// // //                 <div className="border rounded-lg p-4">
// // //                   <div className="space-y-2 text-sm">
// // //                     <p><span className="font-medium">Order Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
// // //                     <p><span className="font-medium">Last Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="flex justify-end space-x-2">
// // //                 <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
// // //                   Close
// // //                 </Button>
// // //                 <Button onClick={() => setIsOrderModalOpen(false)}>
// // //                   Update Order
// // //                 </Button>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </DialogContent>
// // //       </Dialog>
// // //     </div>
// // //   );
// // // };

// // // export default AdminOrders;
// // import React, { useState, useEffect } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow
// // } from '@/components/ui/table';
// // import {
// //   Search,
// //   Eye,
// //   Package,
// //   Truck,
// //   CheckCircle,
// //   Clock,
// //   XCircle,
// //   Loader2,
// //   RefreshCw,
// //   ShoppingBag,
// //   UserCheck
// // } from 'lucide-react';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// // import { useAdminAuth } from '@/context/AdminAuthContext';
// // import { buildApiUrl, API_CONFIG, replaceUrlParams } from '@/lib/config';
// // import { useMaterialToast } from '@/hooks/useMaterialToast';
// // import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from '@/components/ui/pagination';

// // interface Order {
// //   order_id: string;
// //   user_id: string;
// //   order_date: string;
// //   status: string;
// //   total_amount: string;
// //   shipping_address: string;
// //   billing_address: string;
// //   payment_method: string;
// //   payment_status: string;
// //   tracking_number: string;
// //   created_at: string;
// //   updated_at: string;
// //   shipping_method: string;
// //   email: string;
// //   first_name: string;
// //   last_name: string;
// //   items_count: string;
// // }

// // interface OrdersResponse {
// //   success: boolean;
// //   statusCode: number;
// //   message: string;
// //   data: {
// //     orders: Order[];
// //     pagination: {
// //       page: number;
// //       limit: number;
// //       total: number;
// //       pages: number;
// //     };
// //   };
// //   timestamp: string;
// // }

// // // Valid order statuses according to API enum
// // const allowedStatuses = [
// //   'pending',
// //   'processing',
// //   'ready_for_pickup',
// //   'picked_up_by_courier',
// //   'out_for_delivery',
// //   'shipped',
// //   'delivered',
// //   'cancelled',
// //   'refunded'
// // ] as const;

// // type OrderStatus = typeof allowedStatuses[number];

// // const AdminOrders: React.FC = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// //   const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [pagination, setPagination] = useState<any>(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [pendingUpdates, setPendingUpdates] = useState<Record<string, string>>({});
// //   const { adminToken } = useAdminAuth();
// //   const { toast } = useMaterialToast();
// //   const { confirm } = useMaterialConfirm();

// //   useEffect(() => {
// //     if (adminToken) {
// //       fetchOrders();
// //     }
// //   }, [adminToken, currentPage]);

// //   const fetchOrders = async () => {
// //     try {
// //       setIsLoading(true);
// //       setError(null);

// //       const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}?page=${currentPage}&limit=10&status=&start_date=&end_date=`), {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (response.ok) {
// //         const data: OrdersResponse = await response.json();
// //         const ordersList = data.data.orders || [];
        
// //         // Sort by order_date or created_at descending (newest first)
// //         const sortedOrders = [...ordersList].sort((a, b) => {
// //           const dateA = new Date(a.order_date || a.created_at || 0).getTime();
// //           const dateB = new Date(b.order_date || b.created_at || 0).getTime();
// //           return dateB - dateA; // Descending order
// //         });
        
// //         setOrders(sortedOrders);
// //         setPagination(data.data.pagination);
// //       } else {
// //         const errorData = await response.json().catch(() => ({}));
// //         setError(errorData.message || 'Failed to fetch orders');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching orders:', error);
// //       setError('An error occurred while fetching orders');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const getStatusBadge = (status: string) => {
// //     switch (status) {
// //       case 'pending':
// //         return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
// //       case 'processing':
// //         return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
// //       case 'ready_for_pickup':
// //         return <Badge className="bg-indigo-100 text-indigo-800">Ready for Pickup</Badge>;
// //       case 'picked_up_by_courier':
// //         return <Badge className="bg-cyan-100 text-cyan-800">Picked Up by Courier</Badge>;
// //       case 'out_for_delivery':
// //         return <Badge className="bg-orange-100 text-orange-800">Out for Delivery</Badge>;
// //       case 'shipped':
// //         return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
// //       case 'delivered':
// //         return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
// //       case 'cancelled':
// //         return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
// //       case 'refunded':
// //         return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>;
// //       default:
// //         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
// //     }
// //   };

// //   const getStatusIcon = (status: string) => {
// //     switch (status) {
// //       case 'pending':
// //         return <Clock className="h-4 w-4 text-yellow-600" />;
// //       case 'processing':
// //         return <Package className="h-4 w-4 text-blue-600" />;
// //       case 'ready_for_pickup':
// //         return <ShoppingBag className="h-4 w-4 text-indigo-600" />;
// //       case 'picked_up_by_courier':
// //         return <UserCheck className="h-4 w-4 text-cyan-600" />;
// //       case 'out_for_delivery':
// //         return <Truck className="h-4 w-4 text-orange-600" />;
// //       case 'shipped':
// //         return <Truck className="h-4 w-4 text-purple-600" />;
// //       case 'delivered':
// //         return <CheckCircle className="h-4 w-4 text-green-600" />;
// //       case 'cancelled':
// //         return <XCircle className="h-4 w-4 text-red-600" />;
// //       case 'refunded':
// //         return <RefreshCw className="h-4 w-4 text-gray-600" />;
// //       default:
// //         return <Clock className="h-4 w-4 text-gray-600" />;
// //     }
// //   };

// //   const filteredOrders = orders.filter(order => {
// //     const matchesSearch =
// //       order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

// //     return matchesSearch && matchesStatus;
// //   });

// //   const handleViewOrder = (order: Order) => {
// //     setSelectedOrder(order);
// //     setIsOrderModalOpen(true);
// //   };

// //   const handleStatusUpdateWithConfirmation = async (orderId: string, newStatus: string, currentStatus: string) => {
// //     // Find the order
// //     const order = orders.find(o => o.order_id === orderId);
// //     if (!order) {
// //       toast({
// //         title: 'Error',
// //         description: 'Order not found',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     // Basic enum validation - backend will handle all other validations
// //     if (!allowedStatuses.includes(newStatus as OrderStatus)) {
// //       const errorMsg = `Invalid enum value. Expected one of: ${allowedStatuses.join(' | ')}, received '${newStatus}'`;
// //       toast({
// //         title: 'Invalid Status',
// //         description: errorMsg,
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     // Show confirmation dialog
// //     const statusDisplayName = newStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// //     const confirmed = await confirm({
// //       title: 'Confirm Status Update',
// //       message: `Are you sure you want to change the order status from "${order.status}" to "${statusDisplayName}"?`,
// //       confirmText: 'Update Status',
// //       cancelText: 'Cancel',
// //       confirmColor: 'primary',
// //     });

// //     if (!confirmed) {
// //       // Clear pending update to revert dropdown
// //       setPendingUpdates(prev => {
// //         const updated = { ...prev };
// //         delete updated[orderId];
// //         return updated;
// //       });
// //       return;
// //     }

// //     // Proceed with status update
// //     await handleStatusUpdate(orderId, newStatus);
// //   };

// //   const handleStatusUpdate = async (orderId: string, newStatus: string) => {
// //     try {
// //       const url = replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_STATUS, { orderId });
// //       const response = await fetch(buildApiUrl(url), {
// //         method: 'PATCH',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ status: newStatus }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         const errorMessage = errorData.message || errorData.errors?.body?.status || 'Failed to update order status';
// //         throw new Error(errorMessage);
// //       }

// //       const statusDisplayName = newStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
// //       // Update local state
// //       setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
// //       if (selectedOrder?.order_id === orderId) {
// //         setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
// //       }
// //       setError(null);
      
// //       // Clear pending update after successful update
// //       setPendingUpdates(prev => {
// //         const updated = { ...prev };
// //         delete updated[orderId];
// //         return updated;
// //       });

// //       // Show success toast
// //       toast({
// //         title: 'Status Updated',
// //         description: `Order status has been successfully updated to "${statusDisplayName}"`,
// //         variant: 'success',
// //       });
// //     } catch (err) {
// //       console.error('Error updating order status:', err);
// //       const errorMessage = err instanceof Error ? err.message : 'Failed to update order status';
// //       setError(errorMessage);
      
// //       // Clear pending update on error to revert dropdown
// //       setPendingUpdates(prev => {
// //         const updated = { ...prev };
// //         delete updated[orderId];
// //         return updated;
// //       });
      
// //       // Show error toast
// //       toast({
// //         title: 'Update Failed',
// //         description: errorMessage,
// //         variant: 'destructive',
// //       });
// //     }
// //   };

// //   const handleOrderAction = async (orderId: string, action: 'pack' | 'pickup' | 'out-for-delivery' | 'deliver', actionName: string) => {
// //     const confirmed = await confirm({
// //       title: `Confirm ${actionName}`,
// //       message: `Are you sure you want to ${actionName.toLowerCase()} this order?`,
// //       confirmText: actionName,
// //       cancelText: 'Cancel',
// //       confirmColor: 'primary',
// //     });

// //     if (!confirmed) return;

// //     try {
// //       let endpoint = '';
// //       switch (action) {
// //         case 'pack':
// //           endpoint = replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_PACK, { orderId });
// //           break;
// //         case 'pickup':
// //           endpoint = replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_PICKUP, { orderId });
// //           break;
// //         case 'out-for-delivery':
// //           endpoint = replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_OUT_FOR_DELIVERY, { orderId });
// //           break;
// //         case 'deliver':
// //           endpoint = replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_DELIVER, { orderId });
// //           break;
// //       }

// //       const response = await fetch(buildApiUrl(endpoint), {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.message || `Failed to ${actionName.toLowerCase()} order`);
// //       }

// //       const data = await response.json();
// //       const newStatus = data.data?.order?.status || data.data?.status;
      
// //       // Update local state
// //       if (newStatus) {
// //         setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
// //         if (selectedOrder?.order_id === orderId) {
// //           setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
// //         }
// //       }

// //       toast({
// //         title: 'Success',
// //         description: `Order has been ${actionName.toLowerCase()}ed successfully`,
// //         variant: 'success',
// //       });

// //       // Refresh orders to get latest data
// //       fetchOrders();
// //     } catch (err) {
// //       console.error(`Error ${actionName.toLowerCase()}ing order:`, err);
// //       toast({
// //         title: 'Error',
// //         description: err instanceof Error ? err.message : `Failed to ${actionName.toLowerCase()} order`,
// //         variant: 'destructive',
// //       });
// //     }
// //   };

// //   const handleAssignCourier = async (orderId: string, courierData: { courier_name: string; courier_tracking_number: string; delivery_notes?: string }) => {
// //     const confirmed = await confirm({
// //       title: 'Assign Courier',
// //       message: `Assign ${courierData.courier_name} to this order?`,
// //       confirmText: 'Assign',
// //       cancelText: 'Cancel',
// //       confirmColor: 'primary',
// //     });

// //     if (!confirmed) return;

// //     try {
// //       const endpoint = replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_ASSIGN_COURIER, { orderId });
// //       const response = await fetch(buildApiUrl(endpoint), {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(courierData),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.message || 'Failed to assign courier');
// //       }

// //       toast({
// //         title: 'Success',
// //         description: 'Courier assigned successfully',
// //         variant: 'success',
// //       });

// //       // Refresh orders to get latest data
// //       fetchOrders();
// //     } catch (err) {
// //       console.error('Error assigning courier:', err);
// //       toast({
// //         title: 'Error',
// //         description: err instanceof Error ? err.message : 'Failed to assign courier',
// //         variant: 'destructive',
// //       });
// //     }
// //   };

// //   const orderStats = {
// //     total: orders.length,
// //     delivered: orders.filter(o => o.status === 'delivered').length,
// //     processing: orders.filter(o => o.status === 'processing').length,
// //     pending: orders.filter(o => o.status === 'pending').length,
// //     totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0)
// //   };

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
// //           <p className="text-gray-600 text-sm">Manage customer orders and fulfillment</p>
// //         </div>
// //         <Button
// //           onClick={fetchOrders}
// //           variant="outline"
// //           size="sm"
// //           disabled={isLoading}
// //         >
// //           <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
// //           Refresh
// //         </Button>
// //       </div>

// //       {error && (
// //         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// //           {error}
// //         </div>
// //       )}

// //       {/* Order Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
// //         <Card>
// //           <CardContent className="p-4">
// //             <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
// //             <p className="text-xs text-gray-600">Total Orders</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardContent className="p-4">
// //             <div className="text-xl font-bold text-green-600">{orderStats.delivered}</div>
// //             <p className="text-xs text-gray-600">Delivered</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardContent className="p-4">
// //             <div className="text-xl font-bold text-blue-600">{orderStats.processing}</div>
// //             <p className="text-xs text-gray-600">Processing</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardContent className="p-4">
// //             <div className="text-xl font-bold text-yellow-600">{orderStats.pending}</div>
// //             <p className="text-xs text-gray-600">Pending</p>
// //           </CardContent>
// //         </Card>
// //         <Card>
// //           <CardContent className="p-4">
// //             <div className="text-xl font-bold text-emerald-600">KSH {orderStats.totalRevenue.toFixed(2)}</div>
// //             <p className="text-xs text-gray-600">Total Revenue</p>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Search and Filters */}
// //       <Card>
// //         <CardContent className="p-4">
// //           <div className="flex space-x-4">
// //             <div className="flex-1">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //                 <Input
// //                   placeholder="Search orders..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10"
// //                 />
// //               </div>
// //             </div>
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-md"
// //             >
// //               <option value="all">All Status</option>
// //               {allowedStatuses.map(status => (
// //                 <option key={status} value={status}>
// //                   {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Orders Table */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>
// //             All Orders ({filteredOrders.length})
// //             {pagination && (
// //               <span className="text-sm text-gray-500 ml-2">
// //                 (Page {pagination.page} of {pagination.pages}, Total: {pagination.total})
// //               </span>
// //             )}
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           {isLoading ? (
// //             <div className="flex items-center justify-center py-8">
// //               <Loader2 className="h-6 w-6 animate-spin mr-2" />
// //               <span>Loading orders...</span>
// //             </div>
// //           ) : (
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHead>Order ID</TableHead>
// //                   <TableHead>Customer</TableHead>
// //                   <TableHead>Total</TableHead>
// //                   <TableHead>Items</TableHead>
// //                   <TableHead>Status</TableHead>
// //                   <TableHead>Payment</TableHead>
// //                   <TableHead>Date</TableHead>
// //                   <TableHead>Actions</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredOrders.map((order) => (
// //                   <TableRow key={order.order_id}>
// //                     <TableCell className="font-medium">
// //                       <div>
// //                         <div className="text-sm">{order.order_id}</div>
// //                         <div className="text-xs text-gray-500">{order.tracking_number}</div>
// //                       </div>
// //                     </TableCell>
// //                     <TableCell>
// //                       <div>
// //                         <div className="font-medium">{order.first_name} {order.last_name}</div>
// //                         <div className="text-sm text-gray-600">{order.email}</div>
// //                       </div>
// //                     </TableCell>
// //                     <TableCell>KSH {parseFloat(order.total_amount).toFixed(2)}</TableCell>
// //                     <TableCell>{order.items_count}</TableCell>
// //                     <TableCell>
// //                       <div className="flex items-center space-x-2">
// //                         {getStatusIcon(order.status)}
// //                         {getStatusBadge(order.status)}
// //                       </div>
// //                     </TableCell>
// //                     <TableCell>
// //                       <div className="flex flex-col">
// //                         <Badge
// //                           variant="outline"
// //                           className={order.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}
// //                         >
// //                           {order.payment_status}
// //                         </Badge>
// //                         <span className="text-xs text-gray-500 mt-1">{order.payment_method}</span>
// //                       </div>
// //                     </TableCell>
// //                     <TableCell>
// //                       <div className="text-sm">
// //                         {new Date(order.order_date).toLocaleDateString()}
// //                       </div>
// //                       <div className="text-xs text-gray-500">
// //                         {new Date(order.order_date).toLocaleTimeString()}
// //                       </div>
// //                     </TableCell>
// //                     <TableCell>
// //                       <div className="flex space-x-2">
// //                         <Button
// //                           variant="ghost"
// //                           size="sm"
// //                           onClick={() => handleViewOrder(order)}
// //                         >
// //                           <Eye className="h-4 w-4" />
// //                         </Button>
// //                         <select
// //                           value={
// //                             pendingUpdates[order.order_id] 
// //                               ? pendingUpdates[order.order_id]
// //                               : (allowedStatuses.includes(order.status as OrderStatus) ? order.status : 'pending')
// //                           }
// //                           onChange={async (e) => {
// //                             const newStatus = e.target.value;
// //                             // Store the pending update to show in dropdown
// //                             setPendingUpdates(prev => ({ ...prev, [order.order_id]: newStatus }));
// //                             // Show confirmation dialog - it will handle clearing pendingUpdates on cancel
// //                             await handleStatusUpdateWithConfirmation(order.order_id, newStatus, order.status);
// //                           }}
// //                           className="text-sm border border-gray-300 rounded px-2 py-1"
// //                         >
// //                           {allowedStatuses.map(status => (
// //                             <option key={status} value={status}>
// //                               {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           )}
          
// //           {/* Pagination Controls */}
// //           {!isLoading && pagination && pagination.pages > 1 && (
// //             <div className="mt-4 flex justify-end">
// //               <Pagination>
// //                 <PaginationContent>
// //                   <PaginationItem>
// //                     <PaginationPrevious 
// //                       onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
// //                       className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
// //                     />
// //                   </PaginationItem>
                  
// //                   {[...Array(pagination.pages)].map((_, idx) => {
// //                     const pageNum = idx + 1;
// //                     if (
// //                       pageNum === 1 ||
// //                       pageNum === pagination.pages ||
// //                       (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
// //                     ) {
// //                       return (
// //                         <PaginationItem key={pageNum}>
// //                           <PaginationLink
// //                             onClick={() => setCurrentPage(pageNum)}
// //                             isActive={currentPage === pageNum}
// //                             className="cursor-pointer"
// //                           >
// //                             {pageNum}
// //                           </PaginationLink>
// //                         </PaginationItem>
// //                       );
// //                     } else if (
// //                       pageNum === currentPage - 2 ||
// //                       pageNum === currentPage + 2
// //                     ) {
// //                       return <PaginationItem key={pageNum}>...</PaginationItem>;
// //                     }
// //                     return null;
// //                   })}
                  
// //                   <PaginationItem>
// //                     <PaginationNext 
// //                       onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
// //                       className={currentPage === pagination.pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
// //                     />
// //                   </PaginationItem>
// //                 </PaginationContent>
// //               </Pagination>
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>

// //       {/* Order Detail Modal */}
// //       <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
// //         <DialogContent className="max-w-4xl">
// //           <DialogHeader>
// //             <DialogTitle>Order Details - {selectedOrder?.order_id}</DialogTitle>
// //           </DialogHeader>
// //           {selectedOrder && (
// //             <div className="space-y-6">
// //               <div className="grid grid-cols-2 gap-6">
// //                 <div>
// //                   <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
// //                   <div className="space-y-2 text-sm">
// //                     <p><span className="font-medium">Name:</span> {selectedOrder.first_name} {selectedOrder.last_name}</p>
// //                     <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
// //                     <p><span className="font-medium">User ID:</span> {selectedOrder.user_id}</p>
// //                     <p><span className="font-medium">Shipping Address:</span></p>
// //                     <p className="text-gray-600 ml-4">{selectedOrder.shipping_address}</p>
// //                     <p><span className="font-medium">Billing Address:</span></p>
// //                     <p className="text-gray-600 ml-4">{selectedOrder.billing_address}</p>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
// //                   <div className="space-y-2 text-sm">
// //                     <p><span className="font-medium">Order ID:</span> {selectedOrder.order_id}</p>
// //                     <p><span className="font-medium">Tracking Number:</span> {selectedOrder.tracking_number}</p>
// //                     <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.order_date).toLocaleString()}</p>
// //                     <p><span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}</p>
// //                     <p><span className="font-medium">Payment Status:</span>
// //                       <Badge
// //                         variant="outline"
// //                         className={`ml-2 ${selectedOrder.payment_status === 'completed' ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}`}
// //                       >
// //                         {selectedOrder.payment_status}
// //                       </Badge>
// //                     </p>
// //                     <p><span className="font-medium">Payment Method:</span> {selectedOrder.payment_method}</p>
// //                     <p><span className="font-medium">Shipping Method:</span> {selectedOrder.shipping_method}</p>
// //                     <p><span className="font-medium">Total:</span> KSH {parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
// //                     <p><span className="font-medium">Items Count:</span> {selectedOrder.items_count}</p>
// //                     <p><span className="font-medium">Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
// //                     <p><span className="font-medium">Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <h3 className="font-medium text-gray-900 mb-3">Order Timeline</h3>
// //                 <div className="border rounded-lg p-4">
// //                   <div className="space-y-2 text-sm">
// //                     <p><span className="font-medium">Order Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
// //                     <p><span className="font-medium">Last Updated:</span> {new Date(selectedOrder.updated_at).toLocaleString()}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Order Management Actions */}
// //               <div>
// //                 <h3 className="font-medium text-gray-900 mb-3">Order Actions</h3>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
// //                   {selectedOrder.status === 'processing' && (
// //                     <Button
// //                       variant="outline"
// //                       onClick={() => handleOrderAction(selectedOrder.order_id, 'pack', 'Pack Order')}
// //                       className="text-sm"
// //                     >
// //                       <Package className="h-4 w-4 mr-2" />
// //                       Pack Order
// //                     </Button>
// //                   )}
// //                   {selectedOrder.status === 'ready_for_pickup' && (
// //                     <>
// //                       <Button
// //                         variant="outline"
// //                         onClick={() => handleOrderAction(selectedOrder.order_id, 'pickup', 'Mark Picked Up')}
// //                         className="text-sm"
// //                       >
// //                         <Truck className="h-4 w-4 mr-2" />
// //                         Mark Picked Up
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         onClick={() => {
// //                           const courierName = prompt('Enter courier name:');
// //                           const trackingNumber = prompt('Enter tracking number:');
// //                           const deliveryNotes = prompt('Enter delivery notes (optional):');
// //                           if (courierName && trackingNumber) {
// //                             handleAssignCourier(selectedOrder.order_id, {
// //                               courier_name: courierName,
// //                               courier_tracking_number: trackingNumber,
// //                               delivery_notes: deliveryNotes || undefined,
// //                             });
// //                           }
// //                         }}
// //                         className="text-sm"
// //                       >
// //                         <Truck className="h-4 w-4 mr-2" />
// //                         Assign Courier
// //                       </Button>
// //                     </>
// //                   )}
// //                   {selectedOrder.status === 'picked_up_by_courier' && (
// //                     <Button
// //                       variant="outline"
// //                       onClick={() => handleOrderAction(selectedOrder.order_id, 'out-for-delivery', 'Out for Delivery')}
// //                       className="text-sm"
// //                     >
// //                       <Truck className="h-4 w-4 mr-2" />
// //                       Out for Delivery
// //                     </Button>
// //                   )}
// //                   {selectedOrder.status === 'out_for_delivery' && (
// //                     <Button
// //                       variant="outline"
// //                       onClick={() => handleOrderAction(selectedOrder.order_id, 'deliver', 'Mark Delivered')}
// //                       className="text-sm"
// //                     >
// //                       <CheckCircle className="h-4 w-4 mr-2" />
// //                       Mark Delivered
// //                     </Button>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="flex justify-end space-x-2">
// //                 <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
// //                   Close
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default AdminOrders;
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
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
//   RefreshCw,
//   ShoppingBag,
//   UserCheck,
//   ImageOff,
//   AlertCircle
// } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { useAdminAuth } from '@/context/AdminAuthContext';
// import { buildApiUrl, API_CONFIG, replaceUrlParams } from '@/lib/config';
// import { useMaterialToast } from '@/hooks/useMaterialToast';
// import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface OrderItem {
//   order_item_id: string;
//   product_id: string;
//   product_name: string;
//   sku: string;
//   quantity: number;
//   unit_price: number;
//   product_image: string;
// }

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
//   items?: OrderItem[];
//   cancellation_requested?: boolean;
//   cancellation_reason?: string | null;
//   cancellation_approved?: boolean;
//   cancellation_rejected?: boolean;
//   admin_notes?: string | null;
//   packed_at?: string | null;
//   picked_up_at?: string | null;
//   out_for_delivery_at?: string | null;
//   delivered_at?: string | null;
//   courier_name?: string | null;
//   courier_tracking_number?: string | null;
//   delivery_notes?: string | null;
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

// // ─── Constants ─────────────────────────────────────────────────────────────────

// const allowedStatuses = [
//   'pending',
//   'processing',
//   'ready_for_pickup',
//   'picked_up_by_courier',
//   'out_for_delivery',
//   'shipped',
//   'delivered',
//   'cancelled',
//   'refunded',
// ] as const;

// type OrderStatus = typeof allowedStatuses[number];

// // ─── Helpers ───────────────────────────────────────────────────────────────────

// const formatStatus = (s: string) =>
//   s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// const formatCurrency = (amount: string | number) =>
//   `KSH ${parseFloat(String(amount)).toFixed(2)}`;

// const formatDate = (d: string) =>
//   new Date(d).toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' });

// const formatDateTime = (d: string) =>
//   new Date(d).toLocaleString('en-KE', {
//     day: '2-digit', month: 'short', year: 'numeric',
//     hour: '2-digit', minute: '2-digit',
//   });

// // ─── Sub-components ────────────────────────────────────────────────────────────

// const STATUS_CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
//   pending:               { bg: 'bg-amber-50',   text: 'text-amber-700',   icon: <Clock className="h-3.5 w-3.5" /> },
//   processing:            { bg: 'bg-blue-50',    text: 'text-blue-700',    icon: <Package className="h-3.5 w-3.5" /> },
//   ready_for_pickup:      { bg: 'bg-indigo-50',  text: 'text-indigo-700',  icon: <ShoppingBag className="h-3.5 w-3.5" /> },
//   picked_up_by_courier:  { bg: 'bg-cyan-50',    text: 'text-cyan-700',    icon: <UserCheck className="h-3.5 w-3.5" /> },
//   out_for_delivery:      { bg: 'bg-orange-50',  text: 'text-orange-700',  icon: <Truck className="h-3.5 w-3.5" /> },
//   shipped:               { bg: 'bg-purple-50',  text: 'text-purple-700',  icon: <Truck className="h-3.5 w-3.5" /> },
//   delivered:             { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: <CheckCircle className="h-3.5 w-3.5" /> },
//   cancelled:             { bg: 'bg-red-50',     text: 'text-red-700',     icon: <XCircle className="h-3.5 w-3.5" /> },
//   refunded:              { bg: 'bg-gray-100',   text: 'text-gray-700',    icon: <RefreshCw className="h-3.5 w-3.5" /> },
// };

// const StatusBadge = ({ status }: { status: string }) => {
//   const cfg = STATUS_CONFIG[status] ?? {
//     bg: 'bg-gray-100', text: 'text-gray-700', icon: <Clock className="h-3.5 w-3.5" />,
//   };
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
//       {cfg.icon}
//       {formatStatus(status)}
//     </span>
//   );
// };

// const PaymentBadge = ({ status }: { status: string }) => {
//   const ok = status === 'completed';
//   return (
//     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
//       ok
//         ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
//         : 'bg-red-50 text-red-700 border-red-200'
//     }`}>
//       {ok ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
//       {status}
//     </span>
//   );
// };

// const StatCard = ({
//   label, value, color = 'text-gray-900',
// }: { label: string; value: string | number; color?: string }) => (
//   <Card className="border border-gray-100 shadow-sm">
//     <CardContent className="p-4">
//       <div className={`text-2xl font-bold ${color}`}>{value}</div>
//       <p className="text-xs text-gray-500 mt-0.5">{label}</p>
//     </CardContent>
//   </Card>
// );

// const ProductImage = ({ src, alt, size = 'md' }: { src: string; alt: string; size?: 'sm' | 'md' }) => {
//   const [errored, setErrored] = useState(false);
//   const cls = size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';
//   if (!src || errored) {
//     return (
//       <div className={`${cls} rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0`}>
//         <ImageOff className="h-4 w-4 text-gray-300" />
//       </div>
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt={alt}
//       onError={() => setErrored(true)}
//       className={`${cls} rounded-lg object-cover border border-gray-200 flex-shrink-0`}
//     />
//   );
// };

// const InfoRow = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
//   <div className="flex items-start justify-between gap-4">
//     <span className="text-gray-500 font-medium flex-shrink-0">{label}</span>
//     <span className={`text-gray-800 text-right break-all ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
//   </div>
// );

// const TimelineStep = ({ label, time, done }: { label: string; time?: string | null; done: boolean }) => (
//   <div className={`rounded-lg p-3 border text-sm ${done ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
//     <div className={`font-medium ${done ? 'text-emerald-700' : 'text-gray-400'}`}>{label}</div>
//     <div className="text-xs mt-0.5 text-gray-500">
//       {time
//         ? new Date(time).toLocaleString('en-KE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
//         : '—'}
//     </div>
//   </div>
// );

// // ─── Main Component ────────────────────────────────────────────────────────────

// const AdminOrders: React.FC = () => {
//   const [searchTerm, setSearchTerm]       = useState('');
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isModalOpen, setIsModalOpen]     = useState(false);
//   const [statusFilter, setStatusFilter]   = useState('all');
//   const [orders, setOrders]               = useState<Order[]>([]);
//   const [isLoading, setIsLoading]         = useState(true);
//   const [error, setError]                 = useState<string | null>(null);
//   const [pagination, setPagination]       = useState<any>(null);
//   const [currentPage, setCurrentPage]     = useState(1);

//   /**
//    * displayStatus drives what the <select> dropdown SHOWS for each order row.
//    *
//    * WHY: Native browser <select> elements snap back to the underlying bound
//    * value as soon as the onChange handler suspends (i.e. awaits a confirm
//    * dialog). By keeping a separate displayStatus map and using it as the
//    * controlled `value`, we can hold the dropdown on the newly chosen option
//    * while the confirm dialog is open, then revert it to the real status on
//    * cancel, or let the orders-array update propagate it on success.
//    */
//   const [displayStatus, setDisplayStatus] = useState<Record<string, string>>({});

//   const { adminToken } = useAdminAuth();
//   const { toast }      = useMaterialToast();
//   const { confirm }    = useMaterialConfirm();

//   // Sync displayStatus whenever the orders array changes (initial load / refresh)
//   useEffect(() => {
//     setDisplayStatus(prev => {
//       const next = { ...prev };
//       orders.forEach(o => { next[o.order_id] = o.status; });
//       return next;
//     });
//   }, [orders]);

//   useEffect(() => {
//     if (adminToken) fetchOrders();
//   }, [adminToken, currentPage]);

//   // ── Fetch ─────────────────────────────────────────────────────────────────────

//   const fetchOrders = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const url = buildApiUrl(
//         `${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}?page=${currentPage}&limit=10&status=&start_date=&end_date=`
//       );
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message || 'Failed to fetch orders');
//       }
//       const data: OrdersResponse = await res.json();
//       const sorted = [...(data.data.orders || [])].sort(
//         (a, b) =>
//           new Date(b.order_date || b.created_at).getTime() -
//           new Date(a.order_date || a.created_at).getTime()
//       );
//       setOrders(sorted);
//       setPagination(data.data.pagination);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : 'An error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ── Status Dropdown ───────────────────────────────────────────────────────────

//   const handleStatusDropdownChange = async (order: Order, newStatus: string) => {
//     const { order_id: orderId, status: prevStatus } = order;

//     if (!allowedStatuses.includes(newStatus as OrderStatus)) {
//       toast({ title: 'Invalid Status', description: `"${newStatus}" is not a valid status.`, variant: 'destructive' });
//       return;
//     }

//     // Step 1 — immediately show the new value in the dropdown (controlled)
//     setDisplayStatus(prev => ({ ...prev, [orderId]: newStatus }));

//     // Step 2 — wait for user confirmation
//     const confirmed = await confirm({
//       title: 'Confirm Status Update',
//       message: `Change status to "${formatStatus(newStatus)}"?`,
//       confirmText: 'Update',
//       cancelText: 'Cancel',
//       confirmColor: 'primary',
//     });

//     if (!confirmed) {
//       // Revert the dropdown back to the actual current status
//       setDisplayStatus(prev => ({ ...prev, [orderId]: prevStatus }));
//       return;
//     }

//     // Step 3 — call the API
//     try {
//       const url = buildApiUrl(replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_STATUS, { orderId }));
//       const res = await fetch(url, {
//         method: 'PATCH',
//         headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message || e.errors?.body?.status || 'Failed to update status');
//       }
//       // Update the orders array — the useEffect above will keep displayStatus in sync
//       setOrders(prev => prev.map(o => (o.order_id === orderId ? { ...o, status: newStatus } : o)));
//       if (selectedOrder?.order_id === orderId) {
//         setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null));
//       }
//       toast({
//         title: 'Status Updated',
//         description: `Status set to "${formatStatus(newStatus)}"`,
//         variant: 'success',
//       });
//     } catch (e) {
//       // Revert on API error
//       setDisplayStatus(prev => ({ ...prev, [orderId]: prevStatus }));
//       toast({
//         title: 'Update Failed',
//         description: e instanceof Error ? e.message : 'Failed to update status',
//         variant: 'destructive',
//       });
//     }
//   };

//   // ── Order Workflow Actions ─────────────────────────────────────────────────────

//   const handleOrderAction = async (
//     orderId: string,
//     action: 'pack' | 'pickup' | 'out-for-delivery' | 'deliver',
//     label: string
//   ) => {
//     const confirmed = await confirm({
//       title: `Confirm: ${label}`,
//       message: `Are you sure you want to ${label.toLowerCase()} this order?`,
//       confirmText: label,
//       cancelText: 'Cancel',
//       confirmColor: 'primary',
//     });
//     if (!confirmed) return;

//     const endpointMap: Record<string, string> = {
//       pack:               API_CONFIG.ENDPOINTS.ADMIN.ORDER_PACK,
//       pickup:             API_CONFIG.ENDPOINTS.ADMIN.ORDER_PICKUP,
//       'out-for-delivery': API_CONFIG.ENDPOINTS.ADMIN.ORDER_OUT_FOR_DELIVERY,
//       deliver:            API_CONFIG.ENDPOINTS.ADMIN.ORDER_DELIVER,
//     };

//     try {
//       const url = buildApiUrl(replaceUrlParams(endpointMap[action], { orderId }));
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message || `Failed to ${label}`);
//       }
//       const data = await res.json();
//       const newStatus = data.data?.order?.status || data.data?.status;
//       if (newStatus) {
//         setOrders(prev => prev.map(o => (o.order_id === orderId ? { ...o, status: newStatus } : o)));
//         if (selectedOrder?.order_id === orderId) {
//           setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null));
//         }
//       }
//       toast({ title: 'Success', description: `Order ${label.toLowerCase()}ed successfully`, variant: 'success' });
//       fetchOrders();
//     } catch (e) {
//       toast({ title: 'Error', description: e instanceof Error ? e.message : `Failed to ${label}`, variant: 'destructive' });
//     }
//   };

//   // ── Assign Courier ────────────────────────────────────────────────────────────

//   const handleAssignCourier = async (orderId: string) => {
//     const courier_name            = prompt('Enter courier name:');
//     const courier_tracking_number = prompt('Enter tracking number:');
//     const delivery_notes          = prompt('Delivery notes (optional):') || undefined;
//     if (!courier_name || !courier_tracking_number) return;

//     const confirmed = await confirm({
//       title: 'Assign Courier',
//       message: `Assign "${courier_name}" to this order?`,
//       confirmText: 'Assign',
//       cancelText: 'Cancel',
//       confirmColor: 'primary',
//     });
//     if (!confirmed) return;

//     try {
//       const url = buildApiUrl(replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_ASSIGN_COURIER, { orderId }));
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ courier_name, courier_tracking_number, delivery_notes }),
//       });
//       if (!res.ok) {
//         const e = await res.json().catch(() => ({}));
//         throw new Error(e.message || 'Failed to assign courier');
//       }
//       toast({ title: 'Courier Assigned', description: `${courier_name} assigned successfully`, variant: 'success' });
//       fetchOrders();
//     } catch (e) {
//       toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed to assign courier', variant: 'destructive' });
//     }
//   };

//   // ── Derived ───────────────────────────────────────────────────────────────────

//   const filteredOrders = orders.filter(o => {
//     const q = searchTerm.toLowerCase();
//     const matchSearch =
//       o.order_id.toLowerCase().includes(q) ||
//       `${o.first_name} ${o.last_name}`.toLowerCase().includes(q) ||
//       o.email.toLowerCase().includes(q) ||
//       o.tracking_number.toLowerCase().includes(q);
//     return matchSearch && (statusFilter === 'all' || o.status === statusFilter);
//   });

//   const stats = {
//     total:      orders.length,
//     delivered:  orders.filter(o => o.status === 'delivered').length,
//     processing: orders.filter(o => o.status === 'processing').length,
//     pending:    orders.filter(o => o.status === 'pending').length,
//     revenue:    orders.reduce((s, o) => s + parseFloat(o.total_amount), 0),
//   };

//   // ── Render ────────────────────────────────────────────────────────────────────

//   return (
//     <div className="space-y-5">

//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h1>
//           <p className="text-sm text-gray-500 mt-0.5">Manage customer orders and fulfillment</p>
//         </div>
//         <Button onClick={fetchOrders} variant="outline" size="sm" disabled={isLoading} className="gap-2">
//           <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
//           Refresh
//         </Button>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//           <AlertCircle className="h-4 w-4 flex-shrink-0" />
//           {error}
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//         <StatCard label="Total Orders"  value={stats.total} />
//         <StatCard label="Delivered"     value={stats.delivered}  color="text-emerald-600" />
//         <StatCard label="Processing"    value={stats.processing} color="text-blue-600" />
//         <StatCard label="Pending"       value={stats.pending}    color="text-amber-600" />
//         <StatCard label="Total Revenue" value={`KSH ${stats.revenue.toFixed(2)}`} color="text-emerald-700" />
//       </div>

//       {/* Search & Filter */}
//       <Card className="border border-gray-100 shadow-sm">
//         <CardContent className="p-4">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by order ID, customer, email or tracking…"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 className="pl-9 h-9 text-sm"
//               />
//             </div>
//             <select
//               value={statusFilter}
//               onChange={e => setStatusFilter(e.target.value)}
//               className="h-9 px-3 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Statuses</option>
//               {allowedStatuses.map(s => (
//                 <option key={s} value={s}>{formatStatus(s)}</option>
//               ))}
//             </select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <Card className="border border-gray-100 shadow-sm">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-base font-semibold flex items-center gap-2">
//             All Orders
//             <span className="text-sm font-normal text-gray-400">
//               ({filteredOrders.length} shown{pagination ? ` · ${pagination.total} total` : ''})
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           {isLoading ? (
//             <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
//               <Loader2 className="h-5 w-5 animate-spin" />
//               <span className="text-sm">Loading orders…</span>
//             </div>
//           ) : filteredOrders.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
//               <ShoppingBag className="h-8 w-8" />
//               <span className="text-sm">No orders found</span>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gray-50 hover:bg-gray-50">
//                     {['Order', 'Customer', 'Items', 'Total', 'Status', 'Payment', 'Date', 'Actions'].map(h => (
//                       <TableHead
//                         key={h}
//                         className="text-xs font-semibold text-gray-500 uppercase tracking-wide first:pl-4 last:pr-4"
//                       >
//                         {h}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredOrders.map(order => (
//                     <TableRow key={order.order_id} className="hover:bg-gray-50/60 transition-colors align-top">

//                       {/* Order ID + tracking */}
//                       <TableCell className="pl-4 py-3">
//                         <div className="font-mono text-xs text-gray-700" title={order.order_id}>
//                           {order.order_id.slice(0, 8)}…
//                         </div>
//                         <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">
//                           {order.tracking_number}
//                         </div>
//                       </TableCell>

//                       {/* Customer */}
//                       <TableCell className="py-3">
//                         <div className="font-medium text-sm text-gray-800">
//                           {order.first_name} {order.last_name}
//                         </div>
//                         <div className="text-xs text-gray-400 truncate max-w-[180px]">{order.email}</div>
//                       </TableCell>

//                       {/* Items — thumbnail + product name */}
//                       <TableCell className="py-3">
//                         {order.items && order.items.length > 0 ? (
//                           <div className="flex flex-col gap-2">
//                             {order.items.slice(0, 2).map(item => (
//                               <div key={item.order_item_id} className="flex items-center gap-2">
//                                 <ProductImage src={item.product_image} alt={item.product_name} size="sm" />
//                                 <div className="min-w-0">
//                                   <div className="text-xs font-medium text-gray-800 truncate max-w-[140px]">
//                                     {item.product_name}
//                                   </div>
//                                   <div className="text-xs text-gray-400">×{item.quantity}</div>
//                                 </div>
//                               </div>
//                             ))}
//                             {order.items.length > 2 && (
//                               <span className="text-xs text-gray-400 pl-1">
//                                 +{order.items.length - 2} more
//                               </span>
//                             )}
//                           </div>
//                         ) : (
//                           <span className="text-xs text-gray-400">{order.items_count} item(s)</span>
//                         )}
//                       </TableCell>

//                       {/* Total */}
//                       <TableCell className="py-3 font-semibold text-sm text-gray-800 whitespace-nowrap">
//                         {formatCurrency(order.total_amount)}
//                       </TableCell>

//                       {/* Status badge */}
//                       <TableCell className="py-3">
//                         <StatusBadge status={order.status} />
//                       </TableCell>

//                       {/* Payment */}
//                       <TableCell className="py-3">
//                         <PaymentBadge status={order.payment_status} />
//                         <div className="text-xs text-gray-400 mt-1">
//                           {order.payment_method?.replace(/_/g, ' ')}
//                         </div>
//                       </TableCell>

//                       {/* Date */}
//                       <TableCell className="py-3 text-xs text-gray-600 whitespace-nowrap">
//                         {formatDate(order.order_date)}
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell className="py-3 pr-4">
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
//                             onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}
//                             title="View order details"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </Button>

//                           {/*
//                             Controlled select — value comes from displayStatus, NOT order.status.
//                             This keeps the dropdown showing the chosen value while the async
//                             confirm dialog is open, preventing the native snap-back behaviour.
//                           */}
//                           <select
//                             value={displayStatus[order.order_id] ?? order.status}
//                             onChange={e => handleStatusDropdownChange(order, e.target.value)}
//                             className="h-8 text-xs border border-gray-200 rounded-md px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                           >
//                             {allowedStatuses.map(s => (
//                               <option key={s} value={s}>{formatStatus(s)}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}

//           {/* Pagination */}
//           {!isLoading && pagination && pagination.pages > 1 && (
//             <div className="flex justify-end px-4 py-3 border-t border-gray-100">
//               <Pagination>
//                 <PaginationContent>
//                   <PaginationItem>
//                     <PaginationPrevious
//                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                       className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
//                     />
//                   </PaginationItem>
//                   {[...Array(pagination.pages)].map((_, i) => {
//                     const p = i + 1;
//                     if (p === 1 || p === pagination.pages || (p >= currentPage - 1 && p <= currentPage + 1)) {
//                       return (
//                         <PaginationItem key={p}>
//                           <PaginationLink
//                             onClick={() => setCurrentPage(p)}
//                             isActive={currentPage === p}
//                             className="cursor-pointer"
//                           >
//                             {p}
//                           </PaginationLink>
//                         </PaginationItem>
//                       );
//                     } else if (p === currentPage - 2 || p === currentPage + 2) {
//                       return <PaginationItem key={p}>…</PaginationItem>;
//                     }
//                     return null;
//                   })}
//                   <PaginationItem>
//                     <PaginationNext
//                       onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
//                       className={currentPage === pagination.pages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
//                     />
//                   </PaginationItem>
//                 </PaginationContent>
//               </Pagination>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* ── Order Detail Modal ──────────────────────────────────────────────────── */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-base font-semibold">
//               Order Details{' '}
//               <span className="font-mono text-xs text-gray-400 font-normal">{selectedOrder?.order_id}</span>
//             </DialogTitle>
//           </DialogHeader>

//           {selectedOrder && (
//             <div className="space-y-6 pt-1">

//               {/* Info grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Customer */}
//                 <div className="space-y-2">
//                   <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</h3>
//                   <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
//                     <InfoRow label="Name"    value={`${selectedOrder.first_name} ${selectedOrder.last_name}`} />
//                     <InfoRow label="Email"   value={selectedOrder.email} />
//                     <InfoRow label="User ID" value={selectedOrder.user_id} mono />
//                     <div>
//                       <p className="text-xs font-medium text-gray-500 mb-0.5">Shipping Address</p>
//                       <p className="text-gray-700 text-sm">{selectedOrder.shipping_address}</p>
//                     </div>
//                     {selectedOrder.billing_address !== selectedOrder.shipping_address && (
//                       <div>
//                         <p className="text-xs font-medium text-gray-500 mb-0.5">Billing Address</p>
//                         <p className="text-gray-700 text-sm">{selectedOrder.billing_address}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Order info */}
//                 <div className="space-y-2">
//                   <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Order Info</h3>
//                   <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
//                     <InfoRow label="Tracking"       value={selectedOrder.tracking_number} mono />
//                     <InfoRow label="Order Date"     value={formatDateTime(selectedOrder.order_date)} />
//                     <InfoRow label="Last Updated"   value={formatDateTime(selectedOrder.updated_at)} />
//                     <InfoRow label="Shipping"       value={selectedOrder.shipping_method} />
//                     <InfoRow label="Payment Method" value={selectedOrder.payment_method?.replace(/_/g, ' ')} />
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-500 font-medium">Status</span>
//                       <StatusBadge status={selectedOrder.status} />
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-500 font-medium">Payment</span>
//                       <PaymentBadge status={selectedOrder.payment_status} />
//                     </div>
//                     <div className="flex items-center justify-between pt-2 border-t border-gray-200">
//                       <span className="font-semibold text-gray-700">Order Total</span>
//                       <span className="font-bold text-gray-900">{formatCurrency(selectedOrder.total_amount)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Ordered Items */}
//               <div className="space-y-2">
//                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Ordered Items ({selectedOrder.items?.length ?? selectedOrder.items_count})
//                 </h3>
//                 {selectedOrder.items && selectedOrder.items.length > 0 ? (
//                   <div className="border border-gray-200 rounded-xl overflow-hidden">
//                     <table className="w-full text-sm">
//                       <thead>
//                         <tr className="bg-gray-50 border-b border-gray-200">
//                           <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Product</th>
//                           <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">SKU</th>
//                           <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Qty</th>
//                           <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Unit Price</th>
//                           <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 pr-5">Subtotal</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-100">
//                         {selectedOrder.items.map((item, idx) => (
//                           <tr key={item.order_item_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
//                             <td className="px-4 py-3">
//                               <div className="flex items-center gap-3">
//                                 <ProductImage src={item.product_image} alt={item.product_name} />
//                                 <div>
//                                   <div className="font-medium text-gray-800">{item.product_name}</div>
//                                   <div className="text-xs text-gray-400 font-mono mt-0.5">
//                                     {item.order_item_id.slice(0, 8)}…
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               <span className="font-mono text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
//                                 {item.sku}
//                               </span>
//                             </td>
//                             <td className="px-4 py-3 text-center font-medium text-gray-700">{item.quantity}</td>
//                             <td className="px-4 py-3 text-right text-gray-600">KSH {item.unit_price.toFixed(2)}</td>
//                             <td className="px-4 py-3 pr-5 text-right font-semibold text-gray-800">
//                               KSH {(item.quantity * item.unit_price).toFixed(2)}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                       <tfoot>
//                         <tr className="border-t-2 border-gray-200 bg-gray-50">
//                           <td colSpan={4} className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
//                             Order Total
//                           </td>
//                           <td className="px-4 py-3 pr-5 text-right text-base font-bold text-gray-900">
//                             {formatCurrency(selectedOrder.total_amount)}
//                           </td>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 gap-2">
//                     <Package className="h-5 w-5" />
//                     <span className="text-sm">Item details not available</span>
//                   </div>
//                 )}
//               </div>

//               {/* Cancellation alert */}
//               {selectedOrder.cancellation_requested && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-1">
//                   <h3 className="text-sm font-semibold text-red-700 flex items-center gap-2">
//                     <AlertCircle className="h-4 w-4" /> Cancellation Requested
//                   </h3>
//                   {selectedOrder.cancellation_reason && (
//                     <p className="text-sm text-red-600">Reason: {selectedOrder.cancellation_reason}</p>
//                   )}
//                   {selectedOrder.cancellation_rejected && (
//                     <p className="text-sm text-red-600 font-medium">Rejected by admin</p>
//                   )}
//                 </div>
//               )}

//               {/* Courier info */}
//               {selectedOrder.courier_name && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
//                   <h3 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
//                     <Truck className="h-4 w-4" /> Courier Information
//                   </h3>
//                   <InfoRow label="Courier"          value={selectedOrder.courier_name} />
//                   <InfoRow label="Courier Tracking" value={selectedOrder.courier_tracking_number ?? '—'} mono />
//                   {selectedOrder.delivery_notes && (
//                     <InfoRow label="Notes" value={selectedOrder.delivery_notes} />
//                   )}
//                 </div>
//               )}

//               {/* Timeline */}
//               <div className="space-y-2">
//                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Timeline</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <TimelineStep label="Order Created" time={selectedOrder.created_at}       done />
//                   <TimelineStep label="Packed"        time={selectedOrder.packed_at}        done={!!selectedOrder.packed_at} />
//                   <TimelineStep label="Picked Up"     time={selectedOrder.picked_up_at}     done={!!selectedOrder.picked_up_at} />
//                   <TimelineStep label="Delivered"     time={selectedOrder.delivered_at}     done={!!selectedOrder.delivered_at} />
//                 </div>
//               </div>

//               {/* Workflow actions */}
//               <div className="space-y-2">
//                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedOrder.status === 'processing' && (
//                     <Button variant="outline" size="sm" className="gap-2"
//                       onClick={() => handleOrderAction(selectedOrder.order_id, 'pack', 'Pack Order')}>
//                       <Package className="h-4 w-4" /> Pack Order
//                     </Button>
//                   )}
//                   {selectedOrder.status === 'ready_for_pickup' && (
//                     <>
//                       <Button variant="outline" size="sm" className="gap-2"
//                         onClick={() => handleOrderAction(selectedOrder.order_id, 'pickup', 'Mark Picked Up')}>
//                         <UserCheck className="h-4 w-4" /> Mark Picked Up
//                       </Button>
//                       <Button variant="outline" size="sm" className="gap-2"
//                         onClick={() => handleAssignCourier(selectedOrder.order_id)}>
//                         <Truck className="h-4 w-4" /> Assign Courier
//                       </Button>
//                     </>
//                   )}
//                   {selectedOrder.status === 'picked_up_by_courier' && (
//                     <Button variant="outline" size="sm" className="gap-2"
//                       onClick={() => handleOrderAction(selectedOrder.order_id, 'out-for-delivery', 'Out for Delivery')}>
//                       <Truck className="h-4 w-4" /> Out for Delivery
//                     </Button>
//                   )}
//                   {selectedOrder.status === 'out_for_delivery' && (
//                     <Button
//                       variant="outline" size="sm"
//                       className="gap-2 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
//                       onClick={() => handleOrderAction(selectedOrder.order_id, 'deliver', 'Mark Delivered')}
//                     >
//                       <CheckCircle className="h-4 w-4" /> Mark Delivered
//                     </Button>
//                   )}
//                   {!['processing', 'ready_for_pickup', 'picked_up_by_courier', 'out_for_delivery'].includes(selectedOrder.status) && (
//                     <p className="text-sm text-gray-400 italic">No workflow actions available for this status.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end pt-2 border-t border-gray-100">
//                 <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
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
  RefreshCw,
  ShoppingBag,
  UserCheck,
  ImageOff,
  AlertCircle,
  Phone,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG, replaceUrlParams } from '@/lib/config';
import { useMaterialToast } from '@/hooks/useMaterialToast';
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  email: string;
  first_name: string;
  last_name: string;
  items_count: string;
  items?: OrderItem[];
  cancellation_requested?: boolean;
  cancellation_reason?: string | null;
  cancellation_approved?: boolean;
  cancellation_rejected?: boolean;
  admin_notes?: string | null;
  packed_at?: string | null;
  picked_up_at?: string | null;
  out_for_delivery_at?: string | null;
  delivered_at?: string | null;
  courier_name?: string | null;
  courier_tracking_number?: string | null;
  delivery_notes?: string | null;
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

// ─── Payment types (for phone number extraction) ──────────────────────────────

interface RawCallbackItem {
  Name: string;
  Value?: any;
}

interface PaymentRaw {
  Body: {
    stkCallback: {
      ResultCode: number;
      ResultDesc: string;
      CheckoutRequestID: string;
      MerchantRequestID: string;
      CallbackMetadata?: { Item: RawCallbackItem[] };
    };
  };
}

interface Payment {
  payment_id: string;
  order_id: string;
  provider: string;
  amount: string;
  status: string;
  provider_ref: string;
  raw: PaymentRaw;
  created_at: string;
  updated_at: string;
  user_email: string;
}

interface PaymentsResponse {
  success: boolean;
  data: {
    payments: Payment[];
    pagination?: { page: number; limit: number; total: number; pages: number };
  };
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const allowedStatuses = [
  'pending',
  'processing',
  'ready_for_pickup',
  'picked_up_by_courier',
  'out_for_delivery',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
] as const;

type OrderStatus = typeof allowedStatuses[number];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatStatus = (s: string) =>
  s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const formatCurrency = (amount: string | number) =>
  `KSH ${parseFloat(String(amount)).toFixed(2)}`;

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' });

const formatDateTime = (d: string) =>
  new Date(d).toLocaleString('en-KE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

/** Extract phone number from M-Pesa STK callback payload */
const extractPhone = (raw?: PaymentRaw): string => {
  try {
    const items = raw?.Body?.stkCallback?.CallbackMetadata?.Item ?? [];
    const val = items.find(i => i.Name === 'PhoneNumber')?.Value?.toString() ?? '';
    if (!val) return '';
    return val.startsWith('254') ? `+${val}` : val;
  } catch {
    return '';
  }
};

/** Extract M-Pesa receipt number from callback payload */
const extractReceipt = (raw?: PaymentRaw): string => {
  try {
    const items = raw?.Body?.stkCallback?.CallbackMetadata?.Item ?? [];
    return items.find(i => i.Name === 'MpesaReceiptNumber')?.Value ?? '';
  } catch {
    return '';
  }
};

// ─── Sub-components ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  pending:               { bg: 'bg-amber-50',   text: 'text-amber-700',   icon: <Clock className="h-3.5 w-3.5" /> },
  processing:            { bg: 'bg-blue-50',    text: 'text-blue-700',    icon: <Package className="h-3.5 w-3.5" /> },
  ready_for_pickup:      { bg: 'bg-indigo-50',  text: 'text-indigo-700',  icon: <ShoppingBag className="h-3.5 w-3.5" /> },
  picked_up_by_courier:  { bg: 'bg-cyan-50',    text: 'text-cyan-700',    icon: <UserCheck className="h-3.5 w-3.5" /> },
  out_for_delivery:      { bg: 'bg-orange-50',  text: 'text-orange-700',  icon: <Truck className="h-3.5 w-3.5" /> },
  shipped:               { bg: 'bg-purple-50',  text: 'text-purple-700',  icon: <Truck className="h-3.5 w-3.5" /> },
  delivered:             { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: <CheckCircle className="h-3.5 w-3.5" /> },
  cancelled:             { bg: 'bg-red-50',     text: 'text-red-700',     icon: <XCircle className="h-3.5 w-3.5" /> },
  refunded:              { bg: 'bg-gray-100',   text: 'text-gray-700',    icon: <RefreshCw className="h-3.5 w-3.5" /> },
};

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = STATUS_CONFIG[status] ?? {
    bg: 'bg-gray-100', text: 'text-gray-700', icon: <Clock className="h-3.5 w-3.5" />,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.icon}
      {formatStatus(status)}
    </span>
  );
};

const PaymentBadge = ({ status }: { status: string }) => {
  const ok = status === 'completed';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
      ok
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-red-50 text-red-700 border-red-200'
    }`}>
      {ok ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      {status}
    </span>
  );
};

const StatCard = ({ label, value, color = 'text-gray-900' }: {
  label: string; value: string | number; color?: string;
}) => (
  <Card className="border border-gray-100 shadow-sm">
    <CardContent className="p-4">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </CardContent>
  </Card>
);

const ProductImage = ({ src, alt, size = 'md' }: { src: string; alt: string; size?: 'sm' | 'md' }) => {
  const [errored, setErrored] = useState(false);
  const cls = size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';
  if (!src || errored) {
    return (
      <div className={`${cls} rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0`}>
        <ImageOff className="h-4 w-4 text-gray-300" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={`${cls} rounded-lg object-cover border border-gray-200 flex-shrink-0`}
    />
  );
};

const InfoRow = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-500 font-medium flex-shrink-0">{label}</span>
    <span className={`text-gray-800 text-right break-all ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
  </div>
);

const TimelineStep = ({ label, time, done }: { label: string; time?: string | null; done: boolean }) => (
  <div className={`rounded-lg p-3 border text-sm ${done ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
    <div className={`font-medium ${done ? 'text-emerald-700' : 'text-gray-400'}`}>{label}</div>
    <div className="text-xs mt-0.5 text-gray-500">
      {time
        ? new Date(time).toLocaleString('en-KE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
        : '—'}
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [statusFilter, setStatusFilter]   = useState('all');
  const [orders, setOrders]               = useState<Order[]>([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [pagination, setPagination]       = useState<any>(null);
  const [currentPage, setCurrentPage]     = useState(1);

  /**
   * phoneMap: order_id → phone number string
   * Built by fetching the payments list and extracting the phone from each
   * payment's M-Pesa STK callback metadata.
   */
  const [phoneMap, setPhoneMap]           = useState<Record<string, string>>({});

  /**
   * paymentMap: order_id → Payment
   * Used to show full payment details (receipt, provider ref, etc.) in the modal.
   */
  const [paymentMap, setPaymentMap]       = useState<Record<string, Payment>>({});

  /**
   * displayStatus: order_id → currently displayed status in the dropdown.
   * Kept separate from order.status so the dropdown doesn't snap back while
   * an async confirm dialog is open.
   */
  const [displayStatus, setDisplayStatus] = useState<Record<string, string>>({});

  const { adminToken } = useAdminAuth();
  const { toast }      = useMaterialToast();
  const { confirm }    = useMaterialConfirm();

  // Sync displayStatus whenever orders array changes
  useEffect(() => {
    setDisplayStatus(prev => {
      const next = { ...prev };
      orders.forEach(o => { next[o.order_id] = o.status; });
      return next;
    });
  }, [orders]);

  useEffect(() => {
    if (adminToken) {
      fetchOrders();
      fetchPayments();
    }
  }, [adminToken, currentPage]);

  // ── Fetch Orders ──────────────────────────────────────────────────────────────

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = buildApiUrl(
        `${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}?page=${currentPage}&limit=10&status=&start_date=&end_date=`
      );
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message || 'Failed to fetch orders');
      }
      const data: OrdersResponse = await res.json();
      const sorted = [...(data.data.orders || [])].sort(
        (a, b) =>
          new Date(b.order_date || b.created_at).getTime() -
          new Date(a.order_date || a.created_at).getTime()
      );
      setOrders(sorted);
      setPagination(data.data.pagination);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Fetch Payments (for phone numbers + receipt details) ──────────────────────

  const fetchPayments = async () => {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.PAYMENTS}?page=1&limit=100`);
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) return; // non-fatal — orders still work without phone data

      const data: PaymentsResponse = await res.json();
      const payments = data.data?.payments ?? [];

      const phones: Record<string, string> = {};
      const pMap: Record<string, Payment> = {};

      payments.forEach(p => {
        const phone = extractPhone(p.raw);
        if (phone) phones[p.order_id] = phone;
        pMap[p.order_id] = p;
      });

      setPhoneMap(phones);
      setPaymentMap(pMap);
    } catch {
      // silently ignore — phone numbers are supplementary
    }
  };

  const refreshAll = () => {
    fetchOrders();
    fetchPayments();
  };

  // ── Status Dropdown ───────────────────────────────────────────────────────────

  const handleStatusDropdownChange = async (order: Order, newStatus: string) => {
    const { order_id: orderId, status: prevStatus } = order;

    if (!allowedStatuses.includes(newStatus as OrderStatus)) {
      toast({ title: 'Invalid Status', description: `"${newStatus}" is not a valid status.`, variant: 'destructive' });
      return;
    }

    // Immediately show new value so the dropdown doesn't snap back
    setDisplayStatus(prev => ({ ...prev, [orderId]: newStatus }));

    const confirmed = await confirm({
      title: 'Confirm Status Update',
      message: `Change status to "${formatStatus(newStatus)}"?`,
      confirmText: 'Update',
      cancelText: 'Cancel',
      confirmColor: 'primary',
    });

    if (!confirmed) {
      setDisplayStatus(prev => ({ ...prev, [orderId]: prevStatus }));
      return;
    }

    try {
      const url = buildApiUrl(replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_STATUS, { orderId }));
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message || e.errors?.body?.status || 'Failed to update status');
      }
      setOrders(prev => prev.map(o => (o.order_id === orderId ? { ...o, status: newStatus } : o)));
      if (selectedOrder?.order_id === orderId) {
        setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null));
      }
      toast({ title: 'Status Updated', description: `Status set to "${formatStatus(newStatus)}"`, variant: 'success' });
    } catch (e) {
      setDisplayStatus(prev => ({ ...prev, [orderId]: prevStatus }));
      toast({ title: 'Update Failed', description: e instanceof Error ? e.message : 'Failed to update status', variant: 'destructive' });
    }
  };

  // ── Order Workflow Actions ─────────────────────────────────────────────────────

  const handleOrderAction = async (
    orderId: string,
    action: 'pack' | 'pickup' | 'out-for-delivery' | 'deliver',
    label: string
  ) => {
    const confirmed = await confirm({
      title: `Confirm: ${label}`,
      message: `Are you sure you want to ${label.toLowerCase()} this order?`,
      confirmText: label,
      cancelText: 'Cancel',
      confirmColor: 'primary',
    });
    if (!confirmed) return;

    const endpointMap: Record<string, string> = {
      pack:               API_CONFIG.ENDPOINTS.ADMIN.ORDER_PACK,
      pickup:             API_CONFIG.ENDPOINTS.ADMIN.ORDER_PICKUP,
      'out-for-delivery': API_CONFIG.ENDPOINTS.ADMIN.ORDER_OUT_FOR_DELIVERY,
      deliver:            API_CONFIG.ENDPOINTS.ADMIN.ORDER_DELIVER,
    };

    try {
      const url = buildApiUrl(replaceUrlParams(endpointMap[action], { orderId }));
      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message || `Failed to ${label}`);
      }
      const data = await res.json();
      const newStatus = data.data?.order?.status || data.data?.status;
      if (newStatus) {
        setOrders(prev => prev.map(o => (o.order_id === orderId ? { ...o, status: newStatus } : o)));
        if (selectedOrder?.order_id === orderId) {
          setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null));
        }
      }
      toast({ title: 'Success', description: `Order ${label.toLowerCase()}ed successfully`, variant: 'success' });
      refreshAll();
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : `Failed to ${label}`, variant: 'destructive' });
    }
  };

  // ── Assign Courier ────────────────────────────────────────────────────────────

  const handleAssignCourier = async (orderId: string) => {
    const courier_name            = prompt('Enter courier name:');
    const courier_tracking_number = prompt('Enter tracking number:');
    const delivery_notes          = prompt('Delivery notes (optional):') || undefined;
    if (!courier_name || !courier_tracking_number) return;

    const confirmed = await confirm({
      title: 'Assign Courier',
      message: `Assign "${courier_name}" to this order?`,
      confirmText: 'Assign',
      cancelText: 'Cancel',
      confirmColor: 'primary',
    });
    if (!confirmed) return;

    try {
      const url = buildApiUrl(replaceUrlParams(API_CONFIG.ENDPOINTS.ADMIN.ORDER_ASSIGN_COURIER, { orderId }));
      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ courier_name, courier_tracking_number, delivery_notes }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message || 'Failed to assign courier');
      }
      toast({ title: 'Courier Assigned', description: `${courier_name} assigned successfully`, variant: 'success' });
      refreshAll();
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed to assign courier', variant: 'destructive' });
    }
  };

  // ── Derived ───────────────────────────────────────────────────────────────────

  const filteredOrders = orders.filter(o => {
    const q = searchTerm.toLowerCase();
    const phone = phoneMap[o.order_id] ?? '';
    const matchSearch =
      o.order_id.toLowerCase().includes(q) ||
      `${o.first_name} ${o.last_name}`.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.tracking_number.toLowerCase().includes(q) ||
      phone.includes(q);                         // also searchable by phone
    return matchSearch && (statusFilter === 'all' || o.status === statusFilter);
  });

  const stats = {
    total:      orders.length,
    delivered:  orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing').length,
    pending:    orders.filter(o => o.status === 'pending').length,
    revenue:    orders.reduce((s, o) => s + parseFloat(o.total_amount), 0),
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage customer orders and fulfillment</p>
        </div>
        <Button onClick={refreshAll} variant="outline" size="sm" disabled={isLoading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Total Orders"  value={stats.total} />
        <StatCard label="Delivered"     value={stats.delivered}  color="text-emerald-600" />
        <StatCard label="Processing"    value={stats.processing} color="text-blue-600" />
        <StatCard label="Pending"       value={stats.pending}    color="text-amber-600" />
        <StatCard label="Total Revenue" value={`KSH ${stats.revenue.toFixed(2)}`} color="text-emerald-700" />
      </div>

      {/* Search & Filter */}
      <Card className="border border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order ID, customer, email, phone or tracking…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-9 px-3 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              {allowedStatuses.map(s => (
                <option key={s} value={s}>{formatStatus(s)}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            All Orders
            <span className="text-sm font-normal text-gray-400">
              ({filteredOrders.length} shown{pagination ? ` · ${pagination.total} total` : ''})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading orders…</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
              <ShoppingBag className="h-8 w-8" />
              <span className="text-sm">No orders found</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    {['Order', 'Customer', 'Items', 'Total', 'Status', 'Payment', 'Date', 'Actions'].map(h => (
                      <TableHead
                        key={h}
                        className="text-xs font-semibold text-gray-500 uppercase tracking-wide first:pl-4 last:pr-4"
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => {
                    const phone = phoneMap[order.order_id];
                    return (
                      <TableRow key={order.order_id} className="hover:bg-gray-50/60 transition-colors align-top">

                        {/* Order ID + tracking */}
                        <TableCell className="pl-4 py-3">
                          <div className="font-mono text-xs text-gray-700" title={order.order_id}>
                            {order.order_id.slice(0, 8)}…
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">
                            {order.tracking_number}
                          </div>
                        </TableCell>

                        {/* Customer — name, email, phone */}
                        <TableCell className="py-3">
                          <div className="font-medium text-sm text-gray-800">
                            {order.first_name} {order.last_name}
                          </div>
                          <div className="text-xs text-gray-400 truncate max-w-[180px]">{order.email}</div>
                          {phone && (
                            <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
                              <Phone className="h-3 w-3" />
                              {phone}
                            </div>
                          )}
                        </TableCell>

                        {/* Items — thumbnail + product name */}
                        <TableCell className="py-3">
                          {order.items && order.items.length > 0 ? (
                            <div className="flex flex-col gap-2">
                              {order.items.slice(0, 2).map(item => (
                                <div key={item.order_item_id} className="flex items-center gap-2">
                                  <ProductImage src={item.product_image} alt={item.product_name} size="sm" />
                                  <div className="min-w-0">
                                    <div className="text-xs font-medium text-gray-800 truncate max-w-[140px]">
                                      {item.product_name}
                                    </div>
                                    <div className="text-xs text-gray-400">×{item.quantity}</div>
                                  </div>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <span className="text-xs text-gray-400 pl-1">
                                  +{order.items.length - 2} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">{order.items_count} item(s)</span>
                          )}
                        </TableCell>

                        {/* Total */}
                        <TableCell className="py-3 font-semibold text-sm text-gray-800 whitespace-nowrap">
                          {formatCurrency(order.total_amount)}
                        </TableCell>

                        {/* Status badge */}
                        <TableCell className="py-3">
                          <StatusBadge status={order.status} />
                        </TableCell>

                        {/* Payment */}
                        <TableCell className="py-3">
                          <PaymentBadge status={order.payment_status} />
                          <div className="text-xs text-gray-400 mt-1">
                            {order.payment_method?.replace(/_/g, ' ')}
                          </div>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="py-3 text-xs text-gray-600 whitespace-nowrap">
                          {formatDate(order.order_date)}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}
                              title="View order details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            <select
                              value={displayStatus[order.order_id] ?? order.status}
                              onChange={e => handleStatusDropdownChange(order, e.target.value)}
                              className="h-8 text-xs border border-gray-200 rounded-md px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                              {allowedStatuses.map(s => (
                                <option key={s} value={s}>{formatStatus(s)}</option>
                              ))}
                            </select>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && pagination && pagination.pages > 1 && (
            <div className="flex justify-end px-4 py-3 border-t border-gray-100">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {[...Array(pagination.pages)].map((_, i) => {
                    const p = i + 1;
                    if (p === 1 || p === pagination.pages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            onClick={() => setCurrentPage(p)}
                            isActive={currentPage === p}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (p === currentPage - 2 || p === currentPage + 2) {
                      return <PaginationItem key={p}>…</PaginationItem>;
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
                      className={currentPage === pagination.pages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Order Detail Modal ──────────────────────────────────────────────────── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              Order Details{' '}
              <span className="font-mono text-xs text-gray-400 font-normal">{selectedOrder?.order_id}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (() => {
            const payment = paymentMap[selectedOrder.order_id];
            const phone   = phoneMap[selectedOrder.order_id];
            const receipt = payment ? extractReceipt(payment.raw) : '';

            return (
              <div className="space-y-6 pt-1">

                {/* Info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Customer */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                      <InfoRow label="Name"  value={`${selectedOrder.first_name} ${selectedOrder.last_name}`} />
                      <InfoRow label="Email" value={selectedOrder.email} />
                      {phone && (
                        <InfoRow label="Phone" value={phone} />
                      )}
                      <InfoRow label="User ID" value={selectedOrder.user_id} mono />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">Shipping Address</p>
                        <p className="text-gray-700 text-sm">{selectedOrder.shipping_address}</p>
                      </div>
                      {selectedOrder.billing_address !== selectedOrder.shipping_address && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-0.5">Billing Address</p>
                          <p className="text-gray-700 text-sm">{selectedOrder.billing_address}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order info */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Order Info</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                      <InfoRow label="Tracking"       value={selectedOrder.tracking_number} mono />
                      <InfoRow label="Order Date"     value={formatDateTime(selectedOrder.order_date)} />
                      <InfoRow label="Last Updated"   value={formatDateTime(selectedOrder.updated_at)} />
                      <InfoRow label="Shipping"       value={selectedOrder.shipping_method} />
                      <InfoRow label="Payment Method" value={selectedOrder.payment_method?.replace(/_/g, ' ')} />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">Status</span>
                        <StatusBadge status={selectedOrder.status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">Payment</span>
                        <PaymentBadge status={selectedOrder.payment_status} />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <span className="font-semibold text-gray-700">Order Total</span>
                        <span className="font-bold text-gray-900">{formatCurrency(selectedOrder.total_amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details block — only shown when payment data exists */}
                {payment && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Payment Details</h3>
                    <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <InfoRow label="Payment ID"      value={payment.payment_id} mono />
                      <InfoRow label="Provider"        value={payment.provider.replace(/_/g, ' ').toUpperCase()} />
                      <InfoRow label="Provider Ref"    value={payment.provider_ref} mono />
                      {receipt && <InfoRow label="M-Pesa Receipt" value={receipt} mono />}
                      {phone   && <InfoRow label="Phone"          value={phone} />}
                      <InfoRow label="Amount Paid"     value={formatCurrency(payment.amount)} />
                      <InfoRow
                        label="Result"
                        value={payment.raw.Body.stkCallback.ResultDesc}
                      />
                    </div>
                  </div>
                )}

                {/* Ordered Items */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Ordered Items ({selectedOrder.items?.length ?? selectedOrder.items_count})
                  </h3>
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Product</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">SKU</th>
                            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Qty</th>
                            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Unit Price</th>
                            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 pr-5">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {selectedOrder.items.map((item, idx) => (
                            <tr key={item.order_item_id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <ProductImage src={item.product_image} alt={item.product_name} />
                                  <div>
                                    <div className="font-medium text-gray-800">{item.product_name}</div>
                                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                                      {item.order_item_id.slice(0, 8)}…
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-mono text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                  {item.sku}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center font-medium text-gray-700">{item.quantity}</td>
                              <td className="px-4 py-3 text-right text-gray-600">KSH {item.unit_price.toFixed(2)}</td>
                              <td className="px-4 py-3 pr-5 text-right font-semibold text-gray-800">
                                KSH {(item.quantity * item.unit_price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-gray-200 bg-gray-50">
                            <td colSpan={4} className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                              Order Total
                            </td>
                            <td className="px-4 py-3 pr-5 text-right text-base font-bold text-gray-900">
                              {formatCurrency(selectedOrder.total_amount)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 gap-2">
                      <Package className="h-5 w-5" />
                      <span className="text-sm">Item details not available</span>
                    </div>
                  )}
                </div>

                {/* Cancellation alert */}
                {selectedOrder.cancellation_requested && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-1">
                    <h3 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" /> Cancellation Requested
                    </h3>
                    {selectedOrder.cancellation_reason && (
                      <p className="text-sm text-red-600">Reason: {selectedOrder.cancellation_reason}</p>
                    )}
                    {selectedOrder.cancellation_rejected && (
                      <p className="text-sm text-red-600 font-medium">Rejected by admin</p>
                    )}
                  </div>
                )}

                {/* Courier info */}
                {selectedOrder.courier_name && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                      <Truck className="h-4 w-4" /> Courier Information
                    </h3>
                    <InfoRow label="Courier"          value={selectedOrder.courier_name} />
                    <InfoRow label="Courier Tracking" value={selectedOrder.courier_tracking_number ?? '—'} mono />
                    {selectedOrder.delivery_notes && (
                      <InfoRow label="Notes" value={selectedOrder.delivery_notes} />
                    )}
                  </div>
                )}

                {/* Timeline */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Timeline</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <TimelineStep label="Order Created" time={selectedOrder.created_at}   done />
                    <TimelineStep label="Packed"        time={selectedOrder.packed_at}    done={!!selectedOrder.packed_at} />
                    <TimelineStep label="Picked Up"     time={selectedOrder.picked_up_at} done={!!selectedOrder.picked_up_at} />
                    <TimelineStep label="Delivered"     time={selectedOrder.delivered_at} done={!!selectedOrder.delivered_at} />
                  </div>
                </div>

                {/* Workflow actions */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.status === 'processing' && (
                      <Button variant="outline" size="sm" className="gap-2"
                        onClick={() => handleOrderAction(selectedOrder.order_id, 'pack', 'Pack Order')}>
                        <Package className="h-4 w-4" /> Pack Order
                      </Button>
                    )}
                    {selectedOrder.status === 'ready_for_pickup' && (
                      <>
                        <Button variant="outline" size="sm" className="gap-2"
                          onClick={() => handleOrderAction(selectedOrder.order_id, 'pickup', 'Mark Picked Up')}>
                          <UserCheck className="h-4 w-4" /> Mark Picked Up
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2"
                          onClick={() => handleAssignCourier(selectedOrder.order_id)}>
                          <Truck className="h-4 w-4" /> Assign Courier
                        </Button>
                      </>
                    )}
                    {selectedOrder.status === 'picked_up_by_courier' && (
                      <Button variant="outline" size="sm" className="gap-2"
                        onClick={() => handleOrderAction(selectedOrder.order_id, 'out-for-delivery', 'Out for Delivery')}>
                        <Truck className="h-4 w-4" /> Out for Delivery
                      </Button>
                    )}
                    {selectedOrder.status === 'out_for_delivery' && (
                      <Button
                        variant="outline" size="sm"
                        className="gap-2 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                        onClick={() => handleOrderAction(selectedOrder.order_id, 'deliver', 'Mark Delivered')}
                      >
                        <CheckCircle className="h-4 w-4" /> Mark Delivered
                      </Button>
                    )}
                    {!['processing', 'ready_for_pickup', 'picked_up_by_courier', 'out_for_delivery'].includes(selectedOrder.status) && (
                      <p className="text-sm text-gray-400 italic">No workflow actions available for this status.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-gray-100">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;