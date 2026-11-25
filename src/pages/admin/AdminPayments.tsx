// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { format } from 'date-fns';
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
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Search,
//   Eye,
//   RefreshCw,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Copy,
//   Download,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { useAdminAuth } from '@/context/AdminAuthContext';
// import { buildApiUrl, API_CONFIG } from '@/lib/config';
// import { useMaterialToast } from '@/hooks/useMaterialToast';

// interface RawCallbackItem {
//   Name: string;
//   Value?: any;
// }

// interface RawCallback {
//   ResultCode: number;
//   ResultDesc: string;
//   CheckoutRequestID: string;
//   MerchantRequestID: string;
//   CallbackMetadata?: {
//     Item: RawCallbackItem[];
//   };
// }

// interface PaymentRaw {
//   Body: {
//     stkCallback: RawCallback;
//   };
// }

// interface Payment {
//   payment_id: string;
//   order_id: string;
//   provider: string;
//   amount: string;
//   status: string;
//   provider_ref: string;
//   raw: PaymentRaw;
//   created_at: string;
//   updated_at: string;
//   user_email: string;
// }

// interface PaymentsResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     payments: Payment[];
//     pagination?: {
//       page: number;
//       limit: number;
//       total: number;
//       pages: number;
//     };
//   };
//   timestamp: string;
// }

// // === Helpers ===
// const extractMpesaReceipt = (raw: PaymentRaw): string => {
//   try {
//     const items = raw.Body.stkCallback.CallbackMetadata?.Item || [];
//     const receipt = items.find((i) => i.Name === 'MpesaReceiptNumber')?.Value;
//     return receipt || 'N/A';
//   } catch {
//     return 'N/A';
//   }
// };

// const extractPhone = (raw: PaymentRaw): string => {
//   try {
//     const items = raw.Body.stkCallback.CallbackMetadata?.Item || [];
//     const phone = items.find((i) => i.Name === 'PhoneNumber')?.Value?.toString() || '';
//     return phone ? (phone.startsWith('254') ? `+${phone}` : phone) : 'N/A';
//   } catch {
//     return 'N/A';
//   }
// };

// const formatCurrency = (value: any): string => {
//   const num = parseFloat(String(value)) || 0;
//   return num.toFixed(2);
// };

// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return {
//     date: format(date, 'MMM dd, yyyy'),
//     time: format(date, 'HH:mm:ss'),
//     full: format(date, 'PPPp'),
//   };
// };

// // === Component ===
// const AdminPayments: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState<any>(null);

//   const { adminToken } = useAdminAuth();
//   const { toast } = useMaterialToast();

//   // === Fetch Payments ===
//   const fetchPayments = useCallback(
//     async (page = 1) => {
//       if (!adminToken) {
//         setError('Authentication required. Please log in.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setError(null);

//         const url = new URL(buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN.PAYMENTS));
//         url.searchParams.append('page', page.toString());
//         url.searchParams.append('limit', '20');
//         if (searchTerm) url.searchParams.append('search', searchTerm);

//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Authentication failed. Please log in again.');
//           } else {
//             const errorData = await response.json().catch(() => ({}));
//             setError(errorData.message || 'Failed to fetch payments');
//           }
//           return;
//         }

//         const data: PaymentsResponse = await response.json();
//         const paymentsList = data.data?.payments || [];

//         const sorted = [...paymentsList].sort((a, b) => {
//           return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//         });

//         setPayments(sorted);
//         setPagination(data.data?.pagination);
//         setCurrentPage(page);
//       } catch (err) {
//         console.error('Error fetching payments:', err);
//         setError('An error occurred while fetching payments');
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [adminToken, searchTerm]
//   );

//   // Initial load
//   useEffect(() => {
//     if (adminToken) fetchPayments(1);
//   }, [adminToken]);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => fetchPayments(1), 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm, fetchPayments]);

