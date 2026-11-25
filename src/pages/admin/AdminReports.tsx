// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { 
//   BarChart3, 
//   DollarSign, 
//   Calendar,
//   Download,
//   Users,
//   Package,
//   ShoppingCart
// } from 'lucide-react';
// import { getApiUrl, buildApiUrl, API_CONFIG } from '@/lib/config';
// import { useAdminAuth } from '@/context/AdminAuthContext';

// // API Response interfaces
// interface PeriodData {
//   period: string;
//   revenue: number;
//   orders: number;
// }

// interface SalesReportResponse {
//   status: string;
//   data: {
//     totalRevenue: number;
//     periods: PeriodData[];
//     periodComparisons: any;
//     bestPeriod: {
//       period: string;
//       revenue: number;
//     };
//     worstPeriod: {
//       period: string;
//       revenue: number;
//     };
//     projectionNext: any;
//   };
// }

// const AdminReports: React.FC = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('30');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [salesData, setSalesData] = useState<SalesReportResponse['data'] | null>(null);
//   const [customerData, setCustomerData] = useState<any>(null);
//   const [productData, setProductData] = useState<any>(null);
//   const [orderData, setOrderData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState('sales');
//   const { adminToken } = useAdminAuth();

//   // Convert period selection to API format
//   const getPeriodValue = (period: string): number => {
//     switch (period) {
//       case '7d': return 7;
//       case '30d': return 30;
//       case '90d': return 90;
//       case '1y': return 365;
//       default: return parseInt(period) || 30;
//     }
//   };

//   // API fetch function
//   const fetchSalesReport = async () => {
//     if (!adminToken) {
//       setError('Authentication required. Please log in.');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       // Build query parameters
//       const periodValue = getPeriodValue(selectedPeriod);
//       const params = new URLSearchParams({
//         period: periodValue.toString(),
//         ...(startDate && { start_date: startDate }),
//         ...(endDate && { end_date: endDate }),
//       });
      
