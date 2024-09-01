import FeaturedProduct from "@/components/FeaturedProduct";
import Banner from "../components/Banner";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="bg-base-100 relative">
      <Banner
        imageUrl="https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uPJkEyROTtwb260UjI0XPgLBWR-_vWhs1IjDRGH_Gj58SefPWZ8Dz3DzVECNZzMWGTRf4ye68V6af4pr3gkQ7Am0MvXc0DKdp5pnpQQmqaZtA0_y8zOAcuGTTao4oBi0dSl85B139FX_imCzfipcomW6VVu8_Tx5vbsK8uEcTZq9jw9T4o=w919-h516-p-k-no-nu"
        title={`Experience "Supernatural" Now!`}
        description="Be among the first to own NewJeans electrifying new album. Limited stock available!"
      />
      <FeaturedProduct />
      <Hero />
    </main>
  );
}
