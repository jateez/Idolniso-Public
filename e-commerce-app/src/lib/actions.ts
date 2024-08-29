import { API_BASE_URL } from "./constants";
import { PropsUserForm } from '../types/type';

export const registerUser = async (rawUserForm: PropsUserForm) => {
  const res = await fetch(API_BASE_URL + "/register", {
    method: "POST",
    body: JSON.stringify(rawUserForm),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