//   // === Filtered Payments ===
//   const filteredPayments = useMemo(() => {
//     if (!searchTerm) return payments;
//     const lower = searchTerm.toLowerCase();
//     return payments.filter((p) => {
//       return (
//         p.payment_id.toLowerCase().includes(lower) ||
//         p.order_id.toLowerCase().includes(lower) ||
//         p.provider_ref.toLowerCase().includes(lower) ||
//         extractMpesaReceipt(p.raw).toLowerCase().includes(lower) ||
//         extractPhone(p.raw).toLowerCase().includes(lower) ||
//         p.user_email.toLowerCase().includes(lower)
//       );
//     });
//   }, [payments, searchTerm]);

//   // === Stats ===
//   const paymentStats = useMemo(() => {
//     const completed = payments.filter((p) =>
//       ['success', 'completed', 'paid'].includes(p.status.toLowerCase())
//     ).length;
//     const pending = payments.filter((p) => p.status.toLowerCase() === 'pending').length;
//     const failed = payments.filter((p) =>
//       ['failed', 'cancelled'].includes(p.status.toLowerCase())
//     ).length;
//     const totalAmount = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

//     return { total: payments.length, completed, pending, failed, totalAmount };
//   }, [payments]);

//   // === UI Helpers ===
//   const getStatusBadge = (status: string) => {
//     const s = status?.toLowerCase();
//     if (['success', 'completed', 'paid'].includes(s))
//       return <Badge className="bg-green-100 text-green-800">Success</Badge>;
//     if (s === 'pending')
//       return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
//     if (['failed', 'cancelled'].includes(s))
//       return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
//     return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
//   };

//   const getStatusIcon = (status: string) => {
//     const s = status?.toLowerCase();
//     if (['success', 'completed', 'paid'].includes(s))
//       return <CheckCircle className="h-4 w-4 text-green-600" />;
//     if (s === 'pending') return <Clock className="h-4 w-4 text-yellow-600" />;
//     if (['failed', 'cancelled'].includes(s))
//       return <XCircle className="h-4 w-4 text-red-600" />;
//     return <Clock className="h-4 w-4 text-gray-600" />;
//   };

//   const copyToClipboard = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     toast({ title: 'Copied!', description: `${label} copied to clipboard.` });
//   };

//   // === Export to CSV ===
//   const exportToCSV = () => {
//     const headers = [
//       'Payment ID',
//       'Order ID',
//       'Email',
//       'Amount (KSH)',
//       'Method',
//       'Status',
//       'MPESA Reference No.',
//       'Phone',
//       'Date',
//     ];

//     const rows = filteredPayments.map((p) => [
//       p.payment_id,
//       p.order_id,
//       p.user_email,
//       formatCurrency(p.amount),
//       p.provider.toUpperCase(),
//       p.status,
//       extractMpesaReceipt(p.raw),
//       extractPhone(p.raw),
//       formatDate(p.created_at).date,
//     ]);

//     const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
//     const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `payments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleViewPayment = (payment: Payment) => {
//     setSelectedPayment(payment);
//     setIsPaymentModalOpen(true);
//   };

//   const SkeletonRow = () => (
//     <TableRow>
//       {[...Array(9)].map((_, i) => (
//         <TableCell key={i}>
//           <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
//         </TableCell>
//       ))}
//     </TableRow>
//   );

