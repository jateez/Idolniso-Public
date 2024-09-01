"use client";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { toast } from "react-toastify";

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
      toast.success("Success removed  item from wishlist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.refresh();
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
