import { COLLECTION_PRODUCT } from "@/lib/constants";
import { getDBInstance } from "../config";

export const getProducts = async (search?: string, sort?: string, page?: string) => {
  const pageNumber = parseInt(page || "1");
  const pageSize = 8;
  const skip = (pageNumber - 1) * pageSize;
  let pipeline = [];

  pipeline.push({ $sort: { createdAt: sort === "oldest" ? 1 : -1, name: 1 } });

  if (search) {
    pipeline.push({
      $match: { name: { $regex: new RegExp(search, "i") } },
    });
  }

  const countPipeline = [...pipeline, { $count: "total" }];
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: pageSize });

  const instanceDb = await getDBInstance();
  const [products, countResult] = await Promise.all([instanceDb.collection(COLLECTION_PRODUCT).aggregate(pipeline).toArray(), instanceDb.collection(COLLECTION_PRODUCT).aggregate(countPipeline).toArray()]);
  const total = countResult[0]?.total || 0;

  return {
    products,
    currentPage: pageNumber,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

export const getProductBySlug = async (slug: string | undefined) => {
  const instanceDb = await getDBInstance();
  const product = await instanceDb.collection(COLLECTION_PRODUCT).findOne({ slug });
  if (!product) {
    throw new Error("Error product data is not found", { cause: "DATA_NOT_FOUND" });
  }
  return product;
};