//   // === Render ===
//   return (
//     <div className="space-y-6 p-1">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
//           <p className="text-gray-600 text-sm">View and manage all payment transactions</p>
//         </div>
//         <div className="flex gap-2">
//           <Button onClick={exportToCSV} size="sm" variant="outline">
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//           <Button
//             onClick={() => fetchPayments(currentPage)}
//             variant="outline"
//             size="sm"
//             disabled={isLoading}
//           >
//             <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//           {error}
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-gray-900">{paymentStats.total}</div>
//             <p className="text-xs text-gray-600">Total</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-green-600">{paymentStats.completed}</div>
//             <p className="text-xs text-gray-600">Success</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-yellow-600">{paymentStats.pending}</div>
//             <p className="text-xs text-gray-600">Pending</p>
//  eccell
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-red-600">{paymentStats.failed}</div>
//             <p className="text-xs text-gray-600">Failed</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-emerald-600">
//               KSH {formatCurrency(paymentStats.totalAmount)}
//             </div>
//             <p className="text-xs text-gray-600">Total Revenue</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search by payment ID, order ID, receipt, phone, or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             All Payments ({filteredPayments.length})
//             {pagination && (
//               <span className="text-sm text-gray-500 ml-2">
//                 (Page {currentPage} of {pagination.pages}, Total: {pagination.total})
//               </span>
//             )}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Payment ID</TableHead>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Method</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>MPESA Reference No.</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {[...Array(5)].map((_, i) => (
//                   <SkeletonRow key={i} />
//                 ))}
//               </TableBody>
//             </Table>
//           ) : filteredPayments.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
//               <p className="text-gray-500">
//                 {searchTerm ? 'No payments match your search.' : 'No payments found.'}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Payment ID</TableHead>
//                       <TableHead>Order ID</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Amount</TableHead>
//                       <TableHead>Method</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>MPESA Reference No.</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredPayments.map((payment) => {
//                       const created = formatDate(payment.created_at);
//                       const receipt = extractMpesaReceipt(payment.raw);
//                       const phone = extractPhone(payment.raw);

