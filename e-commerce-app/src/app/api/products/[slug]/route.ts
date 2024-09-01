import { getProductBySlug } from "@/db/models/products";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const product = await getProductBySlug(slug);

    return Response.json({ message: "successfully retrieved product", product }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      if ((err.cause = "DATA_NOT_FOUND")) {
        return Response.json({ message: err.message, statusCode: 404 }, { status: 404 });
      }
    }
  }
}
