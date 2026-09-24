"use client";

import { message } from "antd";
import { OFFLINE_MESSAGE, getErrorMessage } from "@/app/errors/errors";
import useOnlineStatus from "./useOnlineStatus";

// Общая логика ошибок сети: проверка соединения и показ уведомления.
// contextHolder нужно вывести в разметке компонента.
export default function useErrorMessage() {
  const online = useOnlineStatus();
  const [messageApi, contextHolder] = message.useMessage();

  // false и уведомление, если сети нет
  const ensureOnline = () => {
    if (!online) messageApi.error(OFFLINE_MESSAGE);
    return online;
  };

  const showError = (e: unknown) => messageApi.error(getErrorMessage(e));

  const showNotFound = (query: string) =>
    messageApi.warning(`По запросу «${query}» ничего не найдено`);

  return { ensureOnline, showError, showNotFound, contextHolder };
}
