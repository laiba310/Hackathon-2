"use client";

import { useEffect, useState } from "react";
import { Product } from "../../sanity.types";
import useBasketStore from "../../store/store";

interface AddToBasketButtonProps {
  product: Product;
}

function AddButton({ product }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const [quantity, setQuantity] = useState(0); // Local quantity state
  const itemCount = getItemCount(product._id);

  useEffect(() => {
    setQuantity(itemCount); // Sync with global store quantity
  }, [itemCount]);

  const handleAddQuantity = () => {
    addItem(product); // Add item to basket store
    setQuantity((prev) => prev + 1); // Increment local quantity
  };

  const handleSubtractQuantity = () => {
    if (quantity > 0) {
      removeItem(product._id); // Remove item from basket store
      setQuantity((prev) => prev - 1); // Decrement local quantity
    }
  };


  return (
    <div className="flex flex-col  space-y-4">
      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 ">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 "> 
        <button
          onClick={handleSubtractQuantity}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
            quantity === 0
              ? "bg-gray-300 cursor-not-allowed"
              : " hover:bg-red-600"
          }`}
        >
          <span className="text-black text-lg font-bold">-</span>
        </button>

        <span className="text-lg font-semibold">{quantity}</span>

        <button
          onClick={handleAddQuantity}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
        >
          <span className="text-black text-lg font-bold">+</span>
        </button>
        </div>
        </div></div>
    );
}

export default AddButton;
