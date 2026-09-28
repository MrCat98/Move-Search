import { NextResponse, type NextRequest } from "next/server";
import { GUEST_SESSION_COOKIE, createGuestSession } from "@/app/api/api";

// При первом заходе создаём гостевую сессию TMDB и храним её id в cookie.
// Токен TMDB есть только на сервере, поэтому сессия создаётся здесь, а не в браузере.
export async function proxy(request: NextRequest) {
  if (request.cookies.has(GUEST_SESSION_COOKIE)) return NextResponse.next();

  let session;
  try {
    session = await createGuestSession();
  } catch (e) {
    // без сессии приложение работает, попробуем снова при следующем запросе
    console.error(e);
    return NextResponse.next();
  }

  // кладём cookie и в текущий запрос, чтобы страница увидела сессию уже при первом рендере
  request.cookies.set(GUEST_SESSION_COOKIE, session.guest_session_id);
  const response = NextResponse.next({ request: { headers: request.headers } });

  const expires = new Date(session.expires_at);
  response.cookies.set(GUEST_SESSION_COOKIE, session.guest_session_id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(Number.isNaN(expires.getTime()) ? { maxAge: 60 * 60 * 24 } : { expires }),
  });
  return response;
}

export const config = {
  // только страницы: без статики, картинок и favicon
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
