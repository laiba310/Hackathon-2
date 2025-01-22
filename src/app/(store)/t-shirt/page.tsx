
import { ShirtProducts } from "@/sanity/lib/tshirt";
import { Product } from "../../../../sanity.types";
import ProductThumb from "@/components/productythumb";
import Link from "next/link";

export default async function TShirt() {
  const products: Product[] = await ShirtProducts();

  return (
    <div className="min-h-screen md:p-8">
        <div className="flex items-center px-[6rem] space-x-2 text-lg py-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="text-gray-500">/</span>
        <Link href="/blog" className="hover:underline">Casual</Link>
        
        <span className="text-gray-500">/</span>
        <span className="font-bold text-black">-shrt</span>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">T-Shirt Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div key={product._id} className="">
            <ProductThumb product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
