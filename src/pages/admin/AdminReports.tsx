import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  DollarSign, 
  Calendar,
  Download
} from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import { useAdminAuth } from '@/context/AdminAuthContext';

// API Response interfaces
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
    bestPeriod: {
      period: string;
      revenue: number;
    };
    worstPeriod: {
      period: string;
      revenue: number;
    };
    projectionNext: any;
  };
}

const AdminReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState<SalesReportResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { adminToken } = useAdminAuth();

  // Convert period selection to API format
  const getPeriodValue = (period: string): number => {
    switch (period) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      case '1y': return 365;
      default: return parseInt(period) || 30;
    }
  };

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
      
      // Build query parameters
      const periodValue = getPeriodValue(selectedPeriod);
      const params = new URLSearchParams({
        period: periodValue.toString(),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      });
      
      const url = `${getApiUrl('ADMIN', 'REPORTS.SALES')}?${params.toString()}`;
      console.log('Fetching sales report from:', url);
      
      const response = await fetch(url, {
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
      console.log('Sales report response:', data);
      
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
  };

  // Load sales report on component mount and when filters change
  useEffect(() => {
    fetchSalesReport();
  }, [adminToken, selectedPeriod, startDate, endDate]);

  // Calculate metrics from API data
  const totalRevenue = salesData?.totalRevenue || 0;
  const totalOrders = salesData?.periods.reduce((sum, period) => sum + period.orders, 0) || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const bestPeriod = salesData?.bestPeriod;
  const worstPeriod = salesData?.worstPeriod;

  const periods = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ];

  const handleExportReport = () => {
    if (!salesData) {
      alert('No data to export');
      return;
    }

    // Create sales report data
    const reportData: any[] = [
      ['Metric', 'Value'],
      ['Total Revenue', `KSH ${totalRevenue}`],
      ['Total Orders', totalOrders],
      ['Average Order Value', `KSH ${averageOrderValue.toFixed(2)}`],
      ['Best Period', bestPeriod ? `${bestPeriod.period} (KSH ${bestPeriod.revenue})` : 'N/A'],
      ['Worst Period', worstPeriod ? `${worstPeriod.period} (KSH ${worstPeriod.revenue})` : 'N/A'],
      ['Report Period', selectedPeriod + ' days'],
      ['Generated At', new Date().toISOString()]
    ];
    
    // Add periods data
    if (salesData.periods.length > 0) {
      reportData.push([]);
      reportData.push(['Period', 'Revenue', 'Orders']);
      salesData.periods.forEach(period => {
        reportData.push([period.period, `KSH ${period.revenue}`, period.orders]);
      });
    }
    
    // Convert to CSV
    const csvContent = reportData.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // Create and download CSV file
    const filename = `sales-report-${selectedPeriod}days-${new Date().toISOString().split('T')[0]}.csv`;
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
          <h1 className="text-3xl font-bold text-gray-900">Sales Report</h1>
          <p className="text-gray-600 mt-2">View sales performance and revenue analytics</p>
        </div>
        <div className="flex space-x-2 flex-wrap gap-2">
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
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <Button onClick={fetchSalesReport} variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Refresh
          </Button>
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

      {/* Revenue Metrics */}
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
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
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

      {/* Sales Chart / Period Breakdown */}
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
                      {worstPeriod?.period === period.period && bestPeriod?.period !== period.period && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Worst</span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(period.revenue)}</div>
                    <div className="text-sm text-gray-600 mt-1">{period.orders} orders</div>
                  </div>
                ))}
              </div>
              {bestPeriod && worstPeriod && bestPeriod.period !== worstPeriod.period && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Best Period</p>
                    <p className="text-xl font-bold text-green-600">{bestPeriod.period}</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(bestPeriod.revenue)}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Worst Period</p>
                    <p className="text-xl font-bold text-red-600">{worstPeriod.period}</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(worstPeriod.revenue)}</p>
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

      {/* Period Summary */}
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
              <span className="text-xl font-bold text-gray-900">{totalOrders}</span>
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
    </div>
  );
};

export default AdminReports;

