"use client";
import Pagination from "@/components/Pagination";
import Search from "@/components/ui/Search";
import { API_BASE_URL } from "@/lib/constants";
import { Product } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const debouncedSearch = useDebounce(search, 500);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products?search=${search}&sort=${sort}&page=${page}`);
      const result = await res.json();
      if (page === 1) {
        setData(result.products);
      } else {
        setData((prev) => [...prev, ...result.products]);
      }
      setHasMore(result.currentPage < result.totalPages);
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
  }, [debouncedSearch, sort, page]);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [debouncedSearch, sort]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)] items-center justify-between p-24 gap-y-5">
      <div id="1" className="w-full h-24 flex gap-x-5">
        <div className="w-1/4 h-full gap-y-5 flex flex-col">
          <h1 className="font-semibold text-lg">Result</h1>
          <h2>{data.length + " Item(s)"}</h2>
        </div>
        <div className="w-3/4 h-full flex justify-between gap-x-5">
          <Search search={search} handler={handleSearch} />
          <div className="w-1/4 h-full flex flex-col gap-y-5 items-end">
            <div className="w-[72%]">Sort By</div>
            <select className="select select-bordered rounded-none w-[72%]" value={sort} onChange={handleSort}>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <div id="2" className="w-full h-full">
        <div className="flex justify-between gap-x-5">
          <div className="w-1/4 h-full">
            <div className="h-full flex flex-col text-lg text-start gap-y-5">
              <button className="btn-ghost btn-xl w-full text-start font-medium border-b-[1px] border-b-gray-200">Albums</button>
              <button className="btn-ghost btn-xl w-full text-start font-medium border-b-[1px] border-b-gray-200">Photocards</button>
              <button className="btn-ghost btn-xl w-full text-start font-medium border-b-[1px] border-b-gray-200">Poster</button>
            </div>
          </div>
          <div className="w-3/4 h-full">
            <Pagination loadMore={loadMore} hasMore={hasMore} dataLength={data.length} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
