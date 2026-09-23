import Movies from "@/components/Movies";
import Search from "@/components/Search"

export default async function Home() {
  return (
    <>
      <Search/>
      <Movies />
    </>
  );
}