//                       return (
//                         <TableRow key={payment.payment_id}>
//                           <TableCell className="font-medium text-xs font-mono">
//                             {payment.payment_id}
//                           </TableCell>
//                           <TableCell className="text-sm">{payment.order_id}</TableCell>
//                           <TableCell>
//                             <div className="text-sm">
//                               <div className="font-medium">{payment.user_email}</div>
//                               <div className="text-xs text-gray-500">{phone}</div>
//                             </div>
//                           </TableCell>
//                           <TableCell className="font-medium">
//                             KSH {formatCurrency(payment.amount)}
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant="outline" className="text-xs">
//                               {payment.provider.toUpperCase()}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <div className="flex items-center gap-2">
//                               {getStatusIcon(payment.status)}
//                               {getStatusBadge(payment.status)}
//                             </div>
//                           </TableCell>
//                           <TableCell className="text-xs font-mono">{receipt}</TableCell>
//                           <TableCell>
//                             <div className="text-sm">{created.date}</div>
//                             <div className="text-xs text-gray-500">{created.time}</div>
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => handleViewPayment(payment)}
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               {pagination && pagination.pages > 1 && (
//                 <div className="flex justify-between items-center mt-6">
//                   <p className="text-sm text-gray-600">
//                     Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
//                     {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
//                     {pagination.total}
//                   </p>
//                   <div className="flex gap-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       disabled={currentPage <= 1}
//                       onClick={() => fetchPayments(currentPage - 1)}
//                     >
//                       <ChevronLeft className="h-4 w-4" />
//                       Prev
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       disabled={currentPage >= pagination.pages}
//                       onClick={() => fetchPayments(currentPage + 1)}
//                     >
//                       Next
//                       <ChevronRight className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Detail Modal */}
//       <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
//         <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Payment Details</DialogTitle>
//           </DialogHeader>

//           {selectedPayment && (
//             <div className="space-y-6 py-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-sm text-gray-500">Payment ID</p>
//                   <p className="font-mono text-sm flex items-center gap-2">
//                     {selectedPayment.payment_id}
//                     <button
//                       onClick={() => copyToClipboard(selectedPayment.payment_id, 'Payment ID')}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <Copy className="h-3 w-3" />
//                     </button>
//                   </p>
//                 </div>
//                 {getStatusBadge(selectedPayment.status)}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Payment Info</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Order ID:</span>
//                       <span className="font-mono">{selectedPayment.order_id}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Amount:</span>
//                       <span className="font-medium">KSH {formatCurrency(selectedPayment.amount)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Method:</span>
//                       <span>{selectedPayment.provider.toUpperCase()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Provider Ref:</span>
//                       <span className="font-mono text-xs break-all">
//                         {selectedPayment.provider_ref}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">MPESA Reference No.:</span>
//                       <span className="font-mono text-xs">
//                         {extractMpesaReceipt(selectedPayment.raw)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Phone:</span>
//                       <span>{extractPhone(selectedPayment.raw)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Customer & Timeline</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="font-medium">Email:</span>
//                       <span>{selectedPayment.user_email}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Created:</span>
//                       <span>{formatDate(selectedPayment.created_at).full}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium">Updated:</span>
//                       <span>{formatDate(selectedPayment.updated_at).full}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4">
//                 <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
//                   Close
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// // === EXPORT THE COMPONENT ===
// export default AdminPayments;
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
  CheckCircle,
  XCircle,
  Clock,
  Copy,
  Download,
  ChevronLeft,
  ChevronRight,
  Phone,
  AlertTriangle,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { useMaterialToast } from '@/hooks/useMaterialToast';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface ApiPayment {
  payment_id: string;
  order_id: string;
  provider: string;
  amount: number | string;
  status: string;
  provider_ref: string | null;
  raw: string | Record<string, any> | null; // API sends a JSON string
  created_at: string | null;
  updated_at: string | null;
  user_email: string | null;
  // Optional — picked up automatically once the backend returns them
  customer_name?: string | null;
  user_name?: string | null;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  phone?: string | null;
  phone_number?: string | null;
}

type StatusGroup = 'success' | 'pending' | 'failed' | 'other';
type PhoneSource = 'mpesa' | 'record' | 'reference' | null;

interface Payment extends ApiPayment {
  amountNum: number;
  statusGroup: StatusGroup;
  customerName: string | null;
  receipt: string | null;
  phone: string | null; // formatted, e.g. +254 114 096 574
  phoneRaw: string | null; // digits only, e.g. 254114096574
  phoneSource: PhoneSource;
  resultCode: number | null;
  resultDesc: string | null;
  reason: string | null; // plain-language explanation for non-successful payments
  mpesaTime: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/* ------------------------------------------------------------------ */
/* M-Pesa result codes → plain language                               */
/* ------------------------------------------------------------------ */

const RESULT_CODE_REASONS: Record<number, string> = {
  1: 'Insufficient M-Pesa balance',
  17: 'M-Pesa limit or restriction on the account',
  1001: 'Another M-Pesa transaction was in progress',
  1019: 'Payment request expired',
  1025: 'Could not send the payment prompt',
  1032: 'Cancelled by customer',
  1036: 'Could not send the payment prompt',
  1037: 'Customer phone unreachable',
  1038: 'No response from customer',
  2001: 'Wrong M-Pesa PIN entered',
  9999: 'Could not send the payment prompt',
};

const ABANDONED_AFTER_MS = 10 * 60 * 1000; // initiated for >10 min with no callback

/* ------------------------------------------------------------------ */
/* Parsing helpers                                                    */
/* ------------------------------------------------------------------ */

const parseRaw = (raw: ApiPayment['raw']): any => {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw;
};

const getCallbackItem = (callback: any, name: string): any =>
  callback?.CallbackMetadata?.Item?.find((i: any) => i?.Name === name)?.Value;

// Normalizes any Kenyan number to 2547XXXXXXXX / 2541XXXXXXXX digits
const normalizeKePhone = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  let digits = String(value).replace(/\D/g, '');
  if (!digits) return null;
  if (digits.startsWith('0') && digits.length === 10) digits = `254${digits.slice(1)}`;
  if (/^[71]\d{8}$/.test(digits)) digits = `254${digits}`;
  if (!/^254[71]\d{8}$/.test(digits)) return null;
  if (/^254[71]0{8}$/.test(digits)) return null; // sandbox placeholder
  return digits;
};

const formatKePhone = (digits: string): string =>
  `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;

// Safaricom CheckoutRequestID: ws_CO_<DDMMYYYY><HHMMSS><mmm><9-digit phone>
const phoneFromCheckoutRef = (ref: string | null | undefined): string | null => {
  const match = ref?.match(/^ws_CO_\d{17}(\d{9})$/);
  return match ? normalizeKePhone(match[1]) : null;
};

// M-Pesa TransactionDate: 20261124190508 (Nairobi time)
const parseMpesaTime = (value: unknown): Date | null => {
  const s = value === undefined || value === null ? '' : String(value);
  const m = s.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!m) return null;
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}+03:00`);
  return isNaN(d.getTime()) ? null : d;
};

