"use client";
import { useState } from "react";
import Link from "next/link";

import FaqItem from "@/app/(store)/faq/page"




// ProductSpecifications Component
function ProductSpecifications() {
  const specifications = [
    { label: "Material composition", value: "100% Cotton" },
    { label: "Care instructions", value: "Machine wash warm, tumble dry" },
    { label: "Fit type", value: "Classic Fit" },
    { label: "Pattern", value: "Solid" },
  ];

  return (
    <div className="mt-8 px-4 lg:px-16">
      <h2 className="text-2xl font-bold mb-6">Product Specifications</h2>
      <div className="grid grid-cols-1 gap-y-4 border-t">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b last:border-none"
          >
            <div>
              <span className="text-gray-500 font-medium">{spec.label}</span>
            </div>
            <div>
              <span className="text-black font-semibold">{spec.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ProductReview Component
// ProductReview Component
function ProductReview() {
  return ( // Return keyword added here
    <div>
      <div className="font-extrabold text-5xl text-center mt-[3rem]">
        <h1>OUR HAPPY CUSTOMERS</h1>
      </div>
      <div className="flex flex-wrap gap-4 mt-5 mb-8 justify-center items-center">
        <div className="w-[400px] h-[240px] border border-gray-300 rounded-[30px]">
          <div className="ml-4 mr-5">
            <img src="Frame 10 (1).png" alt="" className="mt-[3rem]" />
            <div className="flex">
              <h1>Sarah M.</h1>
              <img src="Frame (3).png" alt="" />
            </div>
            <p>
              &quot;I&apos;m blown away by the quality and style of the clothes I received from
              Shop.co. From casual wear to elegant dresses, every piece I&apos;ve bought has
              exceeded my expectations.&quot;
            </p>
          </div>
        </div>

        <div className="w-[400px] h-[240px] border border-gray-300 rounded-[30px]">
          <div className="ml-4 mr-5">
            <img src="Frame 10 (1).png" alt="" className="mt-[3rem]" />
            <div className="flex">
              <h1>Alex K.</h1>
              <img src="Frame (3).png" alt="" />
            </div>
            <p>
              &quot;Finding clothes that align with my personal style used to be a challenge until
              I discovered Shop.co. The range of options they offer is truly remarkable, catering to
              a variety of tastes.&quot;
            </p>
          </div>
        </div>

        <div className="w-[400px] h-[240px] border border-gray-300 rounded-[30px]">
          <div className="ml-4 mr-5">
            <img src="Frame 10 (1).png" alt="" className="mt-[3rem]" />
            <div className="flex">
              <h1>James L.</h1>
              <img src="Frame (3).png" alt="" />
            </div>
            <p>
              &quot;As someone who&apos;s always on the lookout for unique fashion pieces, I&apos;m
              thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse
              but also on-point with the.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// proFaq Component
function ProFaq() {
  const faq = [
    <FaqItem key="faqItem" />,
  ];

  return <div>{faq}</div>;
}

// ToggleLinks Component
export default function ToggleLinks() {
  const [activeLink, setActiveLink] = useState<number>(0); // Default to Product Details tab

  const handleToggle = (index: number) => {
    setActiveLink(activeLink === index ? -1 : index); // -1 to close the tab if clicked again
  };

  const tabs = [
    {
      title: "Product Details",
      content: <ProductSpecifications />, // Show product specs here
    },
    {
      title: "Rating & Reviews",
      content: <ProductReview />, // Add the ProductReview component here
    },
    {
      title: "FAQs",
      content: <ProFaq />, // Use the ProFaq component here
    },
  ];

  return (
    <div className="mt-[3rem] md:text-2xl lg:ml-[10rem] lg:mr-[11rem] md:ml-0 md:mr-0">
      <div className="flex justify-between border-b">
        {tabs.map((item, index) => (
          <div key={index} className="mb-4">
            <Link
              href="#"
              onClick={() => handleToggle(index)} // Toggle tab on click
              className={`text-black hover:text-blue-500 px-4 block ${
                activeLink === index ? "border-b-2 border-black" : ""
              }`}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 text-gray-600 text-base rounded">
        {/* Render content for active tab */}
        {activeLink !== -1 && tabs[activeLink].content} {/* Only render content if active tab is selected */}
      </div>
    </div>
  );
}
