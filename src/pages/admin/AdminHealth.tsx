// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Activity, 
//   Server, 
//   Database, 
//   Globe, 
//   Shield, 
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   XCircle,
//   RefreshCw,
//   Cpu,
//   HardDrive,
//   Wifi,
//   Mail,
//   CreditCard,
//   Folder
// } from 'lucide-react';
// import { buildApiUrl } from '@/lib/config';
// import { useAdminAuth } from '@/context/AdminAuthContext';

// interface HealthResponse {
//   status: string;
//   api: string;
//   db: string;
//   redis: string;
//   email: string;
//   fileStorage: string;
//   payment: string;
//   memory: {
//     heapUsed: string;
//     heapTotal: string;
//     rss: string;
//     external: string;
//     status: string;
//   };
//   uptime: string;
//   timestamp: string;
//   environment: string;
//   version: string | null;
//   cached: boolean;
// }

// const AdminHealth: React.FC = () => {
//   const [healthData, setHealthData] = useState<HealthResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastChecked, setLastChecked] = useState(new Date());
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const { adminToken } = useAdminAuth();

//   // Fetch health data from API
//   const fetchHealthData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Note: Health endpoint is at /api/health, not /api/v1/health
//       const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/v1', '') || 'https://bloom-backend-zzcv.onrender.com/api';
//       const response = await fetch(`${baseUrl}/health`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data: HealthResponse = await response.json();
//       setHealthData(data);
//       setLastChecked(new Date());
//     } catch (err) {
//       console.error('Error fetching health data:', err);
//       setError(err instanceof Error ? err.message : 'Failed to fetch health data');
//     } finally {
//       setLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   // Map API status to component status
//   const mapStatus = (status: string): string => {
//     const statusLower = status.toLowerCase();
//     if (statusLower === 'running' || statusLower === 'connected' || statusLower === 'reachable' || statusLower === 'ok') {
//       return 'healthy';
//     }
//     if (statusLower === 'fail' || statusLower === 'failed' || statusLower === 'unhealthy') {
//       return 'unhealthy';
//     }
//     if (statusLower === 'not_configured' || statusLower === 'degraded') {
//       return 'degraded';
//     }
//     return 'unknown';
//   };

//   // Parse memory values from string to number
//   const parseMemory = (memoryStr: string): number => {
//     const match = memoryStr.match(/([\d.]+)\s*(MB|GB|KB)/i);
//     if (match) {
//       const value = parseFloat(match[1]);
//       const unit = match[2].toUpperCase();
//       if (unit === 'GB') return value * 1024;
//       if (unit === 'KB') return value / 1024;
//       return value;
//     }
//     return 0;
//   };

//   // Get service icon
//   const getServiceIcon = (serviceName: string) => {
//     switch (serviceName.toLowerCase()) {
//       case 'api':
//         return <Server className="h-5 w-5" />;
//       case 'database':
//       case 'db':
//         return <Database className="h-5 w-5" />;
//       case 'redis':
//         return <HardDrive className="h-5 w-5" />;
//       case 'email':
//         return <Mail className="h-5 w-5" />;
//       case 'payment':
//         return <CreditCard className="h-5 w-5" />;
//       case 'filestorage':
//       case 'file storage':
//         return <Folder className="h-5 w-5" />;
//       default:
//         return <Activity className="h-5 w-5" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'healthy':
//         return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
//       case 'degraded':
//         return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
//       case 'unhealthy':
//         return <Badge className="bg-red-100 text-red-800">Unhealthy</Badge>;
//       default:
//         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'healthy':
//         return <CheckCircle className="h-5 w-5 text-green-600" />;
//       case 'degraded':
//         return <AlertCircle className="h-5 w-5 text-yellow-600" />;
//       case 'unhealthy':
//         return <XCircle className="h-5 w-5 text-red-600" />;
//       default:
//         return <AlertCircle className="h-5 w-5 text-gray-600" />;
//     }
//   };

//   const getSeverityBadge = (severity: string) => {
//     switch (severity) {
//       case 'critical':
//         return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
//       case 'warning':
//         return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
//       case 'info':
//         return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
//       default:
//         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchHealthData();
//   };

//   useEffect(() => {
//     fetchHealthData();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchHealthData();
//     }, 60000); // Auto-refresh every 60 seconds

//     return () => clearInterval(interval);
//   }, []);

