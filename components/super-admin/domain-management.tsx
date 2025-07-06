"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";
import { LoadingButton } from "../ui/loading-button";
// Define types for better type safety
interface CreateFormData {
  domainName: string;
  companyName: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  maxAdmins: string;
  maxTeachers: string;
  maxStudents: string;
  maxAccountants: string;
  username: string;
  products: string[];
  twoFactorAuthentication: boolean;
  logo: File | null;
  loginImage: File | null;
}

interface UpdateFormData {
  companyName: string;
  maxAdmins: string;
  maxTeachers: string;
  maxStudents: string;
  maxAccountants: string;
  products: string[];
}

interface DomainInfo {
  domainName: string;
  companyName: string;
  maxAdmins: number;
  maxTeachers: number;
  maxStudents: number;
  maxAccountants: number;
  products: string[];
  adminName: string;
  adminEmail: string;
  twoFactorAuthentication: boolean;
}

export function DomainManagement() {
  const { toast } = useToast();
  const [
    createDomain,
    resCreation,
    isCreating,
    errorCreate,
    createReset,
    statusCreate,
  ] = useRequestHook(api.SUPER_ADMIN.CREAT_DOMAIN, "POST", null, true, false);

  const [
    fetchDomain,
    domainData,
    isDomainLoading,
    errorDomain,
    domainReset,
    statusDomain,
  ] = useRequestHook(api.SUPER_ADMIN.CHECK_DOMAIN, "POST", null, true, false);

  const [
    updateDomainFn,
    updateResult,
    isUpdateDomain,
    errorUpdate,
    updateReset,
    statusUpdate,
  ] = useRequestHook(api.SUPER_ADMIN.UPDATE_DOMAIN, "PUT", null, true, false); // Fixed: Use UPDATE_DOMAIN endpoint

  // State management
  const [createForm, setCreateForm] = useState<CreateFormData>({
    domainName: "",
    companyName: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    maxAdmins: "5",
    maxTeachers: "20",
    maxStudents: "20",
    maxAccountants: "10",
    username: "",
    products: [],
    twoFactorAuthentication: false,
    logo: null,
    loginImage: null,
  });

  const [searchDomain, setSearchDomain] = useState<string>("");
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);

  const [updateForm, setUpdateForm] = useState<UpdateFormData>({
    companyName: "",
    maxAdmins: "5",
    maxTeachers: "50",
    maxStudents: "100",
    maxAccountants: "20",
    products: [],
  });

  // Handle create domain
  const handleCreateDomain = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append form data properly
      Object.entries(createForm).forEach(([key, value]) => {
        if (key === "products") {
          // Handle products array
          (value as string[]).forEach((product) => {
            formData.append("products[]", product); // Fixed: Use consistent field name
          });
        } else if (key === "logo" || key === "loginImage") {
          // Handle file uploads
          if (value) {
            formData.append(key, value as File);
          }
        } else if (key === "twoFactorAuthentication") {
          // Handle boolean values
          formData.append(key, value.toString());
        } else {
          // Handle string values
          formData.append(key, value as string);
        }
      });

      await createDomain(formData);

      // Handle success
      if (statusCreate === 200 || statusCreate === 201) {
        toast({
          title: "Success",
          description: "Domain created successfully",
        });
        // Reset form on success
        setCreateForm({
          domainName: "",
          companyName: "",
          adminName: "",
          adminEmail: "",
          adminPassword: "",
          maxAdmins: "5",
          maxTeachers: "20",
          maxStudents: "20",
          maxAccountants: "10",
          username: "",
          products: [],
          twoFactorAuthentication: false,
          logo: null,
          loginImage: null,
        });
      }
    } catch (error) {
      console.error("Error creating domain:", error);
    }
  };

  // Handle search domain using the hook
  const handleSearchDomain = async () => {
    if (!searchDomain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetchDomain({ domainName: searchDomain });

      // Handle success
      if (statusDomain === 200 && domainData) {
        setDomainInfo(domainData);
        setUpdateForm({
          companyName: domainData.companyName || "",
          maxAdmins: domainData.maxAdmins?.toString() || "5",
          maxTeachers: domainData.maxTeachers?.toString() || "50",
          maxStudents: domainData.maxStudents?.toString() || "100",
          maxAccountants: domainData.maxAccountants?.toString() || "20",
          products: domainData.products || [],
        });
        toast({
          title: "Success",
          description: "Domain found successfully",
        });
      }
    } catch (error) {
      console.error("Error searching domain:", error);
      setDomainInfo(null);
      toast({
        title: "Error",
        description: errorDomain || "Domain not found",
        variant: "destructive",
      });
    }
  };

  // Handle update domain using the hook
  const handleUpdateDomain = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!domainInfo) {
      toast({
        title: "Error",
        description: "No domain selected for update",
        variant: "destructive",
      });
      return;
    }

    try {
      const updateData = {
        domainName: domainInfo.domainName || searchDomain, // Include domain name for identification
        companyName: updateForm.companyName,
        maxAdmins: Number.parseInt(updateForm.maxAdmins),
        maxTeachers: Number.parseInt(updateForm.maxTeachers),
        maxStudents: Number.parseInt(updateForm.maxStudents),
        maxAccountants: Number.parseInt(updateForm.maxAccountants),
        products: updateForm.products, // Fixed: Use 'products' instead of 'product'
      };

      await updateDomainFn(updateData);

      // Handle success
      if (statusUpdate === 200) {
        toast({
          title: "Success",
          description: "Domain updated successfully",
        });
        // Refresh domain info
        await handleSearchDomain();
      }
    } catch (error) {
      console.error("Error updating domain:", error);
      toast({
        title: "Error",
        description: errorUpdate || "Failed to update domain",
        variant: "destructive",
      });
    }
  };

  // Handle product toggle for both create and update forms
  const handleProductToggle = (product: string, isCreate = true) => {
    if (isCreate) {
      setCreateForm((prev) => ({
        ...prev,
        products: prev.products.includes(product)
          ? prev.products.filter((p) => p !== product)
          : [...prev.products, product],
      }));
    } else {
      setUpdateForm((prev) => ({
        ...prev,
        products: prev.products.includes(product)
          ? prev.products.filter((p) => p !== product)
          : [...prev.products, product],
      }));
    }
  };

  // Reset functions
  const handleResetCreate = () => {
    createReset();
    setCreateForm({
      domainName: "",
      companyName: "",
      adminName: "",
      adminEmail: "",
      adminPassword: "",
      maxAdmins: "5",
      maxTeachers: "20",
      maxStudents: "20",
      maxAccountants: "10",
      username: "",
      products: [],
      twoFactorAuthentication: false,
      logo: null,
      loginImage: null,
    });
  };

  const handleResetSearch = () => {
    domainReset();
    setSearchDomain("");
    setDomainInfo(null);
  };

  const handleResetUpdate = () => {
    updateReset();
    setUpdateForm({
      companyName: "",
      maxAdmins: "5",
      maxTeachers: "50",
      maxStudents: "100",
      maxAccountants: "20",
      products: [],
    });
  };

  return (
    <Tabs defaultValue="create" className="space-y-6">
      <TabsList>
        <TabsTrigger value="create">Create Domain</TabsTrigger>
        <TabsTrigger value="search">Search & Update</TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Domain
            </CardTitle>
            <CardDescription>
              Create a new domain with company and admin details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateDomain} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domainName">Domain Name</Label>
                  <Input
                    id="domainName"
                    value={createForm.domainName}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        domainName: e.target.value,
                      }))
                    }
                    placeholder="example"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={createForm.companyName}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    placeholder="Company Inc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Name</Label>
                  <Input
                    id="adminName"
                    value={createForm.adminName}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        adminName: e.target.value,
                      }))
                    }
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={createForm.adminEmail}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        adminEmail: e.target.value,
                      }))
                    }
                    placeholder="admin@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={createForm.adminPassword}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        adminPassword: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={createForm.username}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    placeholder="admin_user"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAdmins">Max Admins</Label>
                  <Input
                    id="maxAdmins"
                    type="number"
                    value={createForm.maxAdmins}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        maxAdmins: e.target.value,
                      }))
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTeachers">Max Teachers</Label>
                  <Input
                    id="maxTeachers"
                    type="number"
                    value={createForm.maxTeachers}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        maxTeachers: e.target.value,
                      }))
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={createForm.maxStudents}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        maxStudents: e.target.value,
                      }))
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAccountants">Max Accountants</Label>
                  <Input
                    id="maxAccountants"
                    type="number"
                    value={createForm.maxAccountants}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        maxAccountants: e.target.value,
                      }))
                    }
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Products</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="erp"
                      checked={createForm.products.includes("erp")}
                      onCheckedChange={() => handleProductToggle("erp")}
                    />
                    <Label htmlFor="erp">ERP</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lms"
                      checked={createForm.products.includes("lms")}
                      onCheckedChange={() => handleProductToggle("lms")}
                    />
                    <Label htmlFor="lms">LMS</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        logo: e.target.files?.[0] || null,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginImage">Login Image</Label>
                  <Input
                    id="loginImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        loginImage: e.target.files?.[0] || null,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="twoFactor"
                  checked={createForm.twoFactorAuthentication}
                  onCheckedChange={(checked) =>
                    setCreateForm((prev) => ({
                      ...prev,
                      twoFactorAuthentication: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="twoFactor">
                  Enable Two-Factor Authentication
                </Label>
              </div>

              <LoadingButton
                loading={isCreating}
                type="submit"
                disabled={isCreating}
                className="w-full"
              >
                Create Domain
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="search">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Domain
              </CardTitle>
              <CardDescription>
                Search for a domain to view and update its information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter domain name"
                  value={searchDomain}
                  onChange={(e) => setSearchDomain(e.target.value)}
                />
                <LoadingButton
                  loading={isDomainLoading}
                  onClick={handleSearchDomain}
                  disabled={isDomainLoading}
                >
                  Search
                </LoadingButton>
              </div>
            </CardContent>
          </Card>

          {domainInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Update Domain: {searchDomain}
                </CardTitle>
                <CardDescription>
                  Update domain configuration and limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Current Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Company: {domainInfo.companyName}</span>
                    <span>Admin: {domainInfo.adminName}</span>
                    <span>Email: {domainInfo.adminEmail}</span>
                    <span>
                      2FA:{" "}
                      {domainInfo.twoFactorAuthentication
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">Products: </span>
                    {domainInfo.products?.map((product) => (
                      <Badge key={product} variant="secondary" className="mr-1">
                        {product.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleUpdateDomain} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="updateCompanyName">Company Name</Label>
                    <Input
                      id="updateCompanyName"
                      value={updateForm.companyName}
                      onChange={(e) =>
                        setUpdateForm((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      placeholder="Company Inc."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="updateMaxAdmins">Max Admins</Label>
                      <Input
                        id="updateMaxAdmins"
                        type="number"
                        value={updateForm.maxAdmins}
                        onChange={(e) =>
                          setUpdateForm((prev) => ({
                            ...prev,
                            maxAdmins: e.target.value,
                          }))
                        }
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="updateMaxTeachers">Max Teachers</Label>
                      <Input
                        id="updateMaxTeachers"
                        type="number"
                        value={updateForm.maxTeachers}
                        onChange={(e) =>
                          setUpdateForm((prev) => ({
                            ...prev,
                            maxTeachers: e.target.value,
                          }))
                        }
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="updateMaxStudents">Max Students</Label>
                      <Input
                        id="updateMaxStudents"
                        type="number"
                        value={updateForm.maxStudents}
                        onChange={(e) =>
                          setUpdateForm((prev) => ({
                            ...prev,
                            maxStudents: e.target.value,
                          }))
                        }
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="updateMaxAccountants">
                        Max Accountants
                      </Label>
                      <Input
                        id="updateMaxAccountants"
                        type="number"
                        value={updateForm.maxAccountants}
                        onChange={(e) =>
                          setUpdateForm((prev) => ({
                            ...prev,
                            maxAccountants: e.target.value,
                          }))
                        }
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Products</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="updateErp"
                          checked={updateForm.products.includes("erp")}
                          onCheckedChange={() =>
                            handleProductToggle("erp", false)
                          }
                        />
                        <Label htmlFor="updateErp">ERP</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="updateLms"
                          checked={updateForm.products.includes("lms")}
                          onCheckedChange={() =>
                            handleProductToggle("lms", false)
                          }
                        />
                        <Label htmlFor="updateLms">LMS</Label>
                      </div>
                    </div>
                  </div>

                  <LoadingButton
                    loading={isUpdateDomain}
                    type="submit"
                    disabled={isUpdateDomain}
                  >
                    Update Domain
                  </LoadingButton>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
