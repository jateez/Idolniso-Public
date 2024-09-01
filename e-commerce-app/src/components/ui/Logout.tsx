"use client";

import { deleteCookie, getCookie } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function Logout() {
  const router = useRouter();
  async function handlerLogOut(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCookie();
    router.push("/");
    router.refresh();
  }
  return (
    <>
      <button className="btn btn-ghost " onClick={handlerLogOut}>
        Log out
      </button>
    </>
  );
}
