"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CreditCard, CheckCircle, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import useRequestHook from "@/hooks/requestHook"
import api from "@/utils/api"

interface Product {
  name: string
  price: number
  months: number
}

interface InitializePaymentData {
  domainName: string
  products: Product[]
}

interface VerifyPaymentData {
  domainName: string
  subscriptionId: string
  razorpayPlanId: string
  razorpayPaymentId: string
  razorpaySignature: string
  razorpayOrderId: string
}

export function PaymentManagement() {
  const { toast } = useToast()

  // API hooks
  const [initializePayment, initializeResult, isInitializing, initializeError, initializeReset, initializeStatus] = 
    useRequestHook(api.PAYMENT.INIT_PAYMENT, "POST", null, true, false) // Assuming no auth/domain needed

  const [verifyPayment, verifyResult, isVerifying, verifyError, verifyReset, verifyStatus] = 
    useRequestHook(api.PAYMENT.VERIFY_PAYMENT, "POST", null, true, false)

  // Form states
  const [initializeForm, setInitializeForm] = useState<InitializePaymentData>({
    domainName: "",
    products: [],
  })

  const [verifyForm, setVerifyForm] = useState<VerifyPaymentData>({
    domainName: "",
    subscriptionId: "",
    razorpayPlanId: "",
    razorpayPaymentId: "",
    razorpaySignature: "",
    razorpayOrderId: "",
  })

  const [newProduct, setNewProduct] = useState<Product>({
    name: "lms",
    price: 2000,
    months: 3,
  })

  // Handle initialize payment success/error
  useEffect(() => {
    if (initializeStatus === 200 || initializeStatus === 201) {
      toast({
        title: "Success",
        description: "Payment initialized successfully",
      })
      console.log("Payment initialization response:", initializeResult)
      // Optionally reset form or redirect
    } else if (initializeError) {
      toast({
        title: "Error",
        description: initializeError || "Failed to initialize payment",
        variant: "destructive",
      })
    }
  }, [initializeStatus, initializeError, initializeResult, toast])

  // Handle verify payment success/error
  useEffect(() => {
    if (verifyStatus === 200 || verifyStatus === 201) {
      toast({
        title: "Success",
        description: "Payment verified successfully",
      })
      console.log("Payment verification response:", verifyResult)
      // Reset form on success
      setVerifyForm({
        domainName: "",
        subscriptionId: "",
        razorpayPlanId: "",
        razorpayPaymentId: "",
        razorpaySignature: "",
        razorpayOrderId: "",
      })
    } else if (verifyError) {
      toast({
        title: "Error",
        description: verifyError || "Failed to verify payment",
        variant: "destructive",
      })
    }
  }, [verifyStatus, verifyError, verifyResult, toast])

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

    // Validate form data
    if (!initializeForm.domainName.trim()) {
      toast({
        title: "Error",
        description: "Domain name is required",
        variant: "destructive",
      })
      return
    }

    try {
      await initializePayment(initializeForm)
    } catch (error) {
      console.error("Error initializing payment:", error)
    }
  }

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all required fields
    const requiredFields = [
      'domainName',
      'subscriptionId',
      'razorpayPlanId',
      'razorpayPaymentId',
      'razorpaySignature',
      'razorpayOrderId'
    ]

    for (const field of requiredFields) {
      if (!verifyForm[field as keyof VerifyPaymentData].trim()) {
        toast({
          title: "Error",
          description: `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`,
          variant: "destructive",
        })
        return
      }
    }

    try {
      await verifyPayment(verifyForm)
    } catch (error) {
      console.error("Error verifying payment:", error)
    }
  }

  const addProduct = () => {
    // Validate product data
    if (!newProduct.name || newProduct.price <= 0 || newProduct.months <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all product details correctly",
        variant: "destructive",
      })
      return
    }

    // Check for duplicate products
    const isDuplicate = initializeForm.products.some(
      product => product.name === newProduct.name && 
                 product.price === newProduct.price && 
                 product.months === newProduct.months
    )

    if (isDuplicate) {
      toast({
        title: "Error",
        description: "This product configuration already exists",
        variant: "destructive",
      })
      return
    }

    setInitializeForm((prev) => ({
      ...prev,
      products: [...prev.products, { ...newProduct }],
    }))
    
    // Reset new product form
    setNewProduct({
      name: "lms",
      price: 2000,
      months: 3,
    })

    toast({
      title: "Success",
      description: "Product added successfully",
    })
  }

  const removeProduct = (index: number) => {
    setInitializeForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
    
    toast({
      title: "Success",
      description: "Product removed successfully",
    })
  }

  const handleResetInitialize = () => {
    initializeReset()
    setInitializeForm({
      domainName: "",
      products: [],
    })
    setNewProduct({
      name: "lms",
      price: 2000,
      months: 3,
    })
  }

  const handleResetVerify = () => {
    verifyReset()
    setVerifyForm({
      domainName: "",
      subscriptionId: "",
      razorpayPlanId: "",
      razorpayPaymentId: "",
      razorpaySignature: "",
      razorpayOrderId: "",
    })
  }

  const calculateTotal = () => {
    return initializeForm.products.reduce((total, product) => total + product.price, 0)
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
                  disabled={isInitializing}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Products</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addProduct}
                    disabled={isInitializing}
                  >
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
                      disabled={isInitializing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lms">LMS</SelectItem>
                        <SelectItem value="erp">ERP</SelectItem>
                        <SelectItem value="crm">CRM</SelectItem>
                        <SelectItem value="hrms">HRMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productPrice">Price (₹)</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, price: Number.parseInt(e.target.value) || 0 }))}
                      min="1"
                      disabled={isInitializing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productMonths">Months</Label>
                    <Input
                      id="productMonths"
                      type="number"
                      value={newProduct.months}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, months: Number.parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="12"
                      disabled={isInitializing}
                    />
                  </div>
                </div>

                {initializeForm.products.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Added Products</Label>
                      <Badge variant="outline">
                        Total: ₹{calculateTotal()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {initializeForm.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary">{product.name.toUpperCase()}</Badge>
                            <span className="text-sm font-medium">₹{product.price}</span>
                            <span className="text-sm text-gray-500">{product.months} months</span>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeProduct(index)}
                            disabled={isInitializing}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isInitializing || initializeForm.products.length === 0} 
                  className="flex-1"
                >
                  {isInitializing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Initialize Payment
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleResetInitialize}
                  disabled={isInitializing}
                >
                  Reset
                </Button>
              </div>
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
                  disabled={isVerifying}
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
                    disabled={isVerifying}
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
                    disabled={isVerifying}
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
                    disabled={isVerifying}
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
                    disabled={isVerifying}
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
                  disabled={isVerifying}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isVerifying} 
                  className="flex-1"
                >
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify Payment
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleResetVerify}
                  disabled={isVerifying}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}