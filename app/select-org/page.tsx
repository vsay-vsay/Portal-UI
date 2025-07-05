"use client";
import SelectOrgForm from "@/components/erp/auth/select-organization";
import { useEffect, useState } from "react";

export default function Page() {
  const [logo, setLogo] = useState("");
  const [loginImage, setLoginImage] = useState("");

  useEffect(() => {
    const Logo = localStorage.getItem("logo") || "";
    const ImageLogo = localStorage.getItem("loginImage") || "";
    setLogo(Logo);
    setLoginImage(ImageLogo);
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {logo&&<div className="text-primary-foreground flex size-8 items-center justify-center rounded-md">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <img src={logo} alt="Vsay-logo" />
            </div>}
            VSAY
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SelectOrgForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={loginImage || "/placeholder.svg"}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
