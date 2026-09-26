"use client";

import { Pagination as AntPagination } from "antd";
import useOnlineStatus from "@/lib/hooks/useOnlineStatus";
import { useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/pagination";

interface PaginationProps {
  totalResults: number;
}

export default function Pagination({ totalResults }: PaginationProps) {
  const router = useRouter();
  const online = useOnlineStatus();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // меняем только номер страницы, поисковый запрос остаётся в адресе
  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) params.set("page", String(page));
    else params.delete("page");
    router.push(params.size ? `/?${params}` : "/");
  };

  return (
    <AntPagination
      align="center"
      current={currentPage}
      total={totalResults}
      pageSize={PAGE_SIZE}
      showSizeChanger={false}
      hideOnSinglePage
      disabled={!online}
      onChange={handleChange}
      className="!p-4.25"
    />
  );
}
