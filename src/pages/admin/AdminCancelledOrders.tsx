import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  Clock,
  XCircle,
  Loader2,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { useMaterialToast } from '@/hooks/useMaterialToast';

interface CancelledOrder {
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
  cancellation_requested: boolean;
  cancellation_reason: string;
  cancellation_approved: boolean;
  cancellation_approved_at: string | null;
  cancellation_rejected: boolean;
  admin_notes: string | null;
  email: string;
  first_name: string;
  last_name: string;
  items_count: string;
}

interface CancellationRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    orders: CancelledOrder[];
    count: number;
  };
  timestamp: string;
}

const AdminCancelledOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CancelledOrder | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState<CancelledOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { adminToken } = useAdminAuth();
  const { toast } = useMaterialToast();

  useEffect(() => {
    if (adminToken) {
      fetchCancellationRequests();
    }
  }, [adminToken]);

  const fetchCancellationRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.CANCELLATION_REQUESTS), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: CancellationRequestsResponse = await response.json();
        setOrders(data.data.orders);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to fetch cancellation requests');
      }
    } catch (error) {
      console.error('Error fetching cancellation requests:', error);
      setError('An error occurred while fetching cancellation requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveRequest = async (orderId: string) => {
    try {
      setIsProcessing(true);
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}/${orderId}/approve-cancellation`),
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ admin_notes: adminNotes }),
        }
      );

      if (response.ok) {
        toast({ description: 'Cancellation request approved successfully', duration: 3000 });
        fetchCancellationRequests();
        setIsOrderModalOpen(false);
        setAdminNotes('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast({ description: errorData.message || 'Failed to approve cancellation request', variant: 'destructive', duration: 3000 });
      }
    } catch (error) {
      console.error('Error approving cancellation:', error);
      toast({ description: 'An error occurred while approving the cancellation', variant: 'destructive', duration: 3000 });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectRequest = async (orderId: string) => {
    try {
      setIsProcessing(true);
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.ADMIN.ORDERS}/${orderId}/reject-cancellation`),
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ admin_notes: adminNotes }),
        }
      );

      if (response.ok) {
        toast({ description: 'Cancellation request rejected successfully', duration: 3000 });
        fetchCancellationRequests();
        setIsOrderModalOpen(false);
        setAdminNotes('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast({ description: errorData.message || 'Failed to reject cancellation request', variant: 'destructive', duration: 3000 });
      }
    } catch (error) {
      console.error('Error rejecting cancellation:', error);
      toast({ description: 'An error occurred while rejecting the cancellation', variant: 'destructive', duration: 3000 });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (order: CancelledOrder) => {
    if (order.cancellation_approved) {
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    }
    if (order.cancellation_rejected) {
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
  };

  const getStatusIcon = (order: CancelledOrder) => {
    if (order.cancellation_approved) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    if (order.cancellation_rejected) {
      return <XCircle className="h-4 w-4 text-red-600" />;
    }
    return <Clock className="h-4 w-4 text-yellow-600" />;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tracking_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleViewOrder = (order: CancelledOrder) => {
    setSelectedOrder(order);
    setAdminNotes(order.admin_notes || '');
    setIsOrderModalOpen(true);
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => !o.cancellation_approved && !o.cancellation_rejected).length,
    approved: orders.filter(o => o.cancellation_approved).length,
    rejected: orders.filter(o => o.cancellation_rejected).length,
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cancellation Requests</h1>
          <p className="text-gray-600 text-sm">Manage order cancellation requests from customers</p>
        </div>
        <Button 
          onClick={fetchCancellationRequests} 
          variant="outline" 
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
            <p className="text-xs text-gray-600">Total Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-yellow-600">{orderStats.pending}</div>
            <p className="text-xs text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-green-600">{orderStats.approved}</div>
            <p className="text-xs text-gray-600">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xl font-bold text-red-600">{orderStats.rejected}</div>
            <p className="text-xs text-gray-600">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by order ID, customer name, email, or tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Cancellation Requests ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading cancellation requests...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <XCircle className="h-12 w-12 mb-2 text-gray-400" />
              <p>No cancellation requests found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Cancellation Reason</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {order.cancellation_reason || 'No reason provided'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(order.updated_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.updated_at).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order)}
                        {getStatusBadge(order)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cancellation Request Details - {selectedOrder?.order_id}</DialogTitle>
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
                    <p><span className="font-medium">Order Status:</span> {selectedOrder.status}</p>
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
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Cancellation Information</h3>
                <div className="border rounded-lg p-4 bg-yellow-50">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Cancellation Reason:</p>
                      <p className="text-gray-900 mt-1">{selectedOrder.cancellation_reason || 'No reason provided'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Request Status:</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(selectedOrder)}
                        {getStatusBadge(selectedOrder)}
                      </div>
                    </div>
                    {selectedOrder.cancellation_approved_at && (
                      <div>
                        <p className="font-medium text-gray-700">Processed At:</p>
                        <p className="text-gray-900 mt-1">{new Date(selectedOrder.cancellation_approved_at).toLocaleString()}</p>
                      </div>
                    )}
                    {selectedOrder.admin_notes && (
                      <div>
                        <p className="font-medium text-gray-700">Admin Notes:</p>
                        <p className="text-gray-900 mt-1 bg-white p-2 rounded border">{selectedOrder.admin_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!selectedOrder.cancellation_approved && !selectedOrder.cancellation_rejected && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Admin Notes (Optional)</h3>
                  <Textarea
                    placeholder="Add notes about this decision..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              )}

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsOrderModalOpen(false);
                    setAdminNotes('');
                  }}
                  disabled={isProcessing}
                >
                  Close
                </Button>
                {!selectedOrder.cancellation_approved && !selectedOrder.cancellation_rejected && (
                  <>
                    <Button 
                      variant="destructive"
                      onClick={() => handleRejectRequest(selectedOrder.order_id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Request
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={() => handleApproveRequest(selectedOrder.order_id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Request
                        </>
                      )}
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCancelledOrders;

