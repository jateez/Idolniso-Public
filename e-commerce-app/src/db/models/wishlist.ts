import { COLLECTION_PRODUCT, COLLECTION_USER, COLLECTION_WISHLIST } from "@/lib/constants";
import { getDBInstance } from "../config";
import { ObjectId } from "mongodb";

export const getWishlists = async (userId: string) => {
  const instanceDb = await getDBInstance();
  const foundUser = await instanceDb.collection(COLLECTION_USER).findOne({ _id: new ObjectId(userId) });
  if (!foundUser) {
    throw new Error("Error, user not found", { cause: "DATA_NOT_FOUND" });
  }
  const wishlists = await instanceDb
    .collection(COLLECTION_WISHLIST)
    .aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: "products",
          let: { productId: { $toObjectId: "$productId" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$productId"] } } }],
          as: "productData",
        },
      },
      { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },
    ])
    .toArray();
  return wishlists;
};

export const addWishlist = async (userId: string, productId: string) => {
  const instanceDb = await getDBInstance();
  const foundUser = await instanceDb.collection(COLLECTION_USER).findOne({ _id: new ObjectId(userId) });
  if (!foundUser) {
    throw new Error("Error, user not found", { cause: "DATA_NOT_FOUND" });
  }
  const foundProduct = await instanceDb.collection(COLLECTION_PRODUCT).findOne({ _id: new ObjectId(productId) });
  if (!foundProduct) {
    throw new Error("Error, product not found", { cause: "DATA_NOT_FOUND" });
  }

  const foundWishlist = await instanceDb.collection(COLLECTION_WISHLIST).findOne({ productId: productId, userId: userId });
  if (foundWishlist) {
    throw new Error("Error, product already wishlisted", { cause: "ALREADY_WISHLISTED" });
  }

  const newWishlist = { userId, productId, createdAt: new Date(), updatedAt: new Date() };
  await instanceDb.collection(COLLECTION_WISHLIST).insertOne(newWishlist);
  return newWishlist;
};

export const removeWishlist = async (userId: string, productId: string) => {
  const instanceDb = await getDBInstance();
  const foundUser = await instanceDb.collection(COLLECTION_USER).findOne({ _id: new ObjectId(userId) });
  if (!foundUser) {
    throw new Error("Error, user not found", { cause: "DATA_NOT_FOUND" });
  }
  const foundProduct = await instanceDb.collection(COLLECTION_PRODUCT).findOne({ _id: new ObjectId(productId) });
  if (!foundProduct) {
    throw new Error("Error, product not found", { cause: "DATA_NOT_FOUND" });
  }
  const foundWishlist = await instanceDb.collection(COLLECTION_WISHLIST).findOne({ productId: productId, userId: userId });

  if (!foundWishlist) {
    throw new Error("Error, product not found", { cause: "DATA_NOT_FOUND" });
  }

  const deleted = await instanceDb.collection(COLLECTION_WISHLIST).deleteOne({ userId, productId });
  return deleted;
};
