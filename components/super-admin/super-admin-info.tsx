"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, User, Building, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";

interface AdminInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  domains: Array<{
    name: string;
    status: string;
    subscriptionStatus: string;
  }>;
  [key: string]: any;
}

export function SuperAdminInfo() {
  const { toast } = useToast();

  const [fetchAdminInfo, adminInfo, loading, error, reset] = useRequestHook(
    api.SUPER_ADMIN.CHECK_LICENCE,
    "GET",
    null,
    true,
    false
  );

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Super Admin Information
              </CardTitle>
              <CardDescription>
                View current super admin details and managed domains
              </CardDescription>
            </div>
            <Button
              onClick={fetchAdminInfo}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading && !adminInfo ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : adminInfo ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">{adminInfo?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm">{adminInfo?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Role:</span>
                      <Badge variant="default">{adminInfo?.role}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">ID:</span>
                      <span className="text-sm font-mono">{adminInfo?.id}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Activity Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Created:</span>
                      <span className="text-sm">
                        {new Date(adminInfo?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {adminInfo?.lastLogin && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Last Login:</span>
                        <span className="text-sm">
                          {new Date(adminInfo?.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Total Domains:
                      </span>
                      <Badge variant="secondary">
                        {adminInfo.domains?.length || 0}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {adminInfo.domains && adminInfo.domains.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Managed Domains
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adminInfo?.domains?.map((domain: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{domain?.name}</span>
                            <Badge
                              variant={
                                domain?.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {domain?.status}
                            </Badge>
                          </div>
                          <Badge
                            variant={
                              domain?.subscriptionStatus === "active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {domain?.subscriptionStatus}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {Object.keys(adminInfo).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Raw Data</CardTitle>
                    <CardDescription>
                      Complete API response for debugging
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
                      {JSON.stringify(adminInfo, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No admin information available</p>
              <p className="text-sm">Click refresh to load data</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
