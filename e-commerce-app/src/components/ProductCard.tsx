"use client";
import { Product } from "@/types/type";
import Link from "next/link";
import WishlistButton from "./ui/WishlistButton";

export default function ProductCard({ item }: { item: Product }) {
  return (
    <Link key={item._id} href={`/products/${item.slug}`} className="card card-compact bg-base-100 shadow-xl rounded-none hover:bg-slate-200">
      <img className="h-44 max-w-full object-cover" src={item.thumbnail} alt={item.name} />
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{item.excerpt}</p>
        <div className="card-actions justify-between items-center">
          <div className="badge badge-outline">{item.tags[0]}</div>
          <WishlistButton productId={item._id} />
        </div>
      </div>
    </Link>
  );
}
