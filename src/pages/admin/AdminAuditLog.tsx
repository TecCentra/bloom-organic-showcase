import React, { useState, useEffect } from 'react';
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
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  User,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// API Response interfaces
interface AuditLogApiItem {
  log_id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: {
    status?: number;
    message?: string;
    [key: string]: any;
  };
  ip_address: string;
  user_agent: string | null;
  created_at: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: string;
}

interface AuditLogResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    auditLogs: AuditLogApiItem[];
    pagination: {
      page: number;
      limit: number;
      total?: number;
      pages?: number;
    };
  };
  timestamp: string;
}

const AdminAuditLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { adminToken } = useAdminAuth();

  // API fetch function
  const fetchAuditLogs = async () => {
    if (!adminToken) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${getApiUrl('ADMIN', 'AUDIT_LOG')}?page=${currentPage}&limit=10`, {
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

      const data: AuditLogResponse = await response.json();
      console.log('Audit log API response:', data);
      
      if (data.success) {
        // Check if auditLogs array exists
        if (!data.data || !data.data.auditLogs || !Array.isArray(data.data.auditLogs)) {
          console.error('Invalid data structure:', data.data);
          throw new Error('Invalid audit log data structure');
        }
        
        console.log('Processing audit logs:', data.data.auditLogs.length);
        
        // Transform API response to match component interface
        const transformedLogs: AuditLog[] = data.data.auditLogs.map((log: AuditLogApiItem) => {
          // Build user string from available fields
          let user = 'Unknown User';
          if (log.email) {
            const nameParts = [];
            if (log.first_name) nameParts.push(log.first_name);
            if (log.last_name) nameParts.push(log.last_name);
            user = nameParts.length > 0 
              ? `${nameParts.join(' ')} (${log.email})`
              : log.email;
          } else if (log.user_id) {
            user = `User ID: ${log.user_id}`;
          }

          // Extract status from details or determine from action
          let status = 'info';
          if (log.details?.status) {
            status = log.details.status >= 200 && log.details.status < 300 ? 'success' : 'failed';
          } else if (log.action) {
            const actionLower = log.action.toLowerCase();
            if (log.action === 'login-fail' || actionLower.includes('fail')) {
              status = 'failed';
            } else if (log.action === 'login' || actionLower.includes('success')) {
              status = 'success';
            }
          }

          // Format details as string
          let detailsStr = '';
          if (typeof log.details === 'object' && log.details !== null) {
            detailsStr = log.details.message || JSON.stringify(log.details);
          } else {
            detailsStr = String(log.details || '');
          }

          // Ensure created_at is valid before parsing
          let timestamp = 'N/A';
          try {
            if (log.created_at) {
              timestamp = new Date(log.created_at).toLocaleString();
            }
          } catch (e) {
            console.error('Error parsing date:', log.created_at);
          }

          return {
            id: log.log_id || 'unknown',
            timestamp: timestamp,
            user: user,
            action: log.action ? log.action.toUpperCase() : 'UNKNOWN',
            resource: log.entity_type || 'N/A',
            resourceId: log.entity_id || 'N/A',
            details: detailsStr,
            ipAddress: log.ip_address || 'N/A',
            userAgent: log.user_agent || 'N/A',
            status: status
          };
        });

        console.log('Transformed logs:', transformedLogs);
        setAuditLogs(transformedLogs);
        
        // Calculate pages if not provided
        const paginationData = data.data.pagination;
        if (!paginationData.pages && paginationData.total) {
          paginationData.pages = Math.ceil(paginationData.total / paginationData.limit);
        } else if (!paginationData.pages) {
          // If no total is provided, set pages to 1
          paginationData.pages = 1;
        }
        console.log('Pagination data:', paginationData);
        setPagination(paginationData);
      } else {
        throw new Error(data.message || 'Failed to fetch audit logs');
      }
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch audit logs');
    } finally {
      setLoading(false);
    }
  };

  // Load audit logs on component mount
  useEffect(() => {
    console.log('Fetching audit logs, adminToken:', adminToken ? 'exists' : 'missing', 'page:', currentPage);
    fetchAuditLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, currentPage]);

  const getActionBadge = (action: string) => {
    const actionUpper = action.toUpperCase();
    switch (actionUpper) {
      case 'CREATE':
        return <Badge className="bg-green-100 text-green-800">CREATE</Badge>;
      case 'UPDATE':
        return <Badge className="bg-blue-100 text-blue-800">UPDATE</Badge>;
      case 'DELETE':
        return <Badge className="bg-red-100 text-red-800">DELETE</Badge>;
      case 'LOGIN':
        return <Badge className="bg-purple-100 text-purple-800">LOGIN</Badge>;
      case 'LOGOUT':
        return <Badge className="bg-gray-100 text-gray-800">LOGOUT</Badge>;
      case 'PURCHASE':
        return <Badge className="bg-emerald-100 text-emerald-800">PURCHASE</Badge>;
      case 'FAILED_LOGIN':
      case 'LOGIN-FAIL':
        return <Badge className="bg-orange-100 text-orange-800">FAILED LOGIN</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{action}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredLogs = React.useMemo(() => {
    return auditLogs.filter(log => {
      // If no search term, match all (or if search term matches)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        (log.user?.toLowerCase() || '').includes(searchLower) ||
        (log.action?.toLowerCase() || '').includes(searchLower) ||
        (log.resource?.toLowerCase() || '').includes(searchLower) ||
        (log.details?.toLowerCase() || '').includes(searchLower);
      
      // Action filter - compare uppercased values
      const matchesAction = selectedAction === 'all' || 
        (log.action?.toUpperCase() || '') === (selectedAction?.toUpperCase() || '');
      
      // User filter
      const matchesUser = selectedUser === 'all' || log.user === selectedUser;
      
      return matchesSearch && matchesAction && matchesUser;
    });
  }, [auditLogs, searchTerm, selectedAction, selectedUser]);

  const uniqueActions = [...new Set(auditLogs.map(log => log.action).filter(Boolean))];
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user).filter(Boolean))];

  const handleExportLogs = () => {
    if (auditLogs.length === 0) {
      alert('No audit logs to export');
      return;
    }

    // Convert audit logs to CSV format
    const headers = ['Timestamp', 'User', 'Action', 'Resource', 'Resource ID', 'Details', 'IP Address', 'Status'];
    const csvContent = [
      headers.join(','),
      ...auditLogs.map(log => [
        log.timestamp,
        log.user,
        log.action,
        log.resource,
        log.resourceId,
        `"${log.details.replace(/"/g, '""')}"`, // Escape quotes in details
        log.ipAddress,
        log.status
      ].join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Debug logging
  console.log('Render state:', { loading, error, auditLogsCount: auditLogs.length, filteredCount: filteredLogs.length });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600 mt-2">System activity and security logs</p>
        </div>
        <Button onClick={handleExportLogs}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading audit logs...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg font-medium">Error loading audit logs</p>
              <p className="text-sm">{error}</p>
              <Button onClick={fetchAuditLogs} className="mt-4">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters and Table - Show when not loading */}
      {!loading && !error && auditLogs.length >= 0 && (
        <>
        <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="text-gray-500">No audit logs found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{log.timestamp}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.resource}</div>
                          <div className="text-sm text-gray-600">ID: {log.resourceId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                      <TableCell className="text-sm text-gray-600">{log.ipAddress}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className="text-sm capitalize">{log.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.pages && pagination.pages > 1 && (
            <div className="mt-4 flex justify-end px-4 pb-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(pagination.pages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.pages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <PaginationItem key={pageNum}>...</PaginationItem>;
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                      className={currentPage === pagination.pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Actions</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditLogs.filter(log => log.status === 'success').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Actions</p>
                <p className="text-2xl font-bold text-red-600">
                  {auditLogs.filter(log => log.status === 'failed').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Users</p>
                <p className="text-2xl font-bold text-purple-600">{uniqueUsers.length}</p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
        </>
      )}
    </div>
  );
};

export default AdminAuditLog;

