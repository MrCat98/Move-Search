import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { App, ConfigProvider } from 'antd';
import { getAllRatings, getGenres, type Genre } from "@/app/api/api";
import { getGuestSessionId } from "@/lib/session";
import { GenresProvider } from "@/context/GenresContext";
import { RatingsProvider } from "@/context/RatingsContext";
import NavTabs from "@/components/tabs/NavTabs";
import OfflineBanner from "@/components/errors/offline/OfflineBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinosearch",
  description: "Поиск фильмов по данным TMDB",
};

// Без жанров и оценок приложение работает: карточки просто покажутся без них
async function loadGenres(): Promise<Genre[]> {
  try {
    return await getGenres();
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function loadRatings(): Promise<Record<number, number>> {
  const sessionId = await getGuestSessionId();
  if (!sessionId) return {};
  try {
    return await getAllRatings(sessionId);
  } catch (e) {
    console.error(e);
    return {};
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [genres, ratings] = await Promise.all([loadGenres(), loadRatings()]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConfigProvider theme={{ token: { fontFamily: 'inter' } }}>
          <App component={false}>
            <GenresProvider genres={genres}>
              <RatingsProvider initial={ratings}>
                <OfflineBanner />
                <NavTabs />
                {children}
              </RatingsProvider>
            </GenresProvider>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
