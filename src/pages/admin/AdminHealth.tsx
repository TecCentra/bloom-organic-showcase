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
  Wifi
} from 'lucide-react';

const AdminHealth: React.FC = () => {
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with actual API calls
  const systemHealth = {
    overall: 'healthy',
    uptime: '99.9%',
    lastIncident: '2024-01-10 14:30:00',
    responseTime: '120ms'
  };

  const services = [
    {
      name: 'API Server',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '120ms',
      lastCheck: '2024-01-15 14:30:00',
      version: 'v1.2.3',
      port: 3000
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.8%',
      responseTime: '45ms',
      lastCheck: '2024-01-15 14:30:00',
      version: 'PostgreSQL 14.5',
      port: 5432
    },
    {
      name: 'Redis Cache',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '2ms',
      lastCheck: '2024-01-15 14:30:00',
      version: 'Redis 6.2',
      port: 6379
    },
    {
      name: 'Payment Gateway',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: '850ms',
      lastCheck: '2024-01-15 14:30:00',
      version: 'Stripe API v2020-08-27',
      port: 443
    },
    {
      name: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      responseTime: '320ms',
      lastCheck: '2024-01-15 14:30:00',
      version: 'SendGrid v7.0',
      port: 587
    },
    {
      name: 'File Storage',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '180ms',
      lastCheck: '2024-01-15 14:30:00',
      version: 'AWS S3',
      port: 443
    }
  ];

  const systemMetrics = {
    cpu: {
      usage: 45,
      cores: 4,
      load: [0.8, 0.9, 0.7]
    },
    memory: {
      used: 6.2,
      total: 16,
      percentage: 38.75
    },
    disk: {
      used: 120,
      total: 500,
      percentage: 24
    },
    network: {
      incoming: 2.4,
      outgoing: 1.8,
      connections: 156
    }
  };

  const recentIncidents = [
    {
      id: 1,
      service: 'Payment Gateway',
      severity: 'warning',
      message: 'High response time detected',
      timestamp: '2024-01-15 14:25:00',
      duration: '5 minutes',
      resolved: true
    },
    {
      id: 2,
      service: 'Database',
      severity: 'critical',
      message: 'Connection pool exhausted',
      timestamp: '2024-01-10 14:30:00',
      duration: '2 hours',
      resolved: true
    },
    {
      id: 3,
      service: 'API Server',
      severity: 'info',
      message: 'Scheduled maintenance completed',
      timestamp: '2024-01-08 02:00:00',
      duration: '30 minutes',
      resolved: true
    }
  ];

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastChecked(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastChecked(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

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
            disabled={isRefreshing}
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
                {getStatusIcon(systemHealth.overall)}
              </div>
              <p className="text-sm font-medium text-gray-600">Overall Status</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{systemHealth.overall}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-lg font-bold text-gray-900">{systemHealth.uptime}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Response Time</p>
              <p className="text-lg font-bold text-gray-900">{systemHealth.responseTime}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Last Incident</p>
              <p className="text-sm font-bold text-gray-900">{systemHealth.lastIncident}</p>
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
                    {getStatusIcon(service.status)}
                    <span className="font-medium text-gray-900">{service.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    v{service.version} • Port {service.port}
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{service.uptime}</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{service.responseTime}</div>
                    <div className="text-xs text-gray-600">Response</div>
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
        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              System Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Usage</span>
                  <span>{systemMetrics.cpu.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${systemMetrics.cpu.usage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {systemMetrics.cpu.cores} cores • Load: {systemMetrics.cpu.load.join(', ')}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory Usage</span>
                  <span>{systemMetrics.memory.percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${systemMetrics.memory.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Disk Usage</span>
                  <span>{systemMetrics.disk.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full" 
                    style={{ width: `${systemMetrics.disk.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Wifi className="h-4 w-4 mr-1" />
                    Network
                  </span>
                  <span>{systemMetrics.network.connections} connections</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  In: {systemMetrics.network.incoming}MB/s • Out: {systemMetrics.network.outgoing}MB/s
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Recent Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{incident.service}</span>
                    {getSeverityBadge(incident.severity)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{incident.message}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{incident.timestamp}</span>
                    <span>Duration: {incident.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHealth;

