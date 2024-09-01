"use server";

import { API_BASE_URL } from "./constants";
import { AuthPayload, PropsUserForm } from "../types/type";
import { cookies } from "next/headers";

export const registerUser = async (rawUserForm: PropsUserForm) => {
  const res = await fetch(API_BASE_URL + "/register", {
    method: "POST",
    body: JSON.stringify(rawUserForm),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createCookie = (token: string) => {
  cookies().set("Authorization", "Bearer " + token);
};

export const deleteCookie = () => {
  cookies().delete("Authorization");
};

export const getCookie = () => {
  return cookies().get("Authorization");
};
