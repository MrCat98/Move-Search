"use client";

import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { key: "/", label: "Search" },
  { key: "/rated", label: "Rated" },
];

// Вкладки — это отдельные страницы, поэтому активная вкладка берётся из адреса
export default function NavTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs
      centered
      activeKey={pathname}
      items={TABS}
      onChange={(key) => router.push(key)}
      className="w-full"
    />
  );
}
