"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, ToggleRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import useRequestHook from "@/hooks/requestHook"
import api from "@/utils/api"

interface SubscriptionStatus {
  status: string
  domainName: string
  subscriptionId: string
  planId: string
  isActive: boolean
  expiryDate?: string
  [key: string]: any
}

interface GetStatusData {
  domainName: string
}

interface ToggleSubscriptionData {
  domainName: string
  subscriptionId: string
}


export function SubscriptionManagement() {
  
  const { toast } = useToast()


  
  // API hooks
  const [getSubscriptionStatus, statusResult, isGettingStatus, statusError, statusReset, statusStatus] = 
    useRequestHook(api.PAYMENT.GET_SUBSCRIPTION_STATUS, "GET", null, true, false);
  
  const [toggleSubscription, toggleResult, isToggling, toggleError, toggleReset, toggleStatus] = 
    useRequestHook(api.SUPER_ADMIN.TOGGLE_SUBSCRIPTION, "POST", null, true, false);

  // Form states
  const [statusForm, setStatusForm] = useState<GetStatusData>({
    domainName: "",
  })

  const [toggleForm, setToggleForm] = useState<ToggleSubscriptionData>({
    domainName: "",
    subscriptionId: "",
  })

  // Handle subscription status success
  useEffect(() => {
    if (statusStatus === "success" && statusResult) {
      toast({
        title: "Success",
        description: "Subscription status retrieved successfully",
      })
    }
  }, [statusStatus, statusResult, toast])

  // Handle subscription status error
  useEffect(() => {
    if (statusError) {
      toast({
        title: "Error",
        description: "Failed to get subscription status",
        variant: "destructive",
      })
    }
  }, [statusError, toast])

  // Handle toggle subscription success
  useEffect(() => {
    if (toggleStatus === "success" && toggleResult) {
      toast({
        title: "Success",
        description: "Subscription toggled successfully",
      })
      console.log("Toggle subscription response:", toggleResult)
      setToggleForm({
        domainName: "",
        subscriptionId: "",
      })
    }
  }, [toggleStatus, toggleResult, toast])

  // Handle toggle subscription error
  useEffect(() => {
    if (toggleError) {
      toast({
        title: "Error",
        description: "Failed to toggle subscription",
        variant: "destructive",
      })
    }
  }, [toggleError, toast])

  const handleGetSubscriptionStatus = async () => {
    if (!statusForm.domainName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        variant: "destructive",
      })
      return
    }

    // Reset previous results
    statusReset()
    
    // Make API call with domain name as URL parameter
    await getSubscriptionStatus(null, statusForm.domainName)
  }

  const handleToggleSubscription = async () => {
    if (!toggleForm.domainName.trim() || !toggleForm.subscriptionId.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Reset previous results
    toggleReset()
    
    // Make API call with form data
    await toggleSubscription(toggleForm)
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
          <div className="space-y-4">
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
            <Button 
              onClick={handleGetSubscriptionStatus} 
              disabled={isGettingStatus}
              className="w-full"
            >
              {isGettingStatus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Status
            </Button>
          </div>

          {statusResult && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Subscription Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Domain:</span>
                    <span className="text-sm">{statusResult?.domainName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge variant={statusResult?.isActive ? "default" : "secondary"}>
                      {statusResult?.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Subscription ID:</span>
                    <span className="text-sm font-mono">{statusResult?.subscriptionId}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Plan ID:</span>
                    <span className="text-sm font-mono">{statusResult?.planId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Active:</span>
                    <Badge variant={statusResult?.isActive ? "default" : "destructive"}>
                      {statusResult?.isActive ? "Yes" : "No"}
                    </Badge>
                  </div>
                  {statusResult?.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Expires:</span>
                      <span className="text-sm">{statusResult?.expiryDate}</span>
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
          <div className="space-y-4">
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
            <Button 
              onClick={handleToggleSubscription} 
              disabled={isToggling}
              className="w-full"
            >
              {isToggling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Toggle Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}