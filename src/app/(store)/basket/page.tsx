"use client";

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import useBasketStore from "../../../../store/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/imageUrl"; // Ensure this is the correct path

import { createCheckoutSession, Metadata, GroupedBasketItem } from "../../../../action/createCheckoutSession";
import AddButton from "@/components/addd";
import { Trash2 } from "lucide-react";
import Link from "next/link";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Ensuring the component runs on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server side
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your Cart is empty.</p>
      </div>
    );
  }
  console.log("BASKET CONTAINS", groupedItems);

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
       
      };

      // Transform BasketItem[] to GroupedBasketItem[] 
      const transformedItems: GroupedBasketItem[] = groupedItems.map((item) => ({
        Product: item.product, // Assuming 'product' exists in BasketItem
        quantity: item.quantity,
      }));

      const checkoutUrl = await createCheckoutSession(transformedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="container mx-auto p-4 max-w-6xl">
          <div className="flex items-center px-[6rem] space-x-2 text-lg py-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="text-gray-500">/</span>
        <Link href="/blog" className="hover:underline">Cart</Link>
        </div>
      <h1 className="text-2xl font-bold mb-4">Your cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div
              key={item.product._id}
              className="relative mb-4 p-4 border rounded flex items-center justify-between"
            >
              {/* Remove Button */}
              <button
                onClick={() => useBasketStore.getState().removeItem(item.product._id)}
                className="absolute top-2 mb-12 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition duration-200"
                aria-label="Remove item"
              >
                <Trash2 fill="red" />
              </button>

              {/* Product Info */}
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() => router.push(`/product/${item.product._id}`)}
              >
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={urlFor(item.product.image).url()} // Corrected usage
                      alt={item.product.name ?? "Product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                {/* Product Details */}
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: £
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Add to Basket Button */}
              <div className="flex items-center mt-9 flex-wrap">
                <AddButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            {/* Items Count */}
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>

            {/* Total Price */}
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>
                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>

        {/* Spacer for Fixed Checkout on Mobile */}
        <div className="h-64 lg:h-0"></div>
      </div>
    </div>
  );
}

export default BasketPage;
