"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/imageUrl";
import { Product } from "../../../../../sanity.types";
import AddToBasketButton from "@/components/AddToBasketButton";
import ToggleLinks from "../../ProductDetails/page";

function ProductPageClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const colors = ["green", "blue", "black"];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const imageUrl = product.image ? urlFor(product.image).url() : "/default-image.jpg";
  
 
  return (
    <div className="rounded-lg p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {/* Product Image Section */}
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt={product.name ?? "Product image"}
            width={500}
            height={500}
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between md:mt-[4rem]">
          <div>
            <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-semibold text-black">${product.price}</span>
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="bg-red-400 text-white text-sm px-5 py-0 rounded-full">
                  {product.discountPercent}%
                </span>
              )}
            </div>
            <p className="text-black opacity-55 mt-4 border-black ">{product.description}</p>
            <div className="border-b-2 mt-3"></div>
            <div>
            <h3 className="text-gray-700 font-medium mt-2">Choose color</h3>
            <div className="flex gap-4 ">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                ></button>
              ))}
     </div>
            {selectedColor && (
              <p className="text-sm text-gray-600 ">
                Selected Color: {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
              </p>
            )}
          </div>
          <div className="border-b-2 mt-3"></div>
          <div className="">
              <h3 className="text-gray-700 font-medium mb-2">Choose Size</h3>
              <div className="flex flex-wrap gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected Size: {selectedSize}
                </p>
              )}
            </div>               <div className="border-b-2 mt-3"></div>    
            <div className="mt-6">
              <AddToBasketButton product={product} />
              
            </div>   
           
              </div>
        </div>
      </div>
      <ToggleLinks />
      </div>
  );
}

export default ProductPageClient;
