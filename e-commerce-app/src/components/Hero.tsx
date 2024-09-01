import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="min-h-[calc(100vh-128px)] bg-blue-200 hero">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-6">Why Choose Idolniso?</h1>
            <p className="py-6 text-lg">Idolniso is your one-stop shop for all things K-pop. From exclusive merchandise to limited edition albums, we bring you closer to your favorite idols.</p>
            <Link href={"/login"} className="btn border-0 bg-primary-main border-primary-light hover:bg-primary-dark btn-lg">
              Join the Fandom
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
