"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Domain {
  id: string
  domainName: string
  companyName: string
  maxAdmins: number
  maxTeachers: number
  status: "active" | "pending" | "expired"
  createdAt: string
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: "683171c6c0b5f46f70bcf895",
      domainName: "yesveer",
      companyName: "yesveer",
      maxAdmins: 5,
      maxTeachers: 20,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      domainName: "example",
      companyName: "Example Corp",
      maxAdmins: 3,
      maxTeachers: 15,
      status: "pending",
      createdAt: "2024-01-10",
    },
  ])

  const [newDomain, setNewDomain] = useState({
    domainName: "",
    companyName: "",
    maxAdmins: 5,
    maxTeachers: 20,
  })

  const [checkDomain, setCheckDomain] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleCreateDomain = async () => {
    try {
      // Simulate API call
      const domain: Domain = {
        id: Date.now().toString(),
        ...newDomain,
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
      }

      setDomains([...domains, domain])
      setNewDomain({ domainName: "", companyName: "", maxAdmins: 5, maxTeachers: 20 })
      setIsDialogOpen(false)

      toast({
        title: "Domain created successfully",
        description: `${newDomain.domainName} has been added to your domains`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create domain",
        variant: "destructive",
      })
    }
  }

  const handleCheckDomain = async () => {
    try {
      // Simulate domain check
      toast({
        title: "Domain checked",
        description: `${checkDomain} is available for registration`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check domain",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Domains</h2>
          <p className="text-muted-foreground">Manage your domains and check availability</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Domain</DialogTitle>
              <DialogDescription>Add a new domain to your account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domainName">Domain Name</Label>
                <Input
                  id="domainName"
                  value={newDomain.domainName}
                  onChange={(e) => setNewDomain({ ...newDomain, domainName: e.target.value })}
                  placeholder="example"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={newDomain.companyName}
                  onChange={(e) => setNewDomain({ ...newDomain, companyName: e.target.value })}
                  placeholder="Example Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAdmins">Max Admins</Label>
                  <Input
                    id="maxAdmins"
                    type="number"
                    value={newDomain.maxAdmins}
                    onChange={(e) => setNewDomain({ ...newDomain, maxAdmins: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTeachers">Max Teachers</Label>
                  <Input
                    id="maxTeachers"
                    type="number"
                    value={newDomain.maxTeachers}
                    onChange={(e) => setNewDomain({ ...newDomain, maxTeachers: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={handleCreateDomain} className="w-full">
                Create Domain
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Domain Check */}
      <Card>
        <CardHeader>
          <CardTitle>Check Domain Availability</CardTitle>
          <CardDescription>Check if a domain name is available for registration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter domain name"
              value={checkDomain}
              onChange={(e) => setCheckDomain(e.target.value)}
            />
            <Button onClick={handleCheckDomain}>
              <Search className="mr-2 h-4 w-4" />
              Check
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Domains List */}
      <div className="grid gap-4">
        {domains.map((domain) => (
          <Card key={domain.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{domain.domainName}</h3>
                    <Badge className={getStatusColor(domain.status)}>{domain.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{domain.companyName}</p>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>Max Admins: {domain.maxAdmins}</span>
                    <span>Max Teachers: {domain.maxTeachers}</span>
                    <span>Created: {domain.createdAt}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
