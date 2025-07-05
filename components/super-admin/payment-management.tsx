"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CreditCard, CheckCircle, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  name: string
  price: number
  months: number
}

export function PaymentManagement() {
  const [initializeLoading, setInitializeLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const { toast } = useToast()

  const [initializeForm, setInitializeForm] = useState({
    domainName: "",
    products: [] as Product[],
  })

  const [verifyForm, setVerifyForm] = useState({
    domainName: "",
    subscriptionId: "",
    razorpayPlanId: "",
    razorpayPaymentId: "",
    razorpaySignature: "",
    razorpayOrderId: "",
  })

  const [newProduct, setNewProduct] = useState({
    name: "lms",
    price: 2000,
    months: 3,
  })

  const handleInitializePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (initializeForm.products.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product",
        variant: "destructive",
      })
      return
    }

    setInitializeLoading(true)
    try {
      const response = await fetch("http://localhost:3004/api/payment/initialize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initializeForm),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Success",
          description: "Payment initialized successfully",
        })
        console.log("Payment initialization response:", data)
      } else {
        throw new Error("Failed to initialize payment")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize payment",
        variant: "destructive",
      })
    } finally {
      setInitializeLoading(false)
    }
  }

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifyLoading(true)

    try {
      const response = await fetch("http://localhost:3004/api/payment/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyForm),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Success",
          description: "Payment verified successfully",
        })
        console.log("Payment verification response:", data)
        setVerifyForm({
          domainName: "",
          subscriptionId: "",
          razorpayPlanId: "",
          razorpayPaymentId: "",
          razorpaySignature: "",
          razorpayOrderId: "",
        })
      } else {
        throw new Error("Failed to verify payment")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify payment",
        variant: "destructive",
      })
    } finally {
      setVerifyLoading(false)
    }
  }

  const addProduct = () => {
    setInitializeForm((prev) => ({
      ...prev,
      products: [...prev.products, { ...newProduct }],
    }))
    setNewProduct({
      name: "lms",
      price: 2000,
      months: 3,
    })
  }

  const removeProduct = (index: number) => {
    setInitializeForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
  }

  return (
    <Tabs defaultValue="initialize" className="space-y-6">
      <TabsList>
        <TabsTrigger value="initialize">Initialize Payment</TabsTrigger>
        <TabsTrigger value="verify">Verify Payment</TabsTrigger>
      </TabsList>

      <TabsContent value="initialize">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Initialize Payment
            </CardTitle>
            <CardDescription>Initialize payment for domain products and subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInitializePayment} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="paymentDomainName">Domain Name</Label>
                <Input
                  id="paymentDomainName"
                  value={initializeForm.domainName}
                  onChange={(e) => setInitializeForm((prev) => ({ ...prev, domainName: e.target.value }))}
                  placeholder="yesveer"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Products</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Select
                      value={newProduct.name}
                      onValueChange={(value) => setNewProduct((prev) => ({ ...prev, name: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lms">LMS</SelectItem>
                        <SelectItem value="erp">ERP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productPrice">Price</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, price: Number.parseInt(e.target.value) }))}
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productMonths">Months</Label>
                    <Input
                      id="productMonths"
                      type="number"
                      value={newProduct.months}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, months: Number.parseInt(e.target.value) }))}
                      min="1"
                    />
                  </div>
                </div>

                {initializeForm.products.length > 0 && (
                  <div className="space-y-2">
                    <Label>Added Products</Label>
                    <div className="space-y-2">
                      {initializeForm.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary">{product.name.toUpperCase()}</Badge>
                            <span className="text-sm">₹{product.price}</span>
                            <span className="text-sm text-gray-500">{product.months} months</span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeProduct(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" disabled={initializeLoading} className="w-full">
                {initializeLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Initialize Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="verify">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Verify Payment
            </CardTitle>
            <CardDescription>Verify payment using Razorpay transaction details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyPayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verifyDomainName">Domain Name</Label>
                <Input
                  id="verifyDomainName"
                  value={verifyForm.domainName}
                  onChange={(e) => setVerifyForm((prev) => ({ ...prev, domainName: e.target.value }))}
                  placeholder="yesveer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subscriptionId">Subscription ID</Label>
                  <Input
                    id="subscriptionId"
                    value={verifyForm.subscriptionId}
                    onChange={(e) => setVerifyForm((prev) => ({ ...prev, subscriptionId: e.target.value }))}
                    placeholder="sub_QYgFygcmB4ORSL"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razorpayPlanId">Razorpay Plan ID</Label>
                  <Input
                    id="razorpayPlanId"
                    value={verifyForm.razorpayPlanId}
                    onChange={(e) => setVerifyForm((prev) => ({ ...prev, razorpayPlanId: e.target.value }))}
                    placeholder="plan_QYgFxmoV9preP5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razorpayPaymentId">Razorpay Payment ID</Label>
                  <Input
                    id="razorpayPaymentId"
                    value={verifyForm.razorpayPaymentId}
                    onChange={(e) => setVerifyForm((prev) => ({ ...prev, razorpayPaymentId: e.target.value }))}
                    placeholder="pay_QYgKVeW1G5ctdv"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razorpayOrderId">Razorpay Order ID</Label>
                  <Input
                    id="razorpayOrderId"
                    value={verifyForm.razorpayOrderId}
                    onChange={(e) => setVerifyForm((prev) => ({ ...prev, razorpayOrderId: e.target.value }))}
                    placeholder="order_QYgG0KYKfbef4d"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="razorpaySignature">Razorpay Signature</Label>
                <Input
                  id="razorpaySignature"
                  value={verifyForm.razorpaySignature}
                  onChange={(e) => setVerifyForm((prev) => ({ ...prev, razorpaySignature: e.target.value }))}
                  placeholder="5c13605a9fb35289f8447d2b57a18c1dcec51bfd684d3a709f00f50fff083679"
                  required
                />
              </div>

              <Button type="submit" disabled={verifyLoading} className="w-full">
                {verifyLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