//   if (loading && !healthData) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
//             <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
//           </div>
//         </div>
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading health data...</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (error && !healthData) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
//             <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
//           </div>
//           <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
//             <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
//             Retry
//           </Button>
//         </div>
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-center text-red-600">
//               <p className="text-lg font-medium">Error loading health data</p>
//               <p className="text-sm">{error}</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!healthData) return null;

//   // Build services array from health data
//   const services = [
//     { name: 'API Server', status: mapStatus(healthData.api), value: healthData.api },
//     { name: 'Database', status: mapStatus(healthData.db), value: healthData.db },
//     { name: 'Redis Cache', status: mapStatus(healthData.redis), value: healthData.redis },
//     { name: 'Email Service', status: mapStatus(healthData.email), value: healthData.email },
//     { name: 'File Storage', status: mapStatus(healthData.fileStorage), value: healthData.fileStorage },
//     { name: 'Payment Gateway', status: mapStatus(healthData.payment), value: healthData.payment },
//   ];

//   // Parse memory values
//   const heapUsed = parseMemory(healthData.memory.heapUsed);
//   const heapTotal = parseMemory(healthData.memory.heapTotal);
//   const rss = parseMemory(healthData.memory.rss);
//   const memoryPercentage = heapTotal > 0 ? (heapUsed / heapTotal) * 100 : 0;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
//           <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="text-sm text-gray-600">
//             Last checked: {lastChecked.toLocaleTimeString()}
//           </div>
//           <Button 
//             onClick={handleRefresh} 
//             disabled={isRefreshing || loading}
//             variant="outline"
//           >
//             <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//         </div>
//       </div>

//       {/* Overall System Status */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Activity className="h-5 w-5 mr-2" />
//             System Overview
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-center mb-2">
//                 {getStatusIcon(healthData.status)}
//               </div>
//               <p className="text-sm font-medium text-gray-600">Overall Status</p>
//               <p className="text-lg font-bold text-gray-900 capitalize">{healthData.status}</p>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-center mb-2">
//                 <Clock className="h-5 w-5 text-blue-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-600">Uptime</p>
//               <p className="text-lg font-bold text-gray-900">{healthData.uptime}</p>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-center mb-2">
//                 <Globe className="h-5 w-5 text-green-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-600">Environment</p>
//               <p className="text-lg font-bold text-gray-900 capitalize">{healthData.environment}</p>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-center mb-2">
//                 <AlertCircle className="h-5 w-5 text-orange-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-600">Version</p>
//               <p className="text-sm font-bold text-gray-900">{healthData.version || 'N/A'}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Service Status */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Service Status</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {services.map((service, index) => (
//               <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="text-gray-600">
//                       {getServiceIcon(service.name)}
//                     </div>
//                     {getStatusIcon(service.status)}
//                     <span className="font-medium text-gray-900">{service.name}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-6">
//                   <div className="text-right">
//                     <div className="text-sm font-medium text-gray-900 capitalize">{service.value}</div>
//                     <div className="text-xs text-gray-600">Status</div>
//                   </div>
//                   <div>
//                     {getStatusBadge(service.status)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Memory Metrics */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Cpu className="h-5 w-5 mr-2" />
//               Memory Usage
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>Heap Used</span>
//                   <span>{memoryPercentage.toFixed(1)}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className={`h-2 rounded-full ${
//                       memoryPercentage > 80 ? 'bg-red-600' : 
//                       memoryPercentage > 60 ? 'bg-yellow-600' : 
//                       'bg-green-600'
//                     }`}
//                     style={{ width: `${Math.min(memoryPercentage, 100)}%` }}
//                   ></div>
//                 </div>
//                 <div className="text-xs text-gray-600 mt-1">
//                   {healthData.memory.heapUsed} / {healthData.memory.heapTotal}
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>RSS (Resident Set Size)</span>
//                   <span>{healthData.memory.rss}</span>
//                 </div>
//                 <div className="text-xs text-gray-600 mt-1">
//                   Total memory allocated to the process
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>External Memory</span>
//                   <span>{healthData.memory.external}</span>
//                 </div>
//                 <div className="text-xs text-gray-600 mt-1">
//                   Memory used by C++ objects bound to JavaScript objects
//                 </div>
//               </div>

