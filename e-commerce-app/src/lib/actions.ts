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

export const createCookie = async (token: string): Promise<void> => {
  cookies().set("Authorization", token, { secure: true });
};

export const deleteCookie = async (): Promise<void> => {
  cookies().delete("Authorization");
};

export const getCookie = async () => {
  return cookies().get("Authorization");
};