//       const url = `${getApiUrl('ADMIN', 'REPORTS.SALES')}?${params.toString()}`;
//       console.log('Fetching sales report from:', url);
      
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${adminToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data: SalesReportResponse = await response.json();
//       console.log('Sales report response:', data);
      
//       if (data.status === 'success') {
//         setSalesData(data.data);
//       } else {
//         throw new Error('Failed to fetch sales report');
//       }
//     } catch (err) {
//       console.error('Error fetching sales report:', err);
//       setError(err instanceof Error ? err.message : 'Failed to fetch sales report');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch customer analytics
//   const fetchCustomerAnalytics = async () => {
//     if (!adminToken) return;
//     try {
//       setLoading(true);
//       const params = new URLSearchParams({
//         format: 'json',
//         ...(startDate && { startDate }),
//         ...(endDate && { endDate }),
//       });
//       const url = `${getApiUrl('ADMIN', 'REPORTS.CUSTOMERS')}?${params.toString()}`;
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${adminToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setCustomerData(data.data || data);
//       }
//     } catch (err) {
//       console.error('Error fetching customer analytics:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch product analytics
//   const fetchProductAnalytics = async () => {
//     if (!adminToken) return;
//     try {
//       setLoading(true);
//       const params = new URLSearchParams({
//         format: 'json',
//         ...(startDate && { startDate }),
//         ...(endDate && { endDate }),
//       });
//       const url = `${getApiUrl('ADMIN', 'REPORTS.PRODUCTS')}?${params.toString()}`;
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${adminToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setProductData(data.data || data);
//       }
//     } catch (err) {
//       console.error('Error fetching product analytics:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch order analytics
//   const fetchOrderAnalytics = async () => {
//     if (!adminToken) return;
//     try {
//       setLoading(true);
//       const params = new URLSearchParams({
//         format: 'json',
//         ...(startDate && { startDate }),
//         ...(endDate && { endDate }),
//       });
//       const url = `${getApiUrl('ADMIN', 'REPORTS.ORDERS')}?${params.toString()}`;
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${adminToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setOrderData(data.data || data);
//       }
//     } catch (err) {
//       console.error('Error fetching order analytics:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load reports on component mount and when filters change
//   useEffect(() => {
//     if (activeTab === 'sales') {
//       fetchSalesReport();
//     } else if (activeTab === 'customers') {
//       fetchCustomerAnalytics();
//     } else if (activeTab === 'products') {
//       fetchProductAnalytics();
//     } else if (activeTab === 'orders') {
//       fetchOrderAnalytics();
//     }
//   }, [adminToken, selectedPeriod, startDate, endDate, activeTab]);

//   // Calculate metrics from API data
//   const totalRevenue = salesData?.totalRevenue || 0;
//   const totalOrders = salesData?.periods.reduce((sum, period) => sum + period.orders, 0) || 0;
//   const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
//   const bestPeriod = salesData?.bestPeriod;
//   const worstPeriod = salesData?.worstPeriod;

//   const periods = [
//     { value: '7', label: 'Last 7 days' },
//     { value: '30', label: 'Last 30 days' },
//     { value: '90', label: 'Last 90 days' },
//     { value: '365', label: 'Last year' }
//   ];

//   const handleExportReport = () => {
//     if (!salesData) {
//       alert('No data to export');
//       return;
//     }

//     // Create sales report data
//     const reportData: any[] = [
//       ['Metric', 'Value'],
//       ['Total Revenue', `KSH ${totalRevenue}`],
//       ['Total Orders', totalOrders],
//       ['Average Order Value', `KSH ${averageOrderValue.toFixed(2)}`],
//       ['Best Period', bestPeriod ? `${bestPeriod.period} (KSH ${bestPeriod.revenue})` : 'N/A'],
//       ['Worst Period', worstPeriod ? `${worstPeriod.period} (KSH ${worstPeriod.revenue})` : 'N/A'],
//       ['Report Period', selectedPeriod + ' days'],
//       ['Generated At', new Date().toISOString()]
//     ];
    
//     // Add periods data
//     if (salesData.periods.length > 0) {
//       reportData.push([]);
//       reportData.push(['Period', 'Revenue', 'Orders']);
//       salesData.periods.forEach(period => {
//         reportData.push([period.period, `KSH ${period.revenue}`, period.orders]);
//       });
//     }
    
//     // Convert to CSV
//     const csvContent = reportData.map(row => 
//       row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
//     ).join('\n');

//     // Create and download CSV file
//     const filename = `sales-report-${selectedPeriod}days-${new Date().toISOString().split('T')[0]}.csv`;
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', filename);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const formatCurrency = (amount: number) => {
//     return `KSH ${amount.toLocaleString()}`;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
//           <p className="text-gray-600 mt-2">View comprehensive analytics and reports</p>
//         </div>
//         <div className="flex space-x-2 flex-wrap gap-2">
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md"
//           >
//             {periods.map(period => (
//               <option key={period.value} value={period.value}>
//                 {period.label}
//               </option>
//             ))}
//           </select>
//           <Input
//             type="date"
//             placeholder="Start Date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md"
//           />
//           <Input
//             type="date"
//             placeholder="End Date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md"
//           />
//           <Button onClick={fetchSalesReport} variant="outline">
//             <Calendar className="h-4 w-4 mr-2" />
//             Refresh
//           </Button>
//           <Button onClick={handleExportReport}>
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Tabs for different reports */}
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="sales">
//             <DollarSign className="h-4 w-4 mr-2" />
//             Sales
//           </TabsTrigger>
//           <TabsTrigger value="customers">
//             <Users className="h-4 w-4 mr-2" />
//             Customers
//           </TabsTrigger>
//           <TabsTrigger value="products">
//             <Package className="h-4 w-4 mr-2" />
//             Products
//           </TabsTrigger>
//           <TabsTrigger value="orders">
//             <ShoppingCart className="h-4 w-4 mr-2" />
//             Orders
//           </TabsTrigger>
//         </TabsList>

//         {/* Sales Report Tab */}
//         <TabsContent value="sales" className="space-y-6">
//           {/* Loading State */}
//       {loading && (
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading sales report...</p>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Error State */}
//       {error && (
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-center text-red-600">
//               <p className="text-lg font-medium">Error loading sales report</p>
//               <p className="text-sm">{error}</p>
//               <Button onClick={fetchSalesReport} className="mt-4">
//                 Try Again
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Revenue Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//                 <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
//               </div>
//               <DollarSign className="h-8 w-8 text-emerald-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Orders</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
//               </div>
//               <BarChart3 className="h-8 w-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
//                 <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</p>
//               </div>
//               <BarChart3 className="h-8 w-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Sales Chart / Period Breakdown */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Sales by Period</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {salesData && salesData.periods.length > 0 ? (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {salesData.periods.map((period, index) => (
//                   <div key={index} className="p-4 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-600">{period.period}</span>
//                       {bestPeriod?.period === period.period && (
//                         <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Best</span>
//                       )}
//                       {worstPeriod?.period === period.period && bestPeriod?.period !== period.period && (
//                         <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Worst</span>
//                       )}
//                     </div>
//                     <div className="text-2xl font-bold text-gray-900">{formatCurrency(period.revenue)}</div>
//                     <div className="text-sm text-gray-600 mt-1">{period.orders} orders</div>
//                   </div>
//                 ))}
//               </div>
//               {bestPeriod && worstPeriod && bestPeriod.period !== worstPeriod.period && (
//                 <div className="grid grid-cols-2 gap-4 pt-4 border-t">
//                   <div className="p-4 bg-green-50 rounded-lg">
//                     <p className="text-sm font-medium text-gray-600">Best Period</p>
//                     <p className="text-xl font-bold text-green-600">{bestPeriod.period}</p>
//                     <p className="text-lg font-semibold text-gray-900">{formatCurrency(bestPeriod.revenue)}</p>
//                   </div>
//                   <div className="p-4 bg-red-50 rounded-lg">
//                     <p className="text-sm font-medium text-gray-600">Worst Period</p>
//                     <p className="text-xl font-bold text-red-600">{worstPeriod.period}</p>
//                     <p className="text-lg font-semibold text-gray-900">{formatCurrency(worstPeriod.revenue)}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
//               <div className="text-center">
//                 <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
//                 <p className="text-gray-600">No sales data available for the selected period</p>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Period Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Sales Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <span className="text-sm font-medium text-gray-600">Total Revenue</span>
//               <span className="text-xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</span>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <span className="text-sm font-medium text-gray-600">Total Orders</span>
//               <span className="text-xl font-bold text-gray-900">{totalOrders}</span>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <span className="text-sm font-medium text-gray-600">Average Order Value</span>
//               <span className="text-xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</span>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <span className="text-sm font-medium text-gray-600">Number of Periods</span>
//               <span className="text-xl font-bold text-gray-900">{salesData?.periods.length || 0}</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//         </TabsContent>

//         {/* Customer Analytics Tab */}
//         <TabsContent value="customers" className="space-y-6">
//           {loading ? (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading customer analytics...</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : customerData ? (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Customer Analytics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
//                   {JSON.stringify(customerData, null, 2)}
//                 </pre>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="text-center text-gray-600">
//                   <p>No customer analytics data available</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </TabsContent>

//         {/* Product Analytics Tab */}
//         <TabsContent value="products" className="space-y-6">
//           {loading ? (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading product analytics...</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : productData ? (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Product Analytics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
//                   {JSON.stringify(productData, null, 2)}
//                 </pre>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="text-center text-gray-600">
//                   <p>No product analytics data available</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </TabsContent>

//         {/* Order Analytics Tab */}
//         <TabsContent value="orders" className="space-y-6">
//           {loading ? (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="text-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading order analytics...</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : orderData ? (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Analytics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
//                   {JSON.stringify(orderData, null, 2)}
//                 </pre>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="text-center text-gray-600">
//                   <p>No order analytics data available</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminReports;

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  DollarSign,
  Calendar,
  Download,
  Users,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import { useAdminAuth } from '@/context/AdminAuthContext';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface PeriodData {
  period: string;
  revenue: number;
  orders: number;
}

interface SalesReportResponse {
  status: string;
  data: {
    totalRevenue: number;
    periods: PeriodData[];
    periodComparisons: any;
    bestPeriod: { period: string; revenue: number };
    worstPeriod: { period: string; revenue: number };
    projectionNext: any;
  };
}

type TabKey = 'sales' | 'customers' | 'products' | 'orders';

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

const formatCurrency = (amount: number) =>
  `KSH ${Number(amount || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// Wrapper / housekeeping fields that shouldn't be displayed
const HIDDEN_KEYS = new Set([
  'status',
  'success',
  'message',
  'statusCode',
  'timestamp',
  'format',
]);

const CURRENCY_RE = /(revenue|amount|sales|spent|price|value|income|aov|ltv|total_?paid|subtotal)/i;
const PERCENT_RE = /(rate|percent|percentage|ratio|growth|share)/i;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:?\d{2})?)?$/;

const isPlainObject = (v: unknown): v is Record<string, any> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const humanize = (key: string): string =>
  key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (key: string, value: unknown): string => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';

  if (typeof value === 'number') {
    if (PERCENT_RE.test(key) && !CURRENCY_RE.test(key)) {
      const pct = Math.abs(value) <= 1 && value !== 0 ? value * 100 : value;
      return `${pct.toFixed(1)}%`;
    }
    if (CURRENCY_RE.test(key)) return formatCurrency(value);
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  if (typeof value === 'string') {
    // Numeric strings (common from SQL) — format like numbers
    if (/^-?\d+(\.\d+)?$/.test(value)) return formatValue(key, Number(value));
    if (ISO_DATE_RE.test(value)) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return value.includes('T') ? d.toLocaleString() : d.toLocaleDateString();
      }
    }
    return value;
  }

  if (Array.isArray(value)) return value.map((v) => formatValue(key, v)).join(', ');

  if (isPlainObject(value)) {
    return Object.entries(value)
      .map(([k, v]) => `${humanize(k)}: ${formatValue(k, v)}`)
      .join(' · ');
  }

  return String(value);
};

/* ------------------------------------------------------------------ */
/* Generic analytics renderer                                         */
/* ------------------------------------------------------------------ */

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Card>
    <CardContent className="pt-6">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1 break-words">{value}</p>
    </CardContent>
  </Card>
);

const MAX_ROWS = 50;

const DataTable: React.FC<{ rows: any[] }> = ({ rows }) => {
  if (rows.length === 0) {
    return <p className="text-sm text-gray-500">No records</p>;
  }

  // List of plain values
  if (!rows.some(isPlainObject)) {
    return (
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
        {rows.slice(0, MAX_ROWS).map((r, i) => (
          <li key={i}>{formatValue('', r)}</li>
        ))}
      </ul>
    );
  }

  // Union of keys across the first rows, keeping first-seen order
  const columns: string[] = [];
  rows.slice(0, 20).forEach((row) => {
    if (isPlainObject(row)) {
      Object.keys(row).forEach((k) => {
        if (!columns.includes(k) && !HIDDEN_KEYS.has(k)) columns.push(k);
      });
    }
  });

  const visible = rows.slice(0, MAX_ROWS);

  return (
    <div className="space-y-2">
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left px-3 py-2 font-medium text-gray-600 whitespace-nowrap"
                >
                  {humanize(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={i} className="border-t">
                {columns.map((col) => (
                  <td key={col} className="px-3 py-2 text-gray-800 whitespace-nowrap">
                    {formatValue(col, isPlainObject(row) ? row[col] : undefined)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > MAX_ROWS && (
        <p className="text-xs text-gray-500">
          Showing {MAX_ROWS} of {rows.length} rows. Export to see all.
        </p>
      )}
    </div>
  );
};

const AnalyticsView: React.FC<{ data: any; nested?: boolean }> = ({ data, nested = false }) => {
  if (data === null || data === undefined) return null;
  if (Array.isArray(data)) return <DataTable rows={data} />;
  if (!isPlainObject(data)) {
    return <p className="text-sm text-gray-800">{formatValue('', data)}</p>;
  }

  const entries = Object.entries(data).filter(([k]) => !HIDDEN_KEYS.has(k));
  const primitives = entries.filter(([, v]) => !isPlainObject(v) && !Array.isArray(v));
  const objects = entries.filter(([, v]) => isPlainObject(v));
  const arrays = entries.filter(([, v]) => Array.isArray(v));

  if (entries.length === 0) {
    return <p className="text-sm text-gray-500">No data available</p>;
  }

  return (
    <div className="space-y-6">
      {primitives.length > 0 &&
        (nested ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {primitives.map(([k, v]) => (
              <div key={k} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600">{humanize(k)}</p>
                <p className="text-lg font-semibold text-gray-900 break-words">
                  {formatValue(k, v)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {primitives.map(([k, v]) => (
              <StatCard key={k} label={humanize(k)} value={formatValue(k, v)} />
            ))}
          </div>
        ))}

      {objects.map(([k, v]) => (
        <Card key={k}>
          <CardHeader>
            <CardTitle>{humanize(k)}</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsView data={v} nested />
          </CardContent>
        </Card>
      ))}

      {arrays.map(([k, v]) => (
        <Card key={k}>
          <CardHeader>
            <CardTitle>{humanize(k)}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable rows={v as any[]} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CSV helpers                                                        */
/* ------------------------------------------------------------------ */

const toCsv = (rows: any[][]): string =>
  rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');

// Flattens any analytics payload into CSV rows: metrics first, then each table
const analyticsToCsvRows = (data: any, prefix = ''): any[][] => {
  const rows: any[][] = [];
  if (!isPlainObject(data)) {
    if (Array.isArray(data)) return tableToCsvRows(prefix || 'Data', data);
    return [[prefix || 'Value', formatValue(prefix, data)]];
  }

  const entries = Object.entries(data).filter(([k]) => !HIDDEN_KEYS.has(k));
  const primitives = entries.filter(([, v]) => !isPlainObject(v) && !Array.isArray(v));

  if (primitives.length) {
    if (!prefix) rows.push(['Metric', 'Value']);
    primitives.forEach(([k, v]) =>
      rows.push([prefix ? `${prefix} – ${humanize(k)}` : humanize(k), formatValue(k, v)])
    );
  }

  entries
    .filter(([, v]) => isPlainObject(v))
    .forEach(([k, v]) => {
      rows.push([]);
      rows.push(...analyticsToCsvRows(v, prefix ? `${prefix} – ${humanize(k)}` : humanize(k)));
    });

  entries
    .filter(([, v]) => Array.isArray(v))
    .forEach(([k, v]) => {
      rows.push([]);
      rows.push(...tableToCsvRows(prefix ? `${prefix} – ${humanize(k)}` : humanize(k), v as any[]));
    });

  return rows;
};

const tableToCsvRows = (title: string, items: any[]): any[][] => {
  const rows: any[][] = [[title]];
  if (!items.some(isPlainObject)) {
    items.forEach((v) => rows.push([formatValue('', v)]));
    return rows;
  }
  const columns: string[] = [];
  items.forEach((row) => {
    if (isPlainObject(row)) Object.keys(row).forEach((k) => !columns.includes(k) && columns.push(k));
  });
  rows.push(columns.map(humanize));
  items.forEach((row) => rows.push(columns.map((c) => formatValue(c, row?.[c]))));
  return rows;
};

const downloadCsv = (filename: string, csv: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                    */
/* ------------------------------------------------------------------ */

const LoadingCard: React.FC<{ label: string }> = ({ label }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const ErrorCard: React.FC<{ title: string; message: string; onRetry: () => void }> = ({
  title,
  message,
  onRetry,
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-center text-red-600">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm">{message}</p>
        <Button onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      </div>
    </CardContent>
  </Card>
);

const EmptyCard: React.FC<{ label: string }> = ({ label }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-center text-gray-600">
        <p>{label}</p>
      </div>
    </CardContent>
  </Card>
);

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const TAB_LABELS: Record<Exclude<TabKey, 'sales'>, string> = {
  customers: 'customer analytics',
  products: 'product analytics',
  orders: 'order analytics',
};

const TAB_ENDPOINTS: Record<Exclude<TabKey, 'sales'>, string> = {
  customers: 'REPORTS.CUSTOMERS',
  products: 'REPORTS.PRODUCTS',
  orders: 'REPORTS.ORDERS',
};

const AdminReports: React.FC = () => {
  const { adminToken } = useAdminAuth();

  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('sales');

  const [salesData, setSalesData] = useState<SalesReportResponse['data'] | null>(null);
  const [analytics, setAnalytics] = useState<Record<Exclude<TabKey, 'sales'>, any>>({
    customers: null,
    products: null,
    orders: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPeriodValue = (period: string): number => {
    switch (period) {
      case '7d':
        return 7;
      case '30d':
        return 30;
      case '90d':
        return 90;
      case '1y':
        return 365;
      default:
        return parseInt(period) || 30;
    }
  };

  /* -------------------------- Fetchers -------------------------- */

  const fetchSalesReport = useCallback(async () => {
    if (!adminToken) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        period: getPeriodValue(selectedPeriod).toString(),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      });

      const response = await fetch(`${getApiUrl('ADMIN', 'REPORTS.SALES')}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('Authentication failed. Please log in again.');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: SalesReportResponse = await response.json();
      if (data.status === 'success') {
        setSalesData(data.data);
      } else {
        throw new Error('Failed to fetch sales report');
      }
    } catch (err) {
      console.error('Error fetching sales report:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sales report');
    } finally {
      setLoading(false);
    }
  }, [adminToken, selectedPeriod, startDate, endDate]);

  const fetchAnalytics = useCallback(
    async (tab: Exclude<TabKey, 'sales'>) => {
      if (!adminToken) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          format: 'json',
          period: getPeriodValue(selectedPeriod).toString(),
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        });

        const response = await fetch(
          `${getApiUrl('ADMIN', TAB_ENDPOINTS[tab])}?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) throw new Error('Authentication failed. Please log in again.');
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAnalytics((prev) => ({ ...prev, [tab]: data?.data ?? data }));
      } catch (err) {
        console.error(`Error fetching ${TAB_LABELS[tab]}:`, err);
        setError(err instanceof Error ? err.message : `Failed to fetch ${TAB_LABELS[tab]}`);
      } finally {
        setLoading(false);
      }
    },
    [adminToken, selectedPeriod, startDate, endDate]
  );

  const loadActiveTab = useCallback(() => {
    if (activeTab === 'sales') fetchSalesReport();
    else fetchAnalytics(activeTab);
  }, [activeTab, fetchSalesReport, fetchAnalytics]);

  useEffect(() => {
    loadActiveTab();
  }, [loadActiveTab]);

  /* -------------------------- Derived --------------------------- */

  const totalRevenue = salesData?.totalRevenue || 0;
  const totalOrders = salesData?.periods.reduce((sum, p) => sum + p.orders, 0) || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const bestPeriod = salesData?.bestPeriod;
  const worstPeriod = salesData?.worstPeriod;

  const periods = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' },
  ];

  /* -------------------------- Export ---------------------------- */

  const handleExportReport = () => {
    const today = new Date().toISOString().split('T')[0];

    if (activeTab === 'sales') {
      if (!salesData) {
        alert('No data to export');
        return;
      }

      const rows: any[][] = [
        ['Metric', 'Value'],
        ['Total Revenue', formatCurrency(totalRevenue)],
        ['Total Orders', totalOrders],
        ['Average Order Value', formatCurrency(averageOrderValue)],
        ['Best Period', bestPeriod ? `${bestPeriod.period} (${formatCurrency(bestPeriod.revenue)})` : 'N/A'],
        ['Worst Period', worstPeriod ? `${worstPeriod.period} (${formatCurrency(worstPeriod.revenue)})` : 'N/A'],
        ['Report Period', `${selectedPeriod} days`],
        ['Generated At', new Date().toLocaleString()],
      ];

      if (salesData.periods.length > 0) {
        rows.push([]);
        rows.push(['Period', 'Revenue', 'Orders']);
        salesData.periods.forEach((p) => rows.push([p.period, formatCurrency(p.revenue), p.orders]));
      }

      downloadCsv(`sales-report-${selectedPeriod}days-${today}.csv`, toCsv(rows));
      return;
    }

    const data = analytics[activeTab];
    if (!data) {
      alert('No data to export');
      return;
    }

    const rows = analyticsToCsvRows(data);
    rows.push([], ['Generated At', new Date().toLocaleString()]);
    downloadCsv(`${activeTab}-report-${today}.csv`, toCsv(rows));
  };

  /* -------------------------- Render ---------------------------- */

  const renderAnalyticsTab = (tab: Exclude<TabKey, 'sales'>) => {
    const label = TAB_LABELS[tab];
    if (loading) return <LoadingCard label={`Loading ${label}...`} />;
    if (error) {
      return (
        <ErrorCard
          title={`Error loading ${label}`}
          message={error}
          onRetry={() => fetchAnalytics(tab)}
        />
      );
    }
    if (!analytics[tab]) return <EmptyCard label={`No ${label} data available`} />;
    return <AnalyticsView data={analytics[tab]} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">View comprehensive analytics and reports</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-auto"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-auto"
          />
          <Button onClick={loadActiveTab} variant="outline" disabled={loading}>
            <Calendar className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">
            <DollarSign className="h-4 w-4 mr-2" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 mr-2" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
        </TabsList>

        {/* Sales */}
        <TabsContent value="sales" className="space-y-6">
          {loading && <LoadingCard label="Loading sales report..." />}

          {!loading && error && (
            <ErrorCard title="Error loading sales report" message={error} onRetry={fetchSalesReport} />
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sales by Period</CardTitle>
                </CardHeader>
                <CardContent>
                  {salesData && salesData.periods.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {salesData.periods.map((period, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-600">{period.period}</span>
                              {bestPeriod?.period === period.period && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Best</span>
                              )}
                              {worstPeriod?.period === period.period &&
                                bestPeriod?.period !== period.period && (
                                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Worst</span>
                                )}
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {formatCurrency(period.revenue)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{period.orders} orders</div>
                          </div>
                        ))}
                      </div>

                      {bestPeriod && worstPeriod && bestPeriod.period !== worstPeriod.period && (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Best Period</p>
                            <p className="text-xl font-bold text-green-600">{bestPeriod.period}</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(bestPeriod.revenue)}
                            </p>
                          </div>
                          <div className="p-4 bg-red-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Worst Period</p>
                            <p className="text-xl font-bold text-red-600">{worstPeriod.period}</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(worstPeriod.revenue)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">No sales data available for the selected period</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Total Revenue</span>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Total Orders</span>
                      <span className="text-xl font-bold text-gray-900">{totalOrders.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Average Order Value</span>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Number of Periods</span>
                      <span className="text-xl font-bold text-gray-900">{salesData?.periods.length || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {renderAnalyticsTab('customers')}
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {renderAnalyticsTab('products')}
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {renderAnalyticsTab('orders')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;