//               <div className="pt-2 border-t">
//                 <div className="flex justify-between text-sm">
//                   <span className="flex items-center">
//                     <Activity className="h-4 w-4 mr-1" />
//                     Memory Status
//                   </span>
//                   <span className="capitalize">{healthData.memory.status}</span>
//                 </div>
//                 {healthData.memory.status === 'ok' && (
//                   <Badge className="mt-2 bg-green-100 text-green-800">Healthy</Badge>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* System Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               System Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-medium text-gray-900">Last Updated</span>
//                   <span className="text-xs text-gray-500">
//                     {new Date(healthData.timestamp).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-medium text-gray-900">Environment</span>
//                   <Badge className="bg-blue-100 text-blue-800 capitalize">
//                     {healthData.environment}
//                   </Badge>
//                 </div>
//               </div>

//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-medium text-gray-900">Cache Status</span>
//                   <Badge className={healthData.cached ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
//                     {healthData.cached ? 'Cached' : 'Live'}
//                   </Badge>
//                 </div>
//               </div>

//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-medium text-gray-900">Uptime</span>
//                   <span className="text-sm text-gray-900">{healthData.uptime}</span>
//                 </div>
//                 <div className="text-xs text-gray-600 mt-1">
//                   System has been running since last restart
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminHealth;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Server,
  Database,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Cpu,
  HardDrive,
  Mail,
  CreditCard,
  Folder,
  Tag,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type ServiceStatus = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

interface ServiceInfo {
  key: string;
  name: string;
  raw: string; // status text as reported by the API
  status: ServiceStatus;
  detail?: string; // latency, message, etc.
}

interface NormalizedHealth {
  overallRaw: string;
  overall: ServiceStatus;
  services: ServiceInfo[];
  memory: {
    heapUsed?: string;
    heapTotal?: string;
    rss?: string;
    external?: string;
    status?: string;
    heapUsedMB: number;
    heapTotalMB: number;
  } | null;
  uptime: string;
  timestamp: string | null;
  environment: string;
  version: string | null;
  cached: boolean | null;
}

/* ------------------------------------------------------------------ */
/* Config                                                             */
/* ------------------------------------------------------------------ */

const DEFAULT_API_BASE = 'https://bloom-backend-zzcv.onrender.com/api';
const REQUEST_TIMEOUT_MS = 20000; // Render free instances can take a while to wake up
const AUTO_REFRESH_MS = 60000;

// Health endpoints we try, in order, until one answers (not 404)
const getHealthUrlCandidates = (): string[] => {
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined) || DEFAULT_API_BASE;
  let origin: string;
  try {
    origin = new URL(base).origin;
  } catch {
    origin = new URL(DEFAULT_API_BASE).origin;
  }
  return [`${origin}/api/health`, `${origin}/health`, `${origin}/api/v1/health`];
};

const SERVICE_DEFS: { key: string; aliases: string[]; name: string }[] = [
  { key: 'api', aliases: ['api', 'server'], name: 'API Server' },
  { key: 'db', aliases: ['db', 'database', 'turso', 'libsql'], name: 'Database' },
  { key: 'redis', aliases: ['redis', 'cache'], name: 'Redis Cache' },
  { key: 'email', aliases: ['email', 'mail', 'smtp'], name: 'Email Service' },
  { key: 'fileStorage', aliases: ['fileStorage', 'storage', 'file_storage', 'r2', 'firebase'], name: 'File Storage' },
  { key: 'payment', aliases: ['payment', 'payments', 'mpesa', 'kcb'], name: 'Payment Gateway' },
];

/* ------------------------------------------------------------------ */
/* Normalization helpers                                              */
/* ------------------------------------------------------------------ */

const HEALTHY = new Set([
  'ok', 'up', 'healthy', 'running', 'connected', 'reachable', 'pass', 'passed',
  'available', 'ready', 'configured', 'online', 'success', 'true',
]);
const UNHEALTHY = new Set([
  'fail', 'failed', 'unhealthy', 'down', 'error', 'disconnected', 'unreachable',
  'offline', 'critical', 'false',
]);
const DEGRADED = new Set([
  'degraded', 'not_configured', 'not configured', 'warn', 'warning', 'disabled',
  'skipped', 'partial', 'slow',
]);

