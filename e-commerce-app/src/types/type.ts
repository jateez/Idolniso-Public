export interface User {
  _id: string;
  name: string;
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
