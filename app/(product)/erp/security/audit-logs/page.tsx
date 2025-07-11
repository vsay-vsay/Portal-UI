"use client";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";
import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

import { Search, Filter, Clock, User, Globe, Activity, AlertCircle, RefreshCw } from 'lucide-react';

function Page() {
  const [fetchLogs, logsData, isLoading, error, reset, status] = useRequestHook(
    api.SECURITY.ADMIN_LOGS,
    "GET",
    null
  );

  // Safe data extraction with fallback
  const accessLogs = useMemo(() => {
    if (!logsData || !logsData.data) return [];
    return Array.isArray(logsData.data) ? logsData.data : [];
  }, [logsData]);

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const getMethodColor = (method:string) => {
    if (!method) return 'bg-gray-100 text-gray-800 border-gray-300';
    
    switch (method.toString().toUpperCase()) {
      case 'GET': return 'bg-green-100 text-green-800 border-green-300';
      case 'POST': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    const statusNum = parseInt(status);
    if (isNaN(statusNum)) return 'bg-gray-100 text-gray-800 border-gray-300';
    
    if (statusNum >= 200 && statusNum < 300) return 'bg-green-100 text-green-800 border-green-300';
    if (statusNum >= 300 && statusNum < 400) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (statusNum >= 400 && statusNum < 500) return 'bg-orange-100 text-orange-800 border-orange-300';
    if (statusNum >= 500) return 'bg-red-100 text-red-800 border-red-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid Date';
    }
  };

  const filteredAndSortedLogs = useMemo(() => {
    if (!accessLogs || accessLogs.length === 0) return [];

    try {
      let filtered = accessLogs.filter(log => {
        if (!log) return false;
        
        const searchText = searchTerm.toLowerCase();
        const matchesSearch = !searchText || 
          (log.path && log.path.toLowerCase().includes(searchText)) ||
          (log.method && log.method.toLowerCase().includes(searchText)) ||
          (log.domainName && log.domainName.toLowerCase().includes(searchText));
        
        const matchesMethod = methodFilter === 'all' || 
          (log.method && log.method.toUpperCase() === methodFilter.toUpperCase());
        
        const matchesStatus = statusFilter === 'all' || 
          (log.status && log.status.toString() === statusFilter);
        
        return matchesSearch && matchesMethod && matchesStatus;
      });

      return filtered.sort((a, b) => {
        let aValue, bValue;
        
        try {
          switch (sortBy) {
            case 'timestamp':
              aValue = a.timestamp ? new Date(a.timestamp) : new Date(0);
              bValue = b.timestamp ? new Date(b.timestamp) : new Date(0);
              break;
            case 'method':
              aValue = a.method || '';
              bValue = b.method || '';
              break;
            case 'path':
              aValue = a.path || '';
              bValue = b.path || '';
              break;
            case 'status':
              aValue = parseInt(a.status) || 0;
              bValue = parseInt(b.status) || 0;
              break;
            default:
              aValue = a.timestamp ? new Date(a.timestamp) : new Date(0);
              bValue = b.timestamp ? new Date(b.timestamp) : new Date(0);
          }

          if (sortOrder === 'desc') {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          } else {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          }
        } catch (error) {
          console.error('Error sorting logs:', error);
          return 0;
        }
      });
    } catch (error) {
      console.error('Error filtering logs:', error);
      return [];
    }
  }, [accessLogs, searchTerm, methodFilter, statusFilter, sortBy, sortOrder]);

  const stats = useMemo(() => {
    if (!accessLogs || accessLogs.length === 0) {
      return { total: 0, methods: {}, avgResponseTime: "0ms", successRate: 0 };
    }

    try {
      const total = accessLogs.length;
      const methods = accessLogs.reduce((acc, log) => {
        if (log && log.method) {
          const method = log.method.toUpperCase();
          acc[method] = (acc[method] || 0) + 1;
        }
        return acc;
      }, {});
      
      const avgResponseTime = "142ms"; // Mock data - replace with actual calculation
      
      const successfulRequests = accessLogs.filter(log => {
        if (!log || !log.status) return false;
        const status = parseInt(log.status);
        return !isNaN(status) && status >= 200 && status < 300;
      }).length;
      
      const successRate = total > 0 ? Math.round((successfulRequests / total) * 100) : 0;
      
      return { total, methods, avgResponseTime, successRate };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return { total: 0, methods: {}, avgResponseTime: "0ms", successRate: 0 };
    }
  }, [accessLogs]);

  const handleRetry = () => {
    reset();
    fetchLogs();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMethodFilter('all');
    setStatusFilter('all');
    setSortBy('timestamp');
    setSortOrder('desc');
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Access Logs Dashboard
            </h1>
            <p className="text-slate-600">Loading your access logs...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} >
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-1/3 mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card >
            <CardContent className="p-6">
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Access Logs Dashboard
            </h1>
          </div>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load access logs: {error.message || 'Unknown error occurred'}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                className="ml-2"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Access Logs Dashboard
          </h1>
          <p className="text-slate-600">Monitor and analyze your API access patterns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">2xx responses</p>
            </CardContent>
          </Card>

          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.avgResponseTime}</div>
              <p className="text-xs text-muted-foreground">Last hour</p>
            </CardContent>
          </Card>

          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">1</div>
              <p className="text-xs text-muted-foreground">Admin role</p>
            </CardContent>
          </Card>
        </div>

        {/* No Data Message */}
        {accessLogs.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No access logs found. This could mean no requests have been made recently or there's an issue with data retrieval.
            </AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <CardDescription>
              Filter and search through your access logs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by path, method, or domain..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="201">201</SelectItem>
                  <SelectItem value="404">404</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="timestamp">Time</SelectItem>
                  <SelectItem value="method">Method</SelectItem>
                  <SelectItem value="path">Path</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="px-3"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card >
          <CardHeader>
            <CardTitle>Access Logs</CardTitle>
            <CardDescription>
              Showing {filteredAndSortedLogs.length} of {accessLogs.length} logs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAndSortedLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {accessLogs.length === 0 ? 'No logs available' : 'No logs match your current filters'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Method</th>
                      <th className="text-left p-3 font-medium">Path</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Domain</th>
                      <th className="text-left p-3 font-medium">Role</th>
                      <th className="text-left p-3 font-medium">Product</th>
                      <th className="text-left p-3 font-medium">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedLogs.map((log, index) => (
                      <tr key={log._id || index} className="border-b hover:bg-slate-50/50 transition-colors">
                        <td className="p-3">
                          <Badge variant="outline" className={getMethodColor(log.method)}>
                            {log.method || 'N/A'}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono text-sm max-w-xs truncate" title={log.path}>
                          {log.path || 'N/A'}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={getStatusColor(log.status)}>
                            {log.status || 'N/A'}
                          </Badge>
                        </td>
                        <td className="p-3">{log.domainName || 'N/A'}</td>
                        <td className="p-3">
                          <Badge variant="secondary">{log.role || 'N/A'}</Badge>
                        </td>
                        <td className="p-3">
                          {log.product && Array.isArray(log.product) ? (
                            log.product.map((p, i) => (
                              <Badge key={i} variant="outline" className="mr-1">
                                {p}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {formatTimestamp(log.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;