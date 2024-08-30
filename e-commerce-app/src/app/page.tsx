"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [arr, setArr] = useState([1, 2, 3, 4, 5]);
  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)] items-center justify-around p-24">
      <div id="1" className="w-full h-24 bg-blue-600 flex gap-x-5">
        <div className="w-1/3 h-full bg-green-400 gap-y-5">
          <div className="flex flex-col">
            <h1>Result</h1>
            <h2>{"212 Item(s)"}</h2>
          </div>
        </div>
        <div className="w-2/3 h-full bg-orange-400 flex justify-around gap-x-5">
          <div className="w-2/3 h-full flex flex-col gap-y-5">
            <div className="">Search</div>
            <input type="text" name="" id="" className="input input-md rounded-none" />
          </div>
          <div className="w-1/3 h-full flex flex-col gap-y-5">
            <div>Sort By</div>
            <input type="text" name="" id="" className="input input-md rounded-none" />
          </div>
        </div>
      </div>
      <div id="2" className="w-full h-full">
        <div className="flex justify-around gap-x-5">
          <div className="w-1/3 h-full bg-red-500">
            <div className="h-full flex flex-col text-lg text-start">
              <button className="btn-ghost btn-xl w-full text-start font-medium">Albums</button>
              <button className="btn-ghost btn-xl w-full text-start font-medium">Photocards</button>
              <button className="btn-ghost btn-xl w-full text-start font-medium">Poster</button>
            </div>
          </div>
          <div className="w-2/3 h-full bg-gray-600">
            <div className="w-full h-full gap-5 flex">
              <div className="grid grid-cols-4 gap-5 bg-blue-900 ">
                {arr.map((ar) => (
                  <div className="card card-compact bg-base-100 shadow-xl rounded-none">
                    <img className="h-44 w-full object-cover" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                    <div className="card-body">
                      <h2 className="card-title">
                        Shoes!
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <p>If a dog chews shoes whose shoes does he choose?....</p>
                      <div className="card-actions justify-end">
                        {/* <div className="badge badge-outline">Fashion</div> */}
                        {/* <div className="badge badge-outline">Products</div> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
