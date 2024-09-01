import WishlistButton from "@/components/ui/WishlistButton";
import { API_BASE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { toast } from "react-toastify";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const res = await fetch(API_BASE_URL + "/products/" + slug);
  const result = await res.json();
  if (!res.ok) {
    console.log(result.message);
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
  const data = result.product;
  return {
    title: data.name,
    icons: data.thumbnail,
    description: data.description,
    openGraph: {
      images: data.images,
    },
  };
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const res = await fetch(API_BASE_URL + "/products/" + slug);
  const result = await res.json();
  if (!res.ok) {
    toast.error(`${result.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const data = result.product;

  return (
    <main className="bg-base-100 min-h-[calc(100vh-128px)]">
      <div className="flex justify-center items-center h-full w-full p-8">
        <div className="flex justify-between shadow-xl w-full max-w-4xl rounded-lg overflow-hidden">
          <div className="w-1/2 h-full">
            <div className="carousel w-full h-[450px] rounded-none">
              {data.images.map((image: string, i: number) => (
                <div key={i} id={`slide${i + 1}`} className="carousel-item relative w-full h-full">
                  <img src={image} alt={`${data.name} image ${i + 1}`} className="w-full h-full object-cover" />
                  {data.images.length > 1 && (
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <a href={`#slide${i === 0 ? data.images.length : i}`} className="btn btn-circle">
                        ❮
                      </a>
                      <a href={`#slide${i === data.images.length - 1 ? 1 : i + 2}`} className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border-l-2 border-neutral-lightGray w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-2 text-neutral-darkGray">{data.name}</h1>
            <h2 className="text-xl text-primary-main mb-4">IDR {data.price}</h2>
            <p className="text-base text-neutral-darkGray mb-4">{data.description}</p>
            <h3 className="text-sm text-neutral-darkGray mb-2">Posted {new Date(data.createdAt).getHours()} hours ago</h3>
            <div className="flex gap-2 mb-4">
              {data.tags.map((tag: string) => (
                <span className="badge badge-primary">{tag}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="btn bg-primary-main">Buy Now</button>
              <WishlistButton productId={data._id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
