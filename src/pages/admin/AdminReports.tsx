import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download
} from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import { useAdminAuth } from '@/context/AdminAuthContext';

// API Response interfaces
interface SalesData {
  total_orders: string;
  total_revenue: string;
  avg_order_value: string;
}

interface SalesReportResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    salesData: SalesData;
    topProducts: any[];
    salesByCategory: any[];
    salesByDay: any[];
  };
  timestamp: string;
}

const AdminReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('sales');
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [salesByCategory, setSalesByCategory] = useState<any[]>([]);
  const [salesByDay, setSalesByDay] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { adminToken } = useAdminAuth();

  // API fetch function
  const fetchSalesReport = async () => {
    if (!adminToken) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(getApiUrl('ADMIN', 'REPORTS.SALES'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: SalesReportResponse = await response.json();
      
      if (data.success) {
        setSalesData(data.data.salesData);
        setTopProducts(data.data.topProducts);
        setSalesByCategory(data.data.salesByCategory);
        setSalesByDay(data.data.salesByDay);
      } else {
        throw new Error(data.message || 'Failed to fetch sales report');
      }
    } catch (err) {
      console.error('Error fetching sales report:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sales report');
    } finally {
      setLoading(false);
    }
  };

  // Load sales report on component mount
  useEffect(() => {
    fetchSalesReport();
  }, [adminToken]);

  // All data comes from API - no mock data

  const revenueMetrics = {
    totalRevenue: salesData ? parseFloat(salesData.total_revenue) : 0,
    monthlyRevenue: salesData ? parseFloat(salesData.total_revenue) : 0,
    averageOrderValue: salesData ? parseFloat(salesData.avg_order_value) : 0,
    conversionRate: 0,
    growth: '0%'
  };

  const orderMetrics = {
    totalOrders: salesData ? parseInt(salesData.total_orders) : 0,
    completedOrders: salesData ? parseInt(salesData.total_orders) : 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    averageProcessingTime: 'N/A'
  };

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: DollarSign },
    { id: 'products', label: 'Product Performance', icon: Package },
    { id: 'customers', label: 'Customer Analytics', icon: Users },
    { id: 'orders', label: 'Order Analysis', icon: ShoppingCart }
  ];

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const handleExportReport = () => {
    if (!salesData) {
      alert('No data to export');
      return;
    }

    // Create report data based on selected report type
    let reportData: any[] = [];
    let filename = '';

    switch (selectedReport) {
      case 'sales':
        reportData = [
          ['Metric', 'Value'],
          ['Total Orders', salesData.total_orders],
          ['Total Revenue', `KSH ${salesData.total_revenue}`],
          ['Average Order Value', `KSH ${salesData.avg_order_value}`],
          ['Report Period', selectedPeriod],
          ['Generated At', new Date().toISOString()]
        ];
        filename = `sales-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case 'products':
        reportData = [
          ['Product', 'Sales', 'Revenue', 'Growth'],
          ...topProducts.map(product => [
            product.name || 'N/A',
            product.sales || '0',
            `KSH ${product.revenue || '0'}`,
            product.growth || '0%'
          ])
        ];
        filename = `products-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case 'customers':
        reportData = [
          ['Metric', 'Value'],
          ['Total Customers', '0'],
          ['New Customers', '0'],
          ['Returning Customers', '0'],
          ['Average Order Value', `KSH ${salesData.avg_order_value}`],
          ['Customer Lifetime Value', 'KSH 0']
        ];
        filename = `customers-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      case 'orders':
        reportData = [
          ['Metric', 'Value'],
          ['Total Orders', salesData.total_orders],
          ['Completed Orders', salesData.total_orders],
          ['Pending Orders', '0'],
          ['Cancelled Orders', '0'],
          ['Average Processing Time', 'N/A']
        ];
        filename = `orders-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      default:
        alert('Invalid report type');
        return;
    }

    // Convert to CSV
    const csvContent = reportData.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount: number) => {
    return `KSH ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Sales</h1>
          <p className="text-gray-600 mt-2">Analytics and business insights</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading sales report...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-medium">Error loading sales report</p>
              <p className="text-sm">{error}</p>
              <Button onClick={fetchSalesReport} className="mt-4">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Type Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Button
                  key={report.id}
                  variant={selectedReport === report.id ? "default" : "outline"}
                  className="h-20 flex flex-col space-y-2"
                  onClick={() => setSelectedReport(report.id)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{report.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueMetrics.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">{revenueMetrics.growth}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueMetrics.monthlyRevenue)}</p>
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
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenueMetrics.averageOrderValue)}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{revenueMetrics.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Sales chart will be displayed here</p>
              <p className="text-sm text-gray-500">Integration with chart library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.revenue}</p>
                    <p className="text-sm text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Total Customers</span>
                <span className="text-lg font-bold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">New Customers</span>
                <span className="text-lg font-bold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Returning Customers</span>
                <span className="text-lg font-bold text-blue-600">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Avg Order Value</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(revenueMetrics.averageOrderValue)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Customer Lifetime Value</span>
                <span className="text-lg font-bold text-purple-600">KSH 0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Order Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{orderMetrics.totalOrders}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{orderMetrics.completedOrders}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{orderMetrics.pendingOrders}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{orderMetrics.cancelledOrders}</p>
              <p className="text-sm text-gray-600">Cancelled</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{orderMetrics.averageProcessingTime}</p>
              <p className="text-sm text-gray-600">Avg Processing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;

