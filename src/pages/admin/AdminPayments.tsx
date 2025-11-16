import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
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
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Eye,
  RefreshCw,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Copy,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { useMaterialToast } from '@/hooks/useMaterialToast';

interface RawCallbackItem {
  Name: string;
  Value?: any;
}

interface RawCallback {
  ResultCode: number;
  ResultDesc: string;
  CheckoutRequestID: string;
  MerchantRequestID: string;
  CallbackMetadata?: {
    Item: RawCallbackItem[];
  };
}

interface PaymentRaw {
  Body: {
    stkCallback: RawCallback;
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
  statusCode: number;
  message: string;
  data: {
    payments: Payment[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  timestamp: string;
}

// === Helpers ===
const extractMpesaReceipt = (raw: PaymentRaw): string => {
  try {
    const items = raw.Body.stkCallback.CallbackMetadata?.Item || [];
    const receipt = items.find((i) => i.Name === 'MpesaReceiptNumber')?.Value;
    return receipt || 'N/A';
  } catch {
    return 'N/A';
  }
};

const extractPhone = (raw: PaymentRaw): string => {
  try {
    const items = raw.Body.stkCallback.CallbackMetadata?.Item || [];
    const phone = items.find((i) => i.Name === 'PhoneNumber')?.Value?.toString() || '';
    return phone ? (phone.startsWith('254') ? `+${phone}` : phone) : 'N/A';
  } catch {
    return 'N/A';
  }
};

const formatCurrency = (value: any): string => {
  const num = parseFloat(String(value)) || 0;
  return num.toFixed(2);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: format(date, 'MMM dd, yyyy'),
    time: format(date, 'HH:mm:ss'),
    full: format(date, 'PPPp'),
  };
};

// === Component ===
const AdminPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const { adminToken } = useAdminAuth();
  const { toast } = useMaterialToast();

  // === Fetch Payments ===
  const fetchPayments = useCallback(
    async (page = 1) => {
      if (!adminToken) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const url = new URL(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.PAYMENTS));
        url.searchParams.append('page', page.toString());
        url.searchParams.append('limit', '20');
        if (searchTerm) url.searchParams.append('search', searchTerm);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Authentication failed. Please log in again.');
          } else {
            const errorData = await response.json().catch(() => ({}));
            setError(errorData.message || 'Failed to fetch payments');
          }
          return;
        }

        const data: PaymentsResponse = await response.json();
        const paymentsList = data.data?.payments || [];

