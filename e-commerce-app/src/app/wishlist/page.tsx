import { API_BASE_URL } from "@/lib/constants";
import WishlistList from "../../components/Wishlists";
import { cookies } from "next/headers";
export default async function Wishlist() {
  const res = await fetch(`${API_BASE_URL}/wishlist`, {
    headers: {
      Cookie: `Authorization=${cookies().get("Authorization")?.value || ""}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    console.log(result.message);
  }
  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)] items-center justify-between p-24 gap-y-5">
      <div id="1" className="w-full h-24 flex gap-x-5">
        <div className="w-1/4 h-full gap-y-5 flex flex-col">
          <h1 className="font-semibold text-lg">Result</h1>
          <h2>{result.wishlists.length + " Item(s)"}</h2>
        </div>
        <div className="w-3/4 h-full">
          <div className="grid grid-cols-4 gap-5">
            <WishlistList data={result.wishlists} />
          </div>
        </div>
      </div>
    </main>
  );
}
