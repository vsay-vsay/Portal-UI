import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";
import React from "react";

function Page() {
  const [fetchLogs, logsData, isLoading, error, reset, status] = useRequestHook(
    api.SECURITY.ADMIN_LOGS,
    "GET",
    null
  );

  return <div></div>;
}

export default Page;