const mapStatus = (value: unknown): ServiceStatus => {
  if (value === null || value === undefined) return 'unknown';
  const s = String(value).trim().toLowerCase();
  if (HEALTHY.has(s)) return 'healthy';
  if (UNHEALTHY.has(s)) return 'unhealthy';
  if (DEGRADED.has(s)) return 'degraded';
  return 'unknown';
};

// A service may be reported as "connected", true, or { status: 'connected', latency: 12 }
const readServiceValue = (value: unknown): { raw: string; detail?: string } => {
  if (value === null || value === undefined) return { raw: 'not reported' };
  if (typeof value === 'boolean') return { raw: value ? 'ok' : 'fail' };
  if (typeof value === 'string' || typeof value === 'number') return { raw: String(value) };

  if (typeof value === 'object') {
    const v = value as Record<string, any>;
    const raw =
      v.status ?? v.state ?? (typeof v.ok === 'boolean' ? (v.ok ? 'ok' : 'fail') : undefined) ??
      (typeof v.healthy === 'boolean' ? (v.healthy ? 'ok' : 'fail') : undefined) ?? 'unknown';

    const parts: string[] = [];
    const latency = v.latency ?? v.latencyMs ?? v.responseTime ?? v.duration;
    if (latency !== undefined) parts.push(typeof latency === 'number' ? `${latency} ms` : String(latency));
    if (v.message || v.error) parts.push(String(v.message || v.error));
    if (v.provider) parts.push(String(v.provider));

    return { raw: String(raw), detail: parts.join(' · ') || undefined };
  }

  return { raw: String(value) };
};

const findField = (obj: Record<string, any>, aliases: string[]): unknown => {
  // Check top level, then common nesting like { services: {...} } or { checks: {...} }
  const containers = [obj, obj.services, obj.checks, obj.components, obj.dependencies].filter(
    (c) => c && typeof c === 'object'
  );
  for (const container of containers) {
    for (const alias of aliases) {
      if (container[alias] !== undefined) return container[alias];
    }
  }
  return undefined;
};

// "45.2 MB" -> 45.2 ; 47398912 (bytes) -> 45.2 ; "1.2 GB" -> 1228.8
const toMB = (value: unknown): number => {
  if (typeof value === 'number') return value > 100000 ? value / 1024 / 1024 : value;
  if (typeof value !== 'string') return 0;
  const match = value.match(/([\d.]+)\s*(KB|MB|GB|B)?/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  switch ((match[2] || 'MB').toUpperCase()) {
    case 'GB':
      return num * 1024;
    case 'KB':
      return num / 1024;
    case 'B':
      return num / 1024 / 1024;
    default:
      return num;
  }
};

const memText = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return `${toMB(value).toFixed(1)} MB`;
  return String(value);
};

const formatUptime = (value: unknown): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'string' && !/^\d+(\.\d+)?$/.test(value)) return value;
  const seconds = Math.floor(Number(value));
  if (!Number.isFinite(seconds)) return String(value);
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return [d && `${d}d`, h && `${h}h`, `${m}m`].filter(Boolean).join(' ');
};

const normalizeHealth = (payload: any): NormalizedHealth => {
  // Unwrap { success, data } style responses
  const raw: Record<string, any> =
    payload && typeof payload === 'object' && payload.data && typeof payload.data === 'object'
      ? { ...payload, ...payload.data }
      : payload || {};

  const services: ServiceInfo[] = SERVICE_DEFS.map((def) => {
    const value = findField(raw, def.aliases);
    const { raw: rawStatus, detail } = readServiceValue(value);
    return {
      key: def.key,
      name: def.name,
      raw: rawStatus,
      status: value === undefined ? 'unknown' : mapStatus(rawStatus),
      detail,
    };
  }).filter((s) => s.raw !== 'not reported' || s.key === 'api' || s.key === 'db');

  const overallRaw = String(raw.status ?? raw.overall ?? raw.state ?? 'unknown');
  let overall = mapStatus(overallRaw);
  // If the API doesn't give an overall status, derive it from the services
  if (overall === 'unknown' && services.length) {
    if (services.some((s) => s.status === 'unhealthy')) overall = 'unhealthy';
    else if (services.some((s) => s.status === 'degraded')) overall = 'degraded';
    else if (services.every((s) => s.status === 'healthy')) overall = 'healthy';
  }

  const m = raw.memory && typeof raw.memory === 'object' ? raw.memory : null;
  const memory = m
    ? {
        heapUsed: memText(m.heapUsed),
        heapTotal: memText(m.heapTotal),
        rss: memText(m.rss),
        external: memText(m.external),
        status: m.status ? String(m.status) : undefined,
        heapUsedMB: toMB(m.heapUsed),
        heapTotalMB: toMB(m.heapTotal),
      }
    : null;

  return {
    overallRaw,
    overall,
    services,
    memory,
    uptime: formatUptime(raw.uptime),
    timestamp: raw.timestamp ? String(raw.timestamp) : null,
    environment: raw.environment ? String(raw.environment) : 'unknown',
    version: raw.version ? String(raw.version) : null,
    cached: typeof raw.cached === 'boolean' ? raw.cached : null,
  };
};

