"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import useRequestHook from "@/hooks/requestHook";

const SelectOrgForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [domainName, setDomain] = useState("");

  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [VerifyDomain, domainData, isLoading, error, reset] = useRequestHook(
    "super-admin/domain",
    "POST",
    null,
    false,
    false
  );

  // ✅ Check if domain is already stored in browser, redirect to login page
  useEffect(() => {
    const storedDomain = localStorage.getItem("selectedDomain");
    if (storedDomain) {
      navigate.replace("/"); // Redirect to login page
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    VerifyDomain({ domainName });
  };

  useEffect(() => {
    if (domainData) {
      if (domainData?.domainName) {
        localStorage.setItem("selectedDomain", domainData?.domainName);
        localStorage.setItem("domainName", domainData?.domainName);
        navigate.replace("/");
      } 
    }
  }, [domainData, domainName]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Select Your Organization</h1>
        <p className="text-muted-foreground text-sm">
          Enter your organization name to proceed.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="domain">Organization Name</Label>
          <Input
            id="domainName"
            type="text"
            placeholder="vsay"
            required
            value={domainName}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <LoadingButton loading={isLoading} type="submit" className="w-full ">
          Continue
        </LoadingButton>
      </div>
    </form>
  );
};
export default SelectOrgForm;
