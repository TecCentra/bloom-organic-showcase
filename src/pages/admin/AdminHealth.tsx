import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Cpu,
  HardDrive,
  Wifi,
  Mail,
  CreditCard,
  Folder
} from 'lucide-react';
import { buildApiUrl } from '@/lib/config';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface HealthResponse {
  status: string;
  api: string;
  db: string;
  redis: string;
  email: string;
  fileStorage: string;
  payment: string;
  memory: {
    heapUsed: string;
    heapTotal: string;
    rss: string;
    external: string;
    status: string;
  };
  uptime: string;
  timestamp: string;
  environment: string;
  version: string | null;
  cached: boolean;
}

const AdminHealth: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { adminToken } = useAdminAuth();

  // Fetch health data from API
  const fetchHealthData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Note: Health endpoint is at /api/health, not /api/v1/health
      const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/v1', '') || 'https://bloom-backend-hqu8.onrender.com/api';
      const response = await fetch(`${baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: HealthResponse = await response.json();
      setHealthData(data);
      setLastChecked(new Date());
    } catch (err) {
      console.error('Error fetching health data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch health data');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Map API status to component status
  const mapStatus = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'running' || statusLower === 'connected' || statusLower === 'reachable' || statusLower === 'ok') {
      return 'healthy';
    }
    if (statusLower === 'fail' || statusLower === 'failed' || statusLower === 'unhealthy') {
      return 'unhealthy';
    }
    if (statusLower === 'not_configured' || statusLower === 'degraded') {
      return 'degraded';
    }
    return 'unknown';
  };

  // Parse memory values from string to number
  const parseMemory = (memoryStr: string): number => {
    const match = memoryStr.match(/([\d.]+)\s*(MB|GB|KB)/i);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2].toUpperCase();
      if (unit === 'GB') return value * 1024;
      if (unit === 'KB') return value / 1024;
      return value;
    }
    return 0;
  };

  // Get service icon
  const getServiceIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case 'api':
        return <Server className="h-5 w-5" />;
      case 'database':
      case 'db':
        return <Database className="h-5 w-5" />;
      case 'redis':
        return <HardDrive className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'payment':
        return <CreditCard className="h-5 w-5" />;
      case 'filestorage':
      case 'file storage':
        return <Folder className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'unhealthy':
        return <Badge className="bg-red-100 text-red-800">Unhealthy</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchHealthData();
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHealthData();
    }, 60000); // Auto-refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading && !healthData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
            <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading health data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !healthData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
            <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Retry
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-medium">Error loading health data</p>
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!healthData) return null;

  // Build services array from health data
  const services = [
    { name: 'API Server', status: mapStatus(healthData.api), value: healthData.api },
    { name: 'Database', status: mapStatus(healthData.db), value: healthData.db },
    { name: 'Redis Cache', status: mapStatus(healthData.redis), value: healthData.redis },
    { name: 'Email Service', status: mapStatus(healthData.email), value: healthData.email },
    { name: 'File Storage', status: mapStatus(healthData.fileStorage), value: healthData.fileStorage },
    { name: 'Payment Gateway', status: mapStatus(healthData.payment), value: healthData.payment },
  ];

  // Parse memory values
  const heapUsed = parseMemory(healthData.memory.heapUsed);
  const heapTotal = parseMemory(healthData.memory.heapTotal);
  const rss = parseMemory(healthData.memory.rss);
  const memoryPercentage = heapTotal > 0 ? (heapUsed / heapTotal) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing || loading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {getStatusIcon(healthData.status)}
              </div>
              <p className="text-sm font-medium text-gray-600">Overall Status</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{healthData.status}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-lg font-bold text-gray-900">{healthData.uptime}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Environment</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{healthData.environment}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Version</p>
              <p className="text-sm font-bold text-gray-900">{healthData.version || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-600">
                      {getServiceIcon(service.name)}
                    </div>
                    {getStatusIcon(service.status)}
                    <span className="font-medium text-gray-900">{service.name}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 capitalize">{service.value}</div>
                    <div className="text-xs text-gray-600">Status</div>
                  </div>
                  <div>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memory Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Heap Used</span>
                  <span>{memoryPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      memoryPercentage > 80 ? 'bg-red-600' : 
                      memoryPercentage > 60 ? 'bg-yellow-600' : 
                      'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(memoryPercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {healthData.memory.heapUsed} / {healthData.memory.heapTotal}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>RSS (Resident Set Size)</span>
                  <span>{healthData.memory.rss}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Total memory allocated to the process
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>External Memory</span>
                  <span>{healthData.memory.external}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Memory used by C++ objects bound to JavaScript objects
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    Memory Status
                  </span>
                  <span className="capitalize">{healthData.memory.status}</span>
                </div>
                {healthData.memory.status === 'ok' && (
                  <Badge className="mt-2 bg-green-100 text-green-800">Healthy</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Last Updated</span>
                  <span className="text-xs text-gray-500">
                    {new Date(healthData.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Environment</span>
                  <Badge className="bg-blue-100 text-blue-800 capitalize">
                    {healthData.environment}
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Cache Status</span>
                  <Badge className={healthData.cached ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {healthData.cached ? 'Cached' : 'Live'}
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Uptime</span>
                  <span className="text-sm text-gray-900">{healthData.uptime}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  System has been running since last restart
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHealth;

