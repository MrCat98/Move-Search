"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Spin } from "antd";
import debounce from "lodash/debounce";
import useOnlineStatus from "@/lib/hooks/useOnlineStatus";

const DEBOUNCE_MS = 500;

export default function SearchMovie() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const online = useOnlineStatus();
  const [value, setValue] = useState(searchParams.get("query") ?? "");
  const [pending, startTransition] = useTransition();

  // Одна debounce-функция на весь жизненный цикл компонента: выполняет колбэк
  // из последнего вызова, т.е. поиск по последнему введённому тексту
  const [debounced] = useState(() => debounce((run: () => void) => run(), DEBOUNCE_MS));
  useEffect(() => () => debounced.cancel(), [debounced]);

  // Запрос хранится в адресе сервер по нему загружает фильмы, новый поискс 1-й страницы
  const search = (text: string) => {
    debounced.cancel();
    const query = text.trim();
    if (!online || query === (searchParams.get("query") ?? "")) return;

    const url = query ? `/?query=${encodeURIComponent(query)}` : "/";
    startTransition(() => router.replace(url));
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <Input
        placeholder="Type to search..."
        value={value}
        onChange={(e) => {
          const text = e.target.value;
          setValue(text);
          debounced(() => search(text));
        }}
        onPressEnter={() => search(value)}
        suffix={<Spin size="small" spinning={pending} />}
        allowClear
        className="mt-4.75 w-full"
        size="large"
      />
    </div>
  );
}
