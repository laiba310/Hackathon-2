"use client";
import { useEffect } from "react";

import useBasketStore from "../../../../store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket(); // Clear basket after the order is placed
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">
          Thank You for Your Order!
        </h1>
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg text-gray-700 mb-4">
            Your order has been confirmed and will be shipped shortly.
          </p>
          {orderNumber && (
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center space-x-2">
                <span>Order Number:</span>
                <span className="font-mono text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
    {/* Continue Shopping Button */}
    <button className="bg-green-600 hover:bg-green-700 text-white font-medium w-full sm:w-auto p-3 rounded shadow-md transition-transform transform hover:scale-105">
      <Link href="/">Continue Shopping</Link>
    </button>

    {/* View Order Details Button */}
    <button className="bg-white border border-gray-400 text-gray-800 font-medium w-full sm:w-auto p-3 rounded shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105">
      <Link href="/order">View Order Details</Link>
    </button>
  </div>
</div>

         
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
