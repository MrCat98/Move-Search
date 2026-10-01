"use client";

import { Alert, Button } from "antd";

export default function ErrorAlert({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="w-full max-w-252.5 mx-auto p-5">
      <Alert
        type="error"
        showIcon
        title={title}
        description={description}
        action={
          <Button
            size="small"
            danger
            href="/">
            Вернуться на главную
          </Button>
        }
      />
    </div>
  );
}
