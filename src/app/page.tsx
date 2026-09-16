import Movies from "@/components/Movies/Movies";
import Search from "@/components/SearchMovie/Search";
export default async function Home() {
  return (
    <>
      <Search />
      <Movies />
    </>
  );
}
