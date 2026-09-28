import { cookies } from "next/headers";
import { GUEST_SESSION_COOKIE } from "@/app/api/api";

// id гостевой сессии, которую создаёт src/proxy.ts при первом заходе
export async function getGuestSessionId() {
  return (await cookies()).get(GUEST_SESSION_COOKIE)?.value;
}
