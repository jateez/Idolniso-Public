"use client";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function RemoveWishlistButton({ productId }: { productId: string }) {
  const router = useRouter();
  async function handlerRemoveFavorite(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE_URL + "/wishlist", {
        method: "DELETE",
        body: JSON.stringify({
          productId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <button onClick={handlerRemoveFavorite} className="btn btn-sm btn-ghost outline-secondary-main">
        Remove
      </button>
    </>
  );
}