// DB timestamps like "2026-11-24 16:04:47" are UTC without a timezone marker
const parseDbDate = (value: string | null | undefined): Date | null => {
  if (!value) return null;
  const iso = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?$/.test(value)
    ? `${value.replace(' ', 'T')}Z`
    : value;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
};

const getStatusGroup = (status: string | null | undefined): StatusGroup => {
  const s = (status || '').toLowerCase();
  if (['success', 'completed', 'paid'].includes(s)) return 'success';
  if (['pending', 'initiated', 'processing'].includes(s)) return 'pending';
  if (['failed', 'cancelled', 'canceled', 'timeout', 'expired'].includes(s)) return 'failed';
  return 'other';
};

const getCustomerName = (p: ApiPayment): string | null => {
  const direct = p.customer_name || p.user_name || p.full_name;
  if (direct && direct.trim()) return direct.trim();
  const joined = [p.first_name, p.last_name].filter(Boolean).join(' ').trim();
  if (joined) return joined;
  return p.username?.trim() || null;
};

const getReason = (
  group: StatusGroup,
  resultCode: number | null,
  resultDesc: string | null,
  createdAt: Date | null
): string | null => {
  if (group === 'success') return null;

  if (group === 'pending') {
    if (createdAt && Date.now() - createdAt.getTime() > ABANDONED_AFTER_MS) {
      return 'No response received (abandoned)';
    }
    return 'Waiting for customer PIN';
  }

  if (resultCode !== null && RESULT_CODE_REASONS[resultCode]) return RESULT_CODE_REASONS[resultCode];
  if (resultDesc) return resultDesc.replace(/\.$/, '');
  return 'Payment failed (no reason given)';
};

const normalizePayment = (p: ApiPayment): Payment => {
  const raw = parseRaw(p.raw);
  const callback = raw?.Body?.stkCallback ?? null;

  // Phone: M-Pesa callback → payment record → CheckoutRequestID
  let phoneRaw = normalizeKePhone(getCallbackItem(callback, 'PhoneNumber'));
  let phoneSource: PhoneSource = phoneRaw ? 'mpesa' : null;

  if (!phoneRaw) {
    phoneRaw = normalizeKePhone(p.phone ?? p.phone_number);
    if (phoneRaw) phoneSource = 'record';
  }

  if (!phoneRaw) {
    const checkoutId =
      p.provider_ref ||
      callback?.CheckoutRequestID ||
      raw?.response?.CheckoutRequestID ||
      raw?.CheckoutRequestID;
    phoneRaw = phoneFromCheckoutRef(checkoutId);
    if (phoneRaw) phoneSource = 'reference';
  }

  const receipt = getCallbackItem(callback, 'MpesaReceiptNumber');
  const rawCode = callback?.ResultCode;
  const resultCode =
    rawCode === undefined || rawCode === null || rawCode === '' ? null : Number(rawCode);
  const resultDesc: string | null = callback?.ResultDesc ?? null;
  const statusGroup = getStatusGroup(p.status);
  const createdAt = parseDbDate(p.created_at);

  return {
    ...p,
    amountNum: parseFloat(String(p.amount)) || 0,
    statusGroup,
    customerName: getCustomerName(p),
    receipt: receipt ? String(receipt) : null,
    phone: phoneRaw ? formatKePhone(phoneRaw) : null,
    phoneRaw,
    phoneSource,
    resultCode: Number.isFinite(resultCode as number) ? resultCode : null,
    resultDesc,
    reason: getReason(statusGroup, resultCode, resultDesc, createdAt),
    mpesaTime: parseMpesaTime(getCallbackItem(callback, 'TransactionDate')),
    createdAt,
    updatedAt: parseDbDate(p.updated_at),
  };
};

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

