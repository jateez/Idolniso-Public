import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
}
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Wishlist {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export type Users = User[];

export type Products = Product[];

export type Wishlists = Wishlist[];

export type UserRegister = Omit<User, "_id">;
export type UserLogin = Omit<User, "_id" | "name" | "username">;

export interface PropsUserForm {
  name: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export type AuthPayload = Omit<User, "name" | "email" | "password">;