/* ------------------------------------------------------------------ */
/* UI helpers                                                         */
/* ------------------------------------------------------------------ */

const getServiceIcon = (key: string) => {
  switch (key) {
    case 'api':
      return <Server className="h-5 w-5" />;
    case 'db':
      return <Database className="h-5 w-5" />;
    case 'redis':
      return <HardDrive className="h-5 w-5" />;
    case 'email':
      return <Mail className="h-5 w-5" />;
    case 'payment':
      return <CreditCard className="h-5 w-5" />;
    case 'fileStorage':
      return <Folder className="h-5 w-5" />;
    default:
      return <Activity className="h-5 w-5" />;
  }
};

const getStatusBadge = (status: ServiceStatus) => {
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

const getStatusIcon = (status: ServiceStatus) => {
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

const PageHeader: React.FC<{
  lastChecked?: Date | null;
  onRefresh: () => void;
  refreshing: boolean;
  label?: string;
}> = ({ lastChecked, onRefresh, refreshing, label = 'Refresh' }) => (
  <div className="flex justify-between items-center flex-wrap gap-4">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
      <p className="text-gray-600 mt-2">Monitor system performance and service status</p>
    </div>
    <div className="flex items-center gap-4">
      {lastChecked && (
        <div className="text-sm text-gray-600">Last checked: {lastChecked.toLocaleTimeString()}</div>
      )}
      <Button onClick={onRefresh} disabled={refreshing} variant="outline">
        <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
        {label}
      </Button>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

const AdminHealth: React.FC = () => {
  const { adminToken } = useAdminAuth();

  const [health, setHealth] = useState<NormalizedHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);

  const workingUrlRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);

  const fetchHealthData = useCallback(
    async (manual = false) => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;
      if (manual) setRefreshing(true);

      const candidates = workingUrlRef.current
        ? [workingUrlRef.current, ...getHealthUrlCandidates().filter((u) => u !== workingUrlRef.current)]
        : getHealthUrlCandidates();

      let lastError = 'Failed to fetch health data';

      try {
        for (const url of candidates) {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                ...(adminToken && { Authorization: `Bearer ${adminToken}` }),
              },
              signal: controller.signal,
            });

            // Wrong path — try the next candidate
            if (response.status === 404) {
              lastError = `Health endpoint not found at ${url}`;
              continue;
            }

            const body = await response.json().catch(() => null);

            // 503 usually still carries the full report — show it instead of failing
            if (body && typeof body === 'object') {
              workingUrlRef.current = url;
              setHealth(normalizeHealth(body));
              setHttpStatus(response.status);
              setLastChecked(new Date());
              setError(null);
              return;
            }

            lastError = `Unexpected response (HTTP ${response.status}) from ${url}`;
          } catch (err: any) {
            lastError =
              err?.name === 'AbortError'
                ? `Request timed out after ${REQUEST_TIMEOUT_MS / 1000}s — the server may be starting up`
                : err?.message || 'Network error';
          } finally {
            clearTimeout(timer);
          }
        }

        console.error('Health check failed:', lastError);
        setError(lastError);
      } finally {
        inFlightRef.current = false;
        setLoading(false);
        setRefreshing(false);
      }
    },
    [adminToken]
  );

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(() => fetchHealthData(), AUTO_REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchHealthData]);

  const handleRefresh = () => fetchHealthData(true);

  /* -------------------------- States ---------------------------- */

  if (loading && !health) {
    return (
      <div className="space-y-6">
        <PageHeader onRefresh={handleRefresh} refreshing />
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading health data...</p>
              <p className="mt-1 text-xs text-gray-500">
                This can take a few seconds if the server was asleep.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="space-y-6">
        <PageHeader onRefresh={handleRefresh} refreshing={refreshing} label="Retry" />
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <XCircle className="h-10 w-10 mx-auto mb-2" />
              <p className="text-lg font-medium">Error loading health data</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs text-gray-500 mt-3">
                Tried: {getHealthUrlCandidates().join(', ')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* -------------------------- Render ---------------------------- */

  const memory = health.memory;
  const memoryPercentage =
    memory && memory.heapTotalMB > 0 ? (memory.heapUsedMB / memory.heapTotalMB) * 100 : 0;

  return (
    <div className="space-y-6">
      <PageHeader lastChecked={lastChecked} onRefresh={handleRefresh} refreshing={refreshing} />

      {/* Refresh failed but we still have the last good data */}
      {error && (
        <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
          Latest refresh failed: {error}. Showing data from {lastChecked?.toLocaleTimeString()}.
        </div>
      )}

      {/* Server reported a problem (e.g. HTTP 503) */}
      {httpStatus && httpStatus >= 500 && !error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
          The server reports a problem (HTTP {httpStatus}). Check the services marked unhealthy below.
        </div>
      )}

      {/* Overview */}
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
              <div className="flex items-center justify-center mb-2">{getStatusIcon(health.overall)}</div>
              <p className="text-sm font-medium text-gray-600">Overall Status</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{health.overallRaw}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-lg font-bold text-gray-900">{health.uptime}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Environment</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{health.environment}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Tag className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Version</p>
              <p className="text-sm font-bold text-gray-900">{health.version || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          {health.services.length === 0 ? (
            <p className="text-sm text-gray-500">The health endpoint didn't report any services.</p>
          ) : (
            <div className="space-y-4">
              {health.services.map((service) => (
                <div
                  key={service.key}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="text-gray-600">{getServiceIcon(service.key)}</div>
                    {getStatusIcon(service.status)}
                    <span className="font-medium text-gray-900">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {service.raw.replace(/_/g, ' ')}
                      </div>
                      {service.detail && (
                        <div className="text-xs text-gray-600 max-w-xs truncate" title={service.detail}>
                          {service.detail}
                        </div>
                      )}
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!memory ? (
              <p className="text-sm text-gray-500">Memory information isn't reported by the server.</p>
            ) : (
              <div className="space-y-4">
                {memory.heapUsed && memory.heapTotal && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Heap Used</span>
                      <span>{memoryPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          memoryPercentage > 80
                            ? 'bg-red-600'
                            : memoryPercentage > 60
                            ? 'bg-yellow-600'
                            : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min(memoryPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {memory.heapUsed} / {memory.heapTotal}
                    </div>
                  </div>
                )}

                {memory.rss && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>RSS (Resident Set Size)</span>
                      <span>{memory.rss}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Total memory allocated to the process</div>
                  </div>
                )}

                {memory.external && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>External Memory</span>
                      <span>{memory.external}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Memory used by C++ objects bound to JavaScript objects
                    </div>
                  </div>
                )}

                {memory.status && (
                  <div className="pt-2 border-t flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <Activity className="h-4 w-4 mr-1" />
                      Memory Status
                    </span>
                    {getStatusBadge(mapStatus(memory.status))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* System information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="font-medium text-gray-900">Last Updated</span>
                <span className="text-xs text-gray-500">
                  {health.timestamp && !isNaN(new Date(health.timestamp).getTime())
                    ? new Date(health.timestamp).toLocaleString()
                    : lastChecked?.toLocaleString() ?? 'N/A'}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="font-medium text-gray-900">Environment</span>
                <Badge className="bg-blue-100 text-blue-800 capitalize">{health.environment}</Badge>
              </div>

              {health.cached !== null && (
                <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium text-gray-900">Cache Status</span>
                  <Badge
                    className={health.cached ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {health.cached ? 'Cached' : 'Live'}
                  </Badge>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Uptime</span>
                  <span className="text-sm text-gray-900">{health.uptime}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">Time since the server last restarted</div>
              </div>

              {workingUrlRef.current && (
                <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-900">Endpoint</span>
                  <span className="text-xs text-gray-500 truncate" title={workingUrlRef.current}>
                    {workingUrlRef.current}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHealth;