"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useRequestHook = (
  endpoint: string,
  method: Method = "GET",
  initialData: any = null,
  useToken = true,
  useDomain = true
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const fetchData = async (customData: any = initialData) => {
    setLoading(true);
    setError(null);
    setStatusCode(null);

    try {
      const token = localStorage.getItem("token");
      const domainName = localStorage.getItem("domainName");

      let payload = customData || {};

      // Add domainName if needed
      if (useDomain && !(payload instanceof FormData)) {
        if (!domainName) throw new Error("No domain name found");
        payload = { ...payload, domainName };
      }

      // Prepare headers
      const headers: Record<string, string> = {};
      if (useToken && token) headers["Authorization"] = `Bearer ${token}`;
      if (!(payload instanceof FormData))
        headers["Content-Type"] = "application/json";

      // Axios request config
      const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        ...(method === "GET" || method === "DELETE"
          ? { params: payload }
          : {
              data: payload
            }),
      };

      const res = await axios(config);
      const responseData = res.data;
      setStatusCode(res.status);

      // Accept any 2xx HTTP response
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.statusText || "Request failed");
      }

      // Optional: Check API response code or success field
      if (responseData?.success === false) {
        throw new Error(responseData?.message || "Something went wrong");
      }

      setData(responseData);
    } catch (err: unknown) {
      console.error("Request Error:", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        setStatusCode(axiosError.response?.status || 500);
        setError(
          axiosError.response?.data?.message ||
            axiosError.message ||
            "Server error"
        );
      } else if (err instanceof Error) {
        setError(err.message);
        setStatusCode(500);
      } else {
        setError("Unexpected error occurred");
        setStatusCode(500);
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setStatusCode(null);
  };

  return [fetchData, data, loading, error, reset, statusCode] as const;
};

export default useRequestHook;
