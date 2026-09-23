'use client'

import { Pagination as AntPagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalResults: number;
}

export default function Pagination({ totalResults }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <AntPagination
      align="center"
      current={currentPage}
      total={totalResults}
      pageSize={20}
      onChange={handleChange}
    />
  );
}
