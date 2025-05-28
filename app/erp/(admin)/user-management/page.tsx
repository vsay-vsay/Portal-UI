"use client";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Eye, Edit, UserPlus, Key } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import DialogeWrapper from "@/components/dialogeWrapper";
import UpdateCreateForm from "@/components/erp/UserManagement/UpdateCreateForm";
import { useEffect, useState } from "react";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";

export default function UserManagementPage() {
  const [open, setOpen] = useState(false);
  const [fetchUsers, data, loading, error, reset , statusdata] = useRequestHook(api.USERS, "GET", null);
  // Sample data for users
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers()
  },[])

  useEffect(() => {
    if (data) {
      setUsers(data?.data || []);
    }
  }, [data]);
 

  // Sample data for roles
  const roles = [
    {
      id: "1",
      name: "Admin",
      description: "Full access to all system features",
      users: 2,
      permissions: "All",
      status: "Active",
    },
    {
      id: "2",
      name: "Teacher",
      description: "Access to teaching and student management features",
      users: 25,
      permissions: "Limited",
      status: "Active",
    },
    {
      id: "3",
      name: "Staff",
      description: "Access to administrative features",
      users: 10,
      permissions: "Limited",
      status: "Active",
    },
    {
      id: "4",
      name: "Student",
      description: "Access to student portal features",
      users: 500,
      permissions: "Restricted",
      status: "Active",
    },
    {
      id: "5",
      name: "Parent",
      description: "Access to parent portal features",
      users: 450,
      permissions: "Restricted",
      status: "Active",
    },
  ];

  // Column definitions for the users data table
  const usersColumns = [
    {
      header: "User ID",
      accessorKey: "_id",
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    // {
    //   header: "Department",
    //   accessorKey: "department",
    // },
    // {
    //   header: "Last Login",
    //   accessorKey: "lastLogin",
    // },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue();
        let statusClass = "bg-gray-100 text-gray-800";

        if (status === "Active") {
          statusClass = "bg-green-100 text-green-800";
        } else if (status === "Inactive") {
          statusClass = "bg-red-100 text-red-800";
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Key className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Column definitions for the roles data table
  const rolesColumns = [
    {
      header: "Role Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Users",
      accessorKey: "users",
    },
    {
      header: "Permissions",
      accessorKey: "permissions",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue();
        let statusClass = "bg-gray-100 text-gray-800";

        if (status === "Active") {
          statusClass = "bg-green-100 text-green-800";
        } else if (status === "Inactive") {
          statusClass = "bg-red-100 text-red-800";
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            Permissions
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="User Management"
        description="Manage users, roles, and permissions"
        actions={
          <div className="flex items-center gap-2">
            <DialogeWrapper
              open={open}
              setOpen={setOpen}
              title="Add New User"
              description="Create a new user account with role and permissions"
              TriggerButton={
                <Button onClick={() => setOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              }
            >
              <UpdateCreateForm setOpen={setOpen} />
            </DialogeWrapper>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Role</DialogTitle>
                  <DialogDescription>
                    Create a new role with specific permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roleName" className="text-right">
                      Role Name
                    </Label>
                    <Input
                      id="roleName"
                      placeholder="Librarian"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roleDescription" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="roleDescription"
                      placeholder="Access to library management features"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">Permissions</Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="viewStudents" />
                        <Label htmlFor="viewStudents">View Students</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="editStudents" />
                        <Label htmlFor="editStudents">Edit Students</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="viewTeachers" />
                        <Label htmlFor="viewTeachers">View Teachers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="editTeachers" />
                        <Label htmlFor="editTeachers">Edit Teachers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="viewClasses" />
                        <Label htmlFor="viewClasses">View Classes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="editClasses" />
                        <Label htmlFor="editClasses">Edit Classes</Label>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search users..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage all users and their access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable loading={loading} columns={usersColumns} data={users} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roles" className="space-y-4">
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search roles..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>
                Manage all roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={rolesColumns} data={roles} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
