"use server";
import Link from "next/link";
import Logout from "./ui/Logout";
import { cookies } from "next/headers";

export default async function Navbar() {
  return (
    <div className="navbar h-[64px] bg-red-300 px-24 sticky z-50 top-0">
      <div className="navbar-start">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Idolniso
        </Link>
        <Link href={"/products"} className="btn btn-ghost text-md">
          Products
        </Link>
        {cookies().get("Authorization") ? (
          <Link href={"/wishlist"} className="btn btn-ghost text-md">
            Wishlists
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="navbar-end">
        {cookies().get("Authorization") ? (
          <Logout />
        ) : (
          <Link href={"/login"} className="btn btn-ghost text-md">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