        const sorted = [...paymentsList].sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        setPayments(sorted);
        setPagination(data.data?.pagination);
        setCurrentPage(page);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('An error occurred while fetching payments');
      } finally {
        setIsLoading(false);
      }
    },
    [adminToken, searchTerm]
  );

  // Initial load
  useEffect(() => {
    if (adminToken) fetchPayments(1);
  }, [adminToken]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => fetchPayments(1), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchPayments]);

  // === Filtered Payments ===
  const filteredPayments = useMemo(() => {
    if (!searchTerm) return payments;
    const lower = searchTerm.toLowerCase();
    return payments.filter((p) => {
      return (
        p.payment_id.toLowerCase().includes(lower) ||
        p.order_id.toLowerCase().includes(lower) ||
        p.provider_ref.toLowerCase().includes(lower) ||
        extractMpesaReceipt(p.raw).toLowerCase().includes(lower) ||
        extractPhone(p.raw).toLowerCase().includes(lower) ||
        p.user_email.toLowerCase().includes(lower)
      );
    });
  }, [payments, searchTerm]);

  // === Stats ===
  const paymentStats = useMemo(() => {
    const completed = payments.filter((p) =>
      ['success', 'completed', 'paid'].includes(p.status.toLowerCase())
    ).length;
    const pending = payments.filter((p) => p.status.toLowerCase() === 'pending').length;
    const failed = payments.filter((p) =>
      ['failed', 'cancelled'].includes(p.status.toLowerCase())
    ).length;
    const totalAmount = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    return { total: payments.length, completed, pending, failed, totalAmount };
  }, [payments]);

  // === UI Helpers ===
  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    if (['success', 'completed', 'paid'].includes(s))
      return <Badge className="bg-green-100 text-green-800">Success</Badge>;
    if (s === 'pending')
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    if (['failed', 'cancelled'].includes(s))
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toLowerCase();
    if (['success', 'completed', 'paid'].includes(s))
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (s === 'pending') return <Clock className="h-4 w-4 text-yellow-600" />;
    if (['failed', 'cancelled'].includes(s))
      return <XCircle className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-gray-600" />;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: `${label} copied to clipboard.` });
  };

  // === Export to CSV ===
  const exportToCSV = () => {
    const headers = [
      'Payment ID',
      'Order ID',
      'Email',
      'Amount (KSH)',
      'Method',
      'Status',
      'MPESA Reference No.',
      'Phone',
      'Date',
    ];

    const rows = filteredPayments.map((p) => [
      p.payment_id,
      p.order_id,
      p.user_email,
      formatCurrency(p.amount),
      p.provider.toUpperCase(),
      p.status,
      extractMpesaReceipt(p.raw),
      extractPhone(p.raw),
      formatDate(p.created_at).date,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const SkeletonRow = () => (
    <TableRow>
      {[...Array(9)].map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </TableCell>
      ))}
    </TableRow>
  );

  // === Render ===
  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 text-sm">View and manage all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => fetchPayments(currentPage)}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{paymentStats.total}</div>
            <p className="text-xs text-gray-600">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{paymentStats.completed}</div>
            <p className="text-xs text-gray-600">Success</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{paymentStats.pending}</div>
            <p className="text-xs text-gray-600">Pending</p>
 eccell
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{paymentStats.failed}</div>
            <p className="text-xs text-gray-600">Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-600">
              KSH {formatCurrency(paymentStats.totalAmount)}
            </div>
            <p className="text-xs text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by payment ID, order ID, receipt, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Payments ({filteredPayments.length})
            {pagination && (
              <span className="text-sm text-gray-500 ml-2">
                (Page {currentPage} of {pagination.pages}, Total: {pagination.total})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>MPESA Reference No.</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </TableBody>
            </Table>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No payments match your search.' : 'No payments found.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>MPESA Reference No.</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => {
                      const created = formatDate(payment.created_at);
                      const receipt = extractMpesaReceipt(payment.raw);
                      const phone = extractPhone(payment.raw);

                      return (
                        <TableRow key={payment.payment_id}>
                          <TableCell className="font-medium text-xs font-mono">
                            {payment.payment_id}
                          </TableCell>
                          <TableCell className="text-sm">{payment.order_id}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{payment.user_email}</div>
                              <div className="text-xs text-gray-500">{phone}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            KSH {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {payment.provider.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(payment.status)}
                              {getStatusBadge(payment.status)}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs font-mono">{receipt}</TableCell>
                          <TableCell>
                            <div className="text-sm">{created.date}</div>
                            <div className="text-xs text-gray-500">{created.time}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewPayment(payment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
                    {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
                    {pagination.total}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage <= 1}
                      onClick={() => fetchPayments(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Prev
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage >= pagination.pages}
                      onClick={() => fetchPayments(currentPage + 1)}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Payment ID</p>
                  <p className="font-mono text-sm flex items-center gap-2">
                    {selectedPayment.payment_id}
                    <button
                      onClick={() => copyToClipboard(selectedPayment.payment_id, 'Payment ID')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </p>
                </div>
                {getStatusBadge(selectedPayment.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Order ID:</span>
                      <span className="font-mono">{selectedPayment.order_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Amount:</span>
                      <span className="font-medium">KSH {formatCurrency(selectedPayment.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Method:</span>
                      <span>{selectedPayment.provider.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Provider Ref:</span>
                      <span className="font-mono text-xs break-all">
                        {selectedPayment.provider_ref}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">MPESA Reference No.:</span>
                      <span className="font-mono text-xs">
                        {extractMpesaReceipt(selectedPayment.raw)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{extractPhone(selectedPayment.raw)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Customer & Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{selectedPayment.user_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created:</span>
                      <span>{formatDate(selectedPayment.created_at).full}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Updated:</span>
                      <span>{formatDate(selectedPayment.updated_at).full}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// === EXPORT THE COMPONENT ===
export default AdminPayments;