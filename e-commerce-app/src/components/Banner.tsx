export default function Banner({ imageUrl, title, description }: { imageUrl: string; title: string; description: string }) {
  return (
    <>
      <div
        className="flex flex-col min-h-[calc(100vh-64px)] items-center justify-around p-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: ` 
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
            url(${imageUrl})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-white text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
            <p className="mb-5">{description}</p>
            <button className="btn bg-primary-main border-primary-dark hover:bg-primary-light hover:border-primary-main text-white">Shop Exclusive Bundle</button>
          </div>
        </div>
      </div>
    </>
  );
}
