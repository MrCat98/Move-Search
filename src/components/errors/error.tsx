'use client'

import { useEffect } from "react";
import ErrorAlert from "@/components/errors/ErrorAlert";
import { UNKNOWN_MESSAGE } from "@/components/errors/errors";

// Граница ошибок для всех страниц приложения.
// В продакшене error.message из серверных компонентов скрыт, поэтому показываем общий текст.
export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorAlert
      title={UNKNOWN_MESSAGE}
      description={error.digest ? `Код ошибки: ${error.digest}` : undefined}
    />
  );
}
