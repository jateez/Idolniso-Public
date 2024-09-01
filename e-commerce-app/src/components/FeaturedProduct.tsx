import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Product } from "@/types/type";
import { API_BASE_URL } from "@/lib/constants";
import { toast } from "react-toastify";

export default async function FeaturedProduct() {
  const res = await fetch(API_BASE_URL + "/products");
  const result = await res.json();
  if (!res.ok) {
    toast.error(`${result.message}`, {
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
  const data = result.products.slice(0, 5);
  return (
    <>
      <div className="min-h-[calc(100vh-64px)] p-24 flex flex-col gap-y-5 ">
        <div className="flex justify-between w-full h-[20%]">
          <div className="text-xl font-semibold">Our Latest Additions</div>
        </div>
        <div className="flex gap-x-5 w-full h-[80%] justify-between">
          {data.map((item: Product) => (
            <ProductCard item={item} />
          ))}

          <div>
            <div className="bg-base-100 w-44 rounded-none h-full flex items-center">
              <div className="flex justify-center items-center gap-5 btn btn-ghost">
                <Link href={"/products"} className="card-title">
                  {"See More"}
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
