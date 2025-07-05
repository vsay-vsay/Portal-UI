"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, ToggleRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SubscriptionStatus {
  status: string
  domainName: string
  subscriptionId: string
  planId: string
  isActive: boolean
  expiryDate?: string
  [key: string]: any
}

export function SubscriptionManagement() {
  const [statusLoading, setStatusLoading] = useState(false)
  const [toggleLoading, setToggleLoading] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null)
  const { toast } = useToast()

  const [statusForm, setStatusForm] = useState({
    domainName: "",
  })

  const [toggleForm, setToggleForm] = useState({
    domainName: "",
    subscriptionId: "",
  })

  const handleGetSubscriptionStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusLoading(true)

    try {
      const response = await fetch(`http://localhost:3004/api/payment/subscription-status/${statusForm.domainName}`, {
        method: "GET",
      })

      if (response.ok) {
        const data = await response.json()
        setSubscriptionStatus(data)
        toast({
          title: "Success",
          description: "Subscription status retrieved successfully",
        })
      } else {
        throw new Error("Failed to get subscription status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get subscription status",
        variant: "destructive",
      })
      setSubscriptionStatus(null)
    } finally {
      setStatusLoading(false)
    }
  }

  const handleToggleSubscription = async (e: React.FormEvent) => {
    e.preventDefault()
    setToggleLoading(true)

    try {
      const response = await fetch("http://localhost:3004/api/super-admin/toggle-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toggleForm),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Success",
          description: "Subscription toggled successfully",
        })
        console.log("Toggle subscription response:", data)
        setToggleForm({
          domainName: "",
          subscriptionId: "",
        })
      } else {
        throw new Error("Failed to toggle subscription")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle subscription",
        variant: "destructive",
      })
    } finally {
      setToggleLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Check Subscription Status
          </CardTitle>
          <CardDescription>Get the current subscription status for a domain</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGetSubscriptionStatus} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="statusDomainName">Domain Name</Label>
              <Input
                id="statusDomainName"
                value={statusForm.domainName}
                onChange={(e) => setStatusForm((prev) => ({ ...prev, domainName: e.target.value }))}
                placeholder="yesveer"
                required
              />
            </div>
            <Button type="submit" disabled={statusLoading}>
              {statusLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Status
            </Button>
          </form>

          {subscriptionStatus && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Subscription Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Domain:</span>
                    <span className="text-sm">{subscriptionStatus.domainName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge variant={subscriptionStatus.isActive ? "default" : "secondary"}>
                      {subscriptionStatus.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Subscription ID:</span>
                    <span className="text-sm font-mono">{subscriptionStatus.subscriptionId}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Plan ID:</span>
                    <span className="text-sm font-mono">{subscriptionStatus.planId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Active:</span>
                    <Badge variant={subscriptionStatus.isActive ? "default" : "destructive"}>
                      {subscriptionStatus.isActive ? "Yes" : "No"}
                    </Badge>
                  </div>
                  {subscriptionStatus.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Expires:</span>
                      <span className="text-sm">{subscriptionStatus.expiryDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ToggleRight className="h-5 w-5" />
            Toggle Subscription
          </CardTitle>
          <CardDescription>Enable or disable a subscription for a domain</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleToggleSubscription} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toggleDomainName">Domain Name</Label>
              <Input
                id="toggleDomainName"
                value={toggleForm.domainName}
                onChange={(e) => setToggleForm((prev) => ({ ...prev, domainName: e.target.value }))}
                placeholder="yesveer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toggleSubscriptionId">Subscription ID</Label>
              <Input
                id="toggleSubscriptionId"
                value={toggleForm.subscriptionId}
                onChange={(e) => setToggleForm((prev) => ({ ...prev, subscriptionId: e.target.value }))}
                placeholder="sub_QYgFygcmB4ORSL"
                required
              />
            </div>
            <Button type="submit" disabled={toggleLoading}>
              {toggleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Toggle Subscription
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
