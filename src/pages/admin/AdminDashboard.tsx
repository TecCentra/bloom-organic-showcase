// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   Package, 
//   ShoppingCart, 
//   Users, 
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Activity
// } from 'lucide-react';
// import { useAdminAuth } from '@/context/AdminAuthContext';
// import { API_CONFIG } from '@/lib/config';

// const AdminDashboard: React.FC = () => {
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { adminToken } = useAdminAuth();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${adminToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setDashboardData(data.data);
//         } else {
//           console.error('Failed to fetch dashboard data');
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (adminToken) {
//       fetchDashboardData();
//     }
//   }, [adminToken]);

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 text-sm">Loading dashboard data...</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//           {[...Array(6)].map((_, i) => (
//             <Card key={i}>
//               <CardContent className="p-4">
//                 <div className="animate-pulse">
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   const stats = [
//     {
//       title: 'Total Products',
//       value: dashboardData?.totalProducts?.toString() || '0',
//       change: dashboardData?.productChange || null,
//       trend: dashboardData?.productTrend || 'up',
//       icon: Package,
//       color: 'text-blue-600'
//     },
//     {
//       title: 'Total Orders',
//       value: dashboardData?.totalOrders?.toString() || '0',
//       change: dashboardData?.orderChange || null,
//       trend: dashboardData?.orderTrend || 'up',
//       icon: ShoppingCart,
//       color: 'text-green-600'
//     },
//     {
//       title: 'Total Users',
//       value: dashboardData?.totalUsers?.toString() || '0',
//       change: dashboardData?.userChange || null,
//       trend: dashboardData?.userTrend || 'up',
//       icon: Users,
//       color: 'text-purple-600'
//     },
//     {
//       title: 'Revenue',
//       value: `Ksh${dashboardData?.totalRevenue || '0'}`,
//       change: dashboardData?.revenueChange || null,
//       trend: dashboardData?.revenueTrend || 'up',
//       icon: DollarSign,
//       color: 'text-emerald-600'
//     },
//     {
//       title: 'Pending Orders',
//       value: dashboardData?.pendingOrders?.toString() || '0',
//       change: dashboardData?.pendingOrdersChange || null,
//       trend: dashboardData?.pendingOrdersTrend || 'up',
//       icon: ShoppingCart,
//       color: 'text-yellow-600'
//     },
//     {
//       title: 'Completed Orders',
//       value: dashboardData?.completedOrders?.toString() || '0',
//       change: dashboardData?.completedOrdersChange || null,
//       trend: dashboardData?.completedOrdersTrend || 'up',
//       icon: ShoppingCart,
//       color: 'text-green-600'
//     }
//   ];

//   const recentOrders = dashboardData?.recentOrders?.map((order: any) => ({
//     id: order.order_id,
//     customer: `${order.first_name} ${order.last_name}`,
//     amount: `Ksh${order.total_amount}`,
//     status: order.status,
//     date: new Date(order.order_date).toLocaleDateString(),
//     paymentMethod: order.payment_method,
//     paymentStatus: order.payment_status,
//     trackingNumber: order.tracking_number,
//     shippingMethod: order.shipping_method
//   })) || [];

//   const topProducts = dashboardData?.topProducts?.map((product: any) => ({
//     name: product.product_name,
//     sales: product.total_sales,
//     revenue: `Ksh${product.total_revenue}`
//   })) || [];

//   return (
//     <div className="space-y-4">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 text-sm">Welcome to your admin dashboard</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
//           return (
//             <Card key={index}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">
//                   {stat.title}
//                 </CardTitle>
//                 <Icon className={`h-4 w-4 ${stat.color}`} />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
//                 {stat.change && (
//                   <div className="flex items-center text-xs text-gray-600 mt-1">
//                     <TrendIcon className={`h-3 w-3 mr-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
//                     <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>{stat.change}</span>
//                     <span className="ml-1">from last month</span>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Orders</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {recentOrders.length > 0 ? (
//               <div className="space-y-4">
//                 {recentOrders.slice(0, 5).map((order) => (
//                   <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <div>
//                         <p className="font-medium text-gray-900 text-sm">{order.id}</p>
//                         <p className="text-sm text-gray-600">{order.customer}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium text-gray-900">{order.amount}</p>
//                         <p className={`text-xs ${
//                           order.status === 'completed' ? 'text-green-600' :
//                           order.status === 'processing' ? 'text-blue-600' :
//                           order.status === 'shipped' ? 'text-purple-600' :
//                           order.status === 'pending' ? 'text-yellow-600' :
//                           'text-gray-600'
//                         }`}>
//                           {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Payment: {order.paymentMethod}</span>
//                       <span>Tracking: {order.trackingNumber}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">No recent orders available.</p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Top Products */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Top Products</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {topProducts.length > 0 ? (
//               <div className="space-y-4">
//                 {topProducts.map((product, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium text-gray-900">{product.name}</p>
//                       <p className="text-sm text-gray-600">{product.sales} sales</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium text-gray-900">{product.revenue}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">No product sales data available yet.</p>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* System Status */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Activity className="h-5 w-5 mr-2" />
//             System Status
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">API Server</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Database</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Payment Gateway</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;
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
import { API_CONFIG } from '@/lib/config';

interface TopProduct {
  product_name: string;
  total_sales: number;
  total_revenue: number;
}

interface RecentOrder {
  order_id: string;
  first_name: string;
  last_name: string;
  total_amount: string;
  status: string;
  order_date: string;
  payment_method: string;
  tracking_number: string | null;
}

interface DashboardData {
  totalProducts?: number;
  productChange?: string;
  productTrend?: 'up' | 'down';

  totalOrders?: number;
  orderChange?: string;
  orderTrend?: 'up' | 'down';

  totalUsers?: number;
  userChange?: string;
  userTrend?: 'up' | 'down';

  totalRevenue?: string;
  revenueChange?: string;
  revenueTrend?: 'up' | 'down';

  pendingOrders?: number;
  pendingOrdersChange?: string;
  pendingOrdersTrend?: 'up' | 'down';

  completedOrders?: number;
  completedOrdersChange?: string;
  completedOrdersTrend?: 'up' | 'down';

  recentOrders?: RecentOrder[];
  topProducts?: TopProduct[];
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [topProducts, setTopProducts] = useState<Array<{
    product_id: string;
    name: string;
    sku: string | null;
    units_sold: string;
  }>>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { adminToken } = useAdminAuth();
  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-amber-500';     
    if (index === 1) return 'from-gray-400 to-gray-500';
    if (index === 2) return 'from-orange-400 to-red-500';       
    return 'from-emerald-500 to-teal-600';                      
  };

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      if (!adminToken) return;

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD}`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data.data || {});
        }
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      }
    };

    fetchDashboardSummary();
  }, [adminToken]);

  // Fetch Top Selling Products
  useEffect(() => {
  const fetchTopProducts = async () => {
    if (!adminToken) return;

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/admin/reports/products/top-selling?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch top products');

      const result = await response.json();
      // Correct path: result.data.topProducts
      setTopProducts(result.data?.topProducts || []);
    } catch (error) {
      console.error('Error fetching top products:', error);
      setTopProducts([]);
    }
  };

  fetchTopProducts();
}, [adminToken]);

  // Optional: Fetch Recent Orders separately if not included in main dashboard
  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!adminToken) return;

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/admin/orders?limit=5&sort=-order_date`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setRecentOrders(result.data?.orders || []);
        }
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (adminToken) {
      fetchRecentOrders();
    }
  }, [adminToken]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Loading your store insights...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Products', value: dashboardData?.totalProducts || 0, icon: Package, color: 'text-blue-600' },
    { title: 'Total Orders', value: dashboardData?.totalOrders || 0, icon: ShoppingCart, color: 'text-green-600' },
    { title: 'Total Users', value: dashboardData?.totalUsers || 0, icon: Users, color: 'text-purple-600' },
    { title: 'Revenue', value: `Ksh ${dashboardData?.totalRevenue || '0'}`, icon: DollarSign, color: 'text-emerald-600' },
    { title: 'Pending Orders', value: dashboardData?.pendingOrders || 0, icon: ShoppingCart, color: 'text-yellow-600' },
    { title: 'Completed Orders', value: dashboardData?.completedOrders || 0, icon: ShoppingCart, color: 'text-teal-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with Bloom today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order: any) => (
                  <div key={order.order_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">#{order.order_id}</p>
                      <p className="text-xs text-gray-600">
                        {order.first_name} {order.last_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Ksh {order.total_amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent orders</p>
            )}
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.product_id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Rank Badge */}
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${getRankColor(
                          index
                        )} text-white flex items-center justify-center text-sm font-bold shadow-md`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {product.name}
                        </p>
                        {product.sku ? (
                          <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                        ) : (
                          <p className="text-xs text-gray-400 italic">No SKU</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-emerald-600">
                        {product.units_sold}
                      </p>
                      <p className="text-xs text-gray-500">units sold</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No sales data yet</p>
                <p className="text-xs mt-1">Products will appear here once orders are placed</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {['API Server', 'Database', 'Payment Gateway'].map((service) => (
              <div key={service} className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">{service}</span>
                <span className="text-green-600 text-xs">Online</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
