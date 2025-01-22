import Image from "next/image";
import { urlFor } from "@/sanity/lib/imageUrl";
import { Product } from "../../sanity.types"; // Assuming you have a Product type
import Link from "next/link";

interface NewSalePageProps {
  products: Product[]; // Define the products prop
  title?: string; // Optional prop for heading
}

function ProductThumbb({ product }: { product: Product }) {
  const imageUrl = product.image
    ? urlFor(product.image).width(500).url()
    : "/default-image.jpg";

  return (
    <Link href={`/product/${product._id}`}>
      <div className="product-card">
        <div className="relative w-full h-64 flex items-center justify-center rounded-md overflow-hidden">
          <Image
            className="object-cover object-center transition-transform duration-300 group-hover:scale-110 cursor-pointer"
            src={imageUrl}
            alt={product.name || "Product Image"}
            layout="fill"
          />
        </div>

        <h1 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-gray-600 line-clamp-1">
          {product.name}
        </h1>

        <p className="mt-2 text-sm text-gray-600 line-clamp-1">{product.description}</p>

        <p className="mt-2 text-lg font-bold text-gray-900">
          ${product.price?.toFixed(2) || "0.00"}
        </p>
      </div>
    </Link>
  );
}

const NewSalePage = ({ products, title = "New Sale" }: NewSalePageProps) => {
  return (
    <>
      <div className="container mx-auto xl:px-[9rem] ">
        <div>
          {/* Dynamic Title */}
          <h1 className="text-[48px] font-extrabold text-center mb-6 mt-8">{title}</h1>

          {/* Wrapper div with overflow-x-hidden */}
          <div className="overflow-x-hidden">
            {/* Horizontal scrolling area with hidden scrollbar */}
            <div className="flex space-x-6 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6 mb-10">
              {products.length === 0 ? (
                <p>No products available</p>
              ) : (
                products.map((product) => (
                  <div key={product._id} className="flex-none w-[300px] sm:w-[350px] md:w-auto group">
                    <ProductThumbb product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/blog">
            <button className="w-[270px] h-[52px] bg-white text-black py-3 border border-gray-500 rounded-[100px] transition-transform duration-500 ease-in-out hover:scale-110">
              View All
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewSalePage;