const formatCurrency = (value: number): string =>
  value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmt = (date: Date | null, pattern: string): string => (date ? format(date, pattern) : '—');

const csvCell = (value: unknown): string => `"${String(value ?? '').replace(/"/g, '""')}"`;

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

const AdminPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const { adminToken } = useAdminAuth();
  const { toast } = useMaterialToast();

  /* -------------------------- Fetch ----------------------------- */

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
        if (searchTerm.trim()) url.searchParams.append('search', searchTerm.trim());

        const response = await fetch(url, {
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

        const data = await response.json();
        const list: ApiPayment[] = data?.data?.payments || [];

        const normalized = list
          .map(normalizePayment)
          .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));

        setPayments(normalized);
        setPagination(data?.data?.pagination ?? null);
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

  // Initial load + debounced search
  useEffect(() => {
    const timer = setTimeout(() => fetchPayments(1), searchTerm ? 500 : 0);
    return () => clearTimeout(timer);
  }, [fetchPayments, searchTerm]);

  /* -------------------------- Derived --------------------------- */

  const filteredPayments = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return payments;
    const termDigits = term.replace(/\D/g, '');

    return payments.filter((p) => {
      const haystack = [
        p.customerName,
        p.user_email,
        p.phone,
        p.receipt,
        p.reason,
        p.status,
        p.payment_id,
        p.order_id,
        p.provider_ref,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (haystack.includes(term)) return true;

      // Phone numbers typed in any format: 0114..., 254114..., +254 114...
      if (termDigits.length >= 4 && p.phoneRaw) {
        const local = `0${p.phoneRaw.slice(3)}`;
        return p.phoneRaw.includes(termDigits) || local.includes(termDigits);
      }
      return false;
    });
  }, [payments, searchTerm]);

  const paymentStats = useMemo(() => {
    const completed = payments.filter((p) => p.statusGroup === 'success');
    return {
      total: payments.length,
      completed: completed.length,
      pending: payments.filter((p) => p.statusGroup === 'pending').length,
      failed: payments.filter((p) => p.statusGroup === 'failed').length,
      totalAmount: completed.reduce((sum, p) => sum + p.amountNum, 0),
    };
  }, [payments]);

  // Counts of each reason among unsuccessful payments, most common first
  const reasonBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    payments.forEach((p) => {
      if (p.reason) counts.set(p.reason, (counts.get(p.reason) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [payments]);

  /* -------------------------- UI helpers ------------------------ */

  const getStatusBadge = (p: Payment) => {
    switch (p.statusGroup) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            {p.status.toLowerCase() === 'initiated' ? 'Initiated' : 'Pending'}
          </Badge>
        );
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 capitalize">{p.status}</Badge>;
    }
  };

  const getStatusIcon = (p: Payment) => {
    switch (p.statusGroup) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const reasonClass = (p: Payment) =>
    p.statusGroup === 'failed' ? 'text-red-700' : 'text-yellow-700';

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied!', description: `${label} copied to clipboard.` });
    } catch {
      toast({ description: `Couldn't copy ${label}`, variant: 'destructive' });
    }
  };

  const PhoneCell: React.FC<{ p: Payment }> = ({ p }) =>
    p.phone ? (
      <div className="flex items-center gap-1">
        <a
          href={`tel:+${p.phoneRaw}`}
          className="text-sm font-medium text-gray-900 hover:text-emerald-700 whitespace-nowrap"
        >
          {p.phone}
        </a>
        <button
          onClick={() => copyToClipboard(`+${p.phoneRaw}`, 'Phone number')}
          className="text-gray-400 hover:text-gray-600"
          title="Copy phone number"
        >
          <Copy className="h-3 w-3" />
        </button>
        {p.phoneSource === 'reference' && (
          <span
            className="text-[10px] text-gray-400 whitespace-nowrap"
            title="Read from the M-Pesa request ID because the callback had no phone number"
          >
            (ref)
          </span>
        )}
      </div>
    ) : (
      <span className="text-xs text-gray-400">—</span>
    );

  const CustomerCell: React.FC<{ p: Payment }> = ({ p }) => (
    <div className="min-w-0">
      <div className="text-sm font-medium text-gray-900 truncate" title={p.customerName || undefined}>
        {p.customerName || p.user_email || 'Unknown customer'}
      </div>
      {p.customerName && p.user_email && (
        <div className="text-xs text-gray-500 truncate" title={p.user_email}>
          {p.user_email}
        </div>
      )}
    </div>
  );

  /* -------------------------- Export ---------------------------- */

  const exportToCSV = () => {
    const headers = [
      'Customer',
      'Email',
      'Phone',
      'Amount (KSH)',
      'Method',
      'Status',
      'Reason',
      'M-Pesa Receipt',
      'Date (Nairobi)',
      'Payment ID',
      'Order ID',
    ];

    const rows = filteredPayments.map((p) => [
      p.customerName ?? '',
      p.user_email ?? '',
      p.phoneRaw ? `+${p.phoneRaw}` : '',
      p.amountNum.toFixed(2),
      p.provider.toUpperCase(),
      p.status,
      p.reason ?? '',
      p.receipt ?? '',
      fmt(p.createdAt, 'yyyy-MM-dd HH:mm:ss'),
      p.payment_id,
      p.order_id,
    ]);

    const csv = [headers, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
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

  const COLUMN_COUNT = 8;

  const TableHeadRow = () => (
    <TableRow>
      <TableHead>Customer</TableHead>
      <TableHead>Phone</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Status / Reason</TableHead>
      <TableHead>M-Pesa Receipt</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );

  const SkeletonRow = () => (
    <TableRow>
      {[...Array(COLUMN_COUNT)].map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </TableCell>
      ))}
    </TableRow>
  );

  /* -------------------------- Render ---------------------------- */

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 text-sm">View and manage all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} size="sm" variant="outline" disabled={!filteredPayments.length}>
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
            <p className="text-xs text-gray-600">Total (this page)</p>
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
            <p className="text-xs text-gray-600">Pending / Initiated</p>
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
            <p className="text-xs text-gray-600">Revenue (successful)</p>
          </CardContent>
        </Card>
      </div>

      {/* Why payments didn't go through */}
      {reasonBreakdown.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Why payments didn't complete
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {reasonBreakdown.map(([reason, count]) => (
                <button
                  key={reason}
                  onClick={() => setSearchTerm(reason)}
                  className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800"
                  title="Show these payments"
                >
                  {reason} <span className="font-semibold">· {count}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by customer, email, phone (0712… or 254712…), receipt, or reason..."
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
                <TableHeadRow />
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </TableBody>
            </Table>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? 'No payments match your search.' : 'No payments found.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableHeadRow />
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.payment_id}>
                        <TableCell className="max-w-[220px]">
                          <CustomerCell p={payment} />
                        </TableCell>
                        <TableCell>
                          <PhoneCell p={payment} />
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          KSH {formatCurrency(payment.amountNum)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {payment.provider.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[180px]">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment)}
                            {getStatusBadge(payment)}
                          </div>
                          {payment.reason && (
                            <div className={`text-xs mt-1 ${reasonClass(payment)}`}>{payment.reason}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-xs font-mono">{payment.receipt || '—'}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="text-sm">{fmt(payment.createdAt, 'MMM dd, yyyy')}</div>
                          <div className="text-xs text-gray-500">{fmt(payment.createdAt, 'HH:mm:ss')}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewPayment(payment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {pagination && pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * pagination.limit + 1} to{' '}
                    {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage <= 1 || isLoading}
                      onClick={() => fetchPayments(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Prev
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage >= pagination.pages || isLoading}
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPayment.customerName || selectedPayment.user_email || 'Unknown customer'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    KSH {formatCurrency(selectedPayment.amountNum)}
                  </p>
                </div>
                {getStatusBadge(selectedPayment)}
              </div>

              {/* Reason / result */}
              {selectedPayment.reason ? (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    selectedPayment.statusGroup === 'failed'
                      ? 'bg-red-50 text-red-800'
                      : 'bg-yellow-50 text-yellow-800'
                  }`}
                >
                  <span className="font-medium">Reason: </span>
                  {selectedPayment.reason}
                  {selectedPayment.resultDesc &&
                    selectedPayment.resultDesc.replace(/\.$/, '') !== selectedPayment.reason && (
                      <div className="text-xs opacity-80 mt-1">
                        M-Pesa said: "{selectedPayment.resultDesc}"
                        {selectedPayment.resultCode !== null && ` (code ${selectedPayment.resultCode})`}
                      </div>
                    )}
                </div>
              ) : (
                <div className="p-3 rounded-lg text-sm bg-green-50 text-green-800">
                  Payment received successfully.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Customer</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Name:</span>
                      <span className="text-right">{selectedPayment.customerName || '—'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Email:</span>
                      <span className="break-all text-right">{selectedPayment.user_email || '—'}</span>
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                      <span className="font-medium">Phone:</span>
                      <PhoneCell p={selectedPayment} />
                    </div>
                    {selectedPayment.phoneSource === 'reference' && (
                      <p className="text-xs text-gray-500">
                        No phone in the M-Pesa callback; number read from the request ID.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Payment</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Method:</span>
                      <span>{selectedPayment.provider.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                      <span className="font-medium">M-Pesa Receipt:</span>
                      <span className="font-mono text-xs flex items-center gap-1">
                        {selectedPayment.receipt || '—'}
                        {selectedPayment.receipt && (
                          <button
                            onClick={() => copyToClipboard(selectedPayment.receipt!, 'Receipt number')}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Started:</span>
                      <span>{fmt(selectedPayment.createdAt, 'PPPp')}</span>
                    </div>
                    {selectedPayment.mpesaTime && (
                      <div className="flex justify-between gap-4">
                        <span className="font-medium">Paid at:</span>
                        <span>{format(selectedPayment.mpesaTime, 'PPPp')}</span>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Last update:</span>
                      <span>
                        {selectedPayment.updatedAt ? fmt(selectedPayment.updatedAt, 'PPPp') : 'No callback yet'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* References — kept here for support/tracing, hidden from the table */}
              <details className="text-sm border rounded-lg">
                <summary className="cursor-pointer px-3 py-2 font-medium text-gray-700">References</summary>
                <div className="px-3 pb-3 space-y-2">
                  {[
                    ['Payment ID', selectedPayment.payment_id],
                    ['Order ID', selectedPayment.order_id],
                    ['Provider Ref', selectedPayment.provider_ref],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 items-center">
                      <span className="text-gray-600">{label}:</span>
                      <span className="font-mono text-xs break-all text-right flex items-center gap-1">
                        {value || '—'}
                        {value && (
                          <button
                            onClick={() => copyToClipboard(value, label!)}
                            className="text-gray-400 hover:text-gray-600 shrink-0"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </details>

              <div className="flex justify-end gap-2 pt-2">
                {selectedPayment.phoneRaw && (
                  <Button variant="outline" asChild>
                    <a href={`tel:+${selectedPayment.phoneRaw}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call customer
                    </a>
                  </Button>
                )}
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

export default AdminPayments;