"use client";

import { Alert } from "antd";
import { OFFLINE_MESSAGE } from "@/app/errors/errors";
import useOnlineStatus from "@/lib/hooks/useOnlineStatus";

export default function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;

  return (
    <Alert
      type="warning"
      banner
      showIcon
      title={`${OFFLINE_MESSAGE}. Проверьте соединение`}
    />
  );
}
