"use client";
import { Product, Wishlist } from "@/types/type";
import WishlistCard from "./WishlistCard";

export default function WishlistList({ data }: { data: Wishlist[] }) {
  return (
    <>
      {data.map((item: Wishlist) => (
        <WishlistCard key={item.productData?._id} item={item.productData as Product} />
      ))}
    </>
  );
}
