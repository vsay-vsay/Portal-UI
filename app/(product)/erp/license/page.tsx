"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  HelpCircle,
  Key,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCwIcon as Refresh,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Star,
  Upload,
  Users,
  BarChart3,
  Database,
  Globe,
  Lock,
  Monitor,
  Zap,
} from "lucide-react";

const mockLicenses = [
  {
    id: "LIC-001",
    name: "ERP Core Module",
    type: "Enterprise",
    status: "Active",
    purchaseDate: "2024-01-15",
    expiryDate: "2025-01-15",
    maxUsers: 500,
    currentUsers: 487,
    cost: 25000,
    vendor: "VSAY Technologies",
    features: [
      "Student Management",
      "Staff Management",
      "Academic Records",
      "Financial Management",
    ],
  },
  {
    id: "LIC-002",
    name: "Advanced Analytics",
    type: "Professional",
    status: "Active",
    purchaseDate: "2024-02-01",
    expiryDate: "2024-12-31",
    maxUsers: 100,
    currentUsers: 78,
    cost: 8000,
    vendor: "Analytics Pro",
    features: ["Custom Reports", "Data Visualization", "Predictive Analytics"],
  },
  {
    id: "LIC-003",
    name: "Mobile App License",
    type: "Standard",
    status: "Expiring",
    purchaseDate: "2023-07-01",
    expiryDate: "2024-07-01",
    maxUsers: 1000,
    currentUsers: 856,
    cost: 5000,
    vendor: "MobileERP Inc",
    features: ["iOS App", "Android App", "Push Notifications"],
  },
  {
    id: "LIC-004",
    name: "Integration Suite",
    type: "Enterprise",
    status: "Trial",
    purchaseDate: "2024-05-01",
    expiryDate: "2024-08-01",
    maxUsers: 50,
    currentUsers: 23,
    cost: 12000,
    vendor: "IntegrationHub",
    features: ["API Gateway", "Third-party Connectors", "Data Sync"],
  },
];

const LicenseManagement = () => {
  const [activeTab, setActiveTab] = useState("license");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: true,
    auditLogging: true,
    dataEncryption: true,
    ipWhitelist: false,
    passwordPolicy: true,
    autoLockout: true,
    sslEnforcement: true,
  });

  // Filter licenses based on search and status
  const filteredLicenses = mockLicenses.filter((license) => {
    const matchesSearch =
      license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      license.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            License Management
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive software license and subscription management
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Licenses
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add License
          </Button> */}
        </div>
      </div>

      {/* License Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Key className="w-4 h-4" />
              Total Licenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLicenses.length}</div>
            <p className="text-xs text-muted-foreground">Across all modules</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>
                  Active:{" "}
                  {mockLicenses.filter((l) => l.status === "Active").length}
                </span>
                <span>
                  Expiring:{" "}
                  {mockLicenses.filter((l) => l.status === "Expiring").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (mockLicenses.reduce((acc, l) => acc + l.currentUsers, 0) /
                  mockLicenses.reduce((acc, l) => acc + l.maxUsers, 0)) *
                  100
              )}
              %
            </div>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {mockLicenses.reduce((acc, l) => acc + l.currentUsers, 0)} /{" "}
              {mockLicenses.reduce((acc, l) => acc + l.maxUsers, 0)} users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockLicenses.filter((l) => l.status === "Expiring").length}
            </div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Annual Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {mockLicenses
                .reduce((acc, l) => acc + l.cost, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total licensing cost
            </p>
            <div className="text-xs text-green-600 mt-1">
              ↓ 12% from last year
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>License Inventory</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search licenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{license.name}</div>
                      <div className="text-sm text-gray-500">
                        {license.vendor}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{license.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        license.status === "Active"
                          ? "default"
                          : license.status === "Expiring"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {license.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-24">
                      <div className="text-sm">
                        {license.currentUsers}/{license.maxUsers}
                      </div>
                      <Progress
                        value={(license.currentUsers / license.maxUsers) * 100}
                        className="mt-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(license.expiryDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ${license.cost.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              {license.name} - License Details
                            </DialogTitle>
                            <DialogDescription>
                              Comprehensive license information and management
                              options
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium">
                                  License ID
                                </Label>
                                <p className="text-sm text-gray-600">
                                  {license.id}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Vendor
                                </Label>
                                <p className="text-sm text-gray-600">
                                  {license.vendor}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Purchase Date
                                </Label>
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    license.purchaseDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Annual Cost
                                </Label>
                                <p className="text-sm text-gray-600">
                                  ${license.cost.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium">
                                  Status
                                </Label>
                                <Badge
                                  className="ml-2"
                                  variant={
                                    license.status === "Active"
                                      ? "default"
                                      : license.status === "Expiring"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {license.status}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  User Limit
                                </Label>
                                <p className="text-sm text-gray-600">
                                  {license.maxUsers} users
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Current Usage
                                </Label>
                                <p className="text-sm text-gray-600">
                                  {license.currentUsers} users (
                                  {Math.round(
                                    (license.currentUsers / license.maxUsers) *
                                      100
                                  )}
                                  %)
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Features
                                </Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {license.features.map((feature, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit License
                            </Button>
                            <Button>
                              <Refresh className="w-4 h-4 mr-2" />
                              Renew License
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};


export default LicenseManagement;