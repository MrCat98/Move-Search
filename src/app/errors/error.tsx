'use client'

import { Alert, Button } from "antd";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="max-w-252.5 mx-auto p-5">
      <Alert
        type="error"
        showIcon
        title="Не удалось загрузить фильмы"
        description={error.message}
        // полная перезагрузка сбрасывает ошибку; Link на тот же путь её не сбрасывает
        action={
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          <Button onClick={() => window.location.assign("/")}>
            Вернуться на главную
          </Button>
        }
      />
    </div>
  );
}
