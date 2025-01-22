

import { shorts } from "@/sanity/lib/shorts";
import { Product } from "../../../../sanity.types";
import ProductThumb from "@/components/productythumb";
import Link from "next/link";

export default async function Shorts() {
  const products: Product[] = await shorts();

  return (

    <div className="min-h-screen md:p-8 ">
          <div className="flex items-center px-[6rem] space-x-2 text-lg py-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="text-gray-500">/</span>
        <Link href="/blog" className="hover:underline">Casual</Link>
        
        <span className="text-gray-500">/</span>
        <span className="font-bold text-black">Short</span>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Short Collection</h1>
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
