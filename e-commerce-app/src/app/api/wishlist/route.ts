import { addWishlist, getWishlists, removeWishlist } from "@/db/models/wishlist";
import { z } from "zod";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    throw new Error("You are not authorized", { cause: "UNAUTHORIZED" });
  }

  const wishlists = await getWishlists(userId);
  return Response.json({ message: "successfully retrieved wishlists", wishlists: wishlists }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new Error("You are not authorized", { cause: "UNAUTHORIZED" });
    }
    const data = await req.json();
    data.userId = userId;
    const parsedData = z
      .object({
        userId: z.string(),
        productId: z.string(),
      })
      .safeParse(data);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    const newWishlist = await addWishlist(userId, data.productId);
    return Response.json({ message: "successfully added product to wishlists", data: newWishlist }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    const data = await req.json();
    if (!userId) {
      throw new Error("You are not authorized", { cause: "UNAUTHORIZED" });
    }
    data.userId = userId;
    const parsedData = z
      .object({
        userId: z.string(),
        productId: z.string(),
      })
      .safeParse(data);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    await removeWishlist(userId, data.productId);
    return Response.json({ message: "successfully remove item from wishlists" }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
