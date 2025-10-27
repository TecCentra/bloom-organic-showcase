import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { adminToken } = useAdminAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://bloom-backend-hqu8.onrender.com/api/v1/admin/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data.data);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (adminToken) {
      fetchDashboardData();
    }
  }, [adminToken]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm">Loading dashboard data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Products',
      value: dashboardData?.totalProducts?.toString() || '0',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: dashboardData?.totalOrders?.toString() || '0',
      change: '+8%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      title: 'Total Users',
      value: dashboardData?.totalUsers?.toString() || '0',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue',
      value: `Ksh${dashboardData?.totalRevenue || '0'}`,
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600'
    },
    {
      title: 'Pending Orders',
      value: dashboardData?.pendingOrders?.toString() || '0',
      change: '+5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-yellow-600'
    },
    {
      title: 'Completed Orders',
      value: dashboardData?.completedOrders?.toString() || '0',
      change: '+18%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-green-600'
    }
  ];

  const recentOrders = dashboardData?.recentOrders?.map((order: any) => ({
    id: order.order_id,
    customer: `${order.first_name} ${order.last_name}`,
    amount: `Ksh${order.total_amount}`,
    status: order.status,
    date: new Date(order.order_date).toLocaleDateString(),
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    trackingNumber: order.tracking_number,
    shippingMethod: order.shipping_method
  })) || [];

  const topProducts = [
    { name: 'Organic Honey', sales: 156, revenue: '$2,340' },
    { name: 'Herbal Tea Blend', sales: 134, revenue: '$1,608' },
    { name: 'Organic Granola', sales: 98, revenue: '$1,176' },
    { name: 'Coconut Oil', sales: 87, revenue: '$1,044' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <TrendIcon className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.amount}</p>
                      <p className={`text-xs ${
                        order.status === 'completed' ? 'text-green-600' :
                        order.status === 'processing' ? 'text-blue-600' :
                        order.status === 'shipped' ? 'text-purple-600' :
                        order.status === 'pending' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Payment: {order.paymentMethod}</span>
                    <span>Tracking: {order.trackingNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">API Server</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Database</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Payment Gateway</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
