"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/type";

export default function Pagination({ dataLength, loadMore, hasMore, data }: { dataLength: number; loadMore: () => void; hasMore: boolean; data: Product[] }) {
  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <main className="flex h-full w-full p-24">
            <div className="skeleton w-full h-full text-center">Loading</div>
          </main>
        }
        endMessage={<p className="text-center pt-10 text-lg font-lg">No more items to load.</p>}
      >
        <div className="grid grid-cols-4 gap-5">
          {data.map((item: Product) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
