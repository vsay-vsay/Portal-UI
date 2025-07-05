"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import useRequestHook from "@/hooks/requestHook";
import { useAuth } from "@/context/auth-context";
import api from "@/utils/api";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState<"user" | "superadmin">("user");
  const { login, domainName1 } = useAuth();
  const [loginUser, loginData, loading, error1, reset] = useRequestHook(
    api.AUTH.LOGIN,
    "POST",
    null
  );

  // Check if email indicates superadmin login
  const isSuperadmin = loginType === "superadmin" || email.includes("@superadmin") || email.includes("admin@");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Prepare payload based on login type
    const payload = isSuperadmin 
      ? { email, password } // No domain for superadmin
      : { email, password, domainName1 }; // Include domain for regular users

    await loginUser(payload);
  };

  useEffect(() => {
    if (loginData?.data.token) {
      login(loginData?.data);
    } else if (loginData?.message) {
      setError(loginData?.message);
    }
  }, [loginData]);

  const handleLoginTypeChange = (type: "user" | "superadmin") => {
    setLoginType(type);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Login Type Selector */}
      <div className="mb-6">
        <div className="flex rounded-lg border p-1 bg-muted">
          <button
            type="button"
            onClick={() => handleLoginTypeChange("user")}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
              loginType === "user"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => handleLoginTypeChange("superadmin")}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
              loginType === "superadmin"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Super Admin
          </button>
        </div>
      </div>

      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            {loginType === "superadmin" ? "Super Admin Login" : "Login to your account"}
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            {loginType === "superadmin" 
              ? "Enter your super admin credentials to access the system"
              : "Enter your email below to login to your account"
            }
          </p>
        </div>

        <div className="grid gap-6">
          {/* Organization Name - Only show for regular users */}
          {loginType === "user" && (
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="domain">Organization Name</Label>
                <a
                  href="/select-org"
                  onClick={() => {
                    localStorage.removeItem("selectedDomain");
                  }}
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Change Organization?
                </a>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3 bg-muted/50">
                <span className="text-sm font-medium">{domainName1}</span>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type={loginType==="superadmin"?'text':'email'}
              placeholder={loginType === "superadmin" ? "admin@example.com" : "m@example.com"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/15 border border-destructive/20 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          {/* Login Button */}
          <LoadingButton loading={loading} type="submit" className="w-full">
            {loginType === "superadmin" ? "Login as Super Admin" : "Login"}
          </LoadingButton>

          {/* Only show Google login for regular users */}
          {loginType === "user" && (
            <>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full">
                <svg
                  className="mr-2 h-4 w-4"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Login with Google
              </Button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm">
          {loginType === "user" ? (
            <>
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Contact Admin
              </a>
            </>
          ) : (
            <span className="text-muted-foreground">
              Super Admin access only
            </span>
          )}
        </div>
      </form>
    </div>
  );
}