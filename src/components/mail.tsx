import Image from "next/image";
import React from "react";

const   Mail = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 w-[90%] py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black rounded-[20px]">
    <p className="font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0">
      STAY UP TO DATE ABOUT OUR LATEST OFFERS
    </p>
    <div className="flex justify-center items-center">
      <div className="flex flex-col max-w-[349px] w-full mx-auto">
        <div className="flex bg-white mb-[14px] rounded-full overflow-hidden">
          <div className="flex items-center px-4 py-3">
            <Image
              priority
              src="/Frame (10).png"
              height={20}
              width={20}
              alt="email"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="bg-transparent placeholder:text-black/40 text-sm sm:text-base w-[80%] px-4 focus:outline-none"
          />
        </div>
        <button
          className="text-sm sm:text-base font-medium bg-white h-12 rounded-full w-full px-4 py-3"
          aria-label="Subscribe to Newsletter"
          type="button"
        >
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  </div>
);
};

export default Mail;
