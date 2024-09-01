import { getProducts } from "@/db/models/products";
import { type NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") as string | undefined;
    const sort = searchParams.get("sort") as string | undefined;
    const page = searchParams.get("page") as string | undefined;

    const result = await getProducts(search, sort, page);
    return Response.json({ message: "successfully retrieved products", ...result, statusCode: 200 }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ message: err.message, cause: err.cause }, { status: 404 });
    }
    return Response.json({ message: "Internal Server Error", statusCode: 500 }, { status: 500 });
  }
}
