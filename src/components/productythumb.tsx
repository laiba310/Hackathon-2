import Link from "next/link";
import { Product } from "../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/imageUrl";

// Define the Child type for the description block
interface Child {
  text: string;
}

function ProductThumb({ product }: { product: Product }) {
  const imageUrl = product.image ? urlFor(product.image).width(500).url() : "/default-image.jpg";

  // Function to handle description safely
  const renderDescription = () => {
    if (Array.isArray(product.description)) {
      // If description is an array, process it
      return product.description
        .map((block) =>
          block._type === "block"
            ? block.children?.map((child: Child) => child.text).join("")
            : ""
        )
        .join(" ");
    } else if (typeof product.description === "string") {
      // If description is a string, return it directly
      return product.description;
    } else {
      // Fallback if description is not in the expected format
      return "No description available";
    }
  };

  return (
    <Link
      href={`/product/${product._id}`}
      className="group flex flex-col shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      {/* Card Wrapper */}
      <div className="flex flex-col p-4">
        {/* Image Container */}
        <div className="relative w-full h-64 flex items-center justify-center rounded-md overflow-hidden">
          <Image
            className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
            src={imageUrl}
            alt={product.name || "Product Image"}
            layout="fill" // Fills the container
          />
        </div>

        {/* Product Name */}
        <h1 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-gray-600 line-clamp-1">
          {product.name}
        </h1>

        {/* Product Description */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-1">{renderDescription()}</p>

        {/* Product Price */}
        <p className="mt-2 text-lg font-bold text-gray-900">
          ${product.price?.toFixed(2) || "0.00"}
        </p>
      </div>
    </Link>
  );
}

export default ProductThumb;
