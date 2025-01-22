import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-[#f0f0f0] w-full">
      <div className="container px-5 py-24 mx-auto flex flex-wrap md:items-center lg:items-start md:flex-row md:flex-nowrap flex-col">
        <div className="w-64 flex-shrink-0 mx-auto md:mx-0 text-center md:text-left">
          <a className="flex title-font font-medium items-center justify-center md:justify-start text-gray-900">
            <span className="ml-10 text-3xl font-bold text-black">SHOP.CO</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            We have clothes that suit your style and which you&apos;re proud to wear. From women to men
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Company Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">COMPANY</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Features</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Works</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Career</a></li>
            </nav>
          </div>
          {/* Help Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">HELP</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-gray-800">Customer Support</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Delivery Details</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Terms & Conditions</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
            </nav>
          </div>
          {/* FAQ Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">FAQ</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-gray-800">Account</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Manage Deliveries</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Orders</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Payments</a></li>
            </nav>
          </div>
          {/* Resources Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">RESOURCES</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-gray-800">Free eBooks</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Development Tutorial</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">How to - Blog</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Youtube Playlist</a></li>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            Shop.co © 2000-2023 All Rights Reserved
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500" aria-label="Facebook">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500" aria-label="Twitter">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
