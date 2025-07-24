
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 mt-12">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap -m-6">
          <div className="w-full p-6 md:w-1/2 lg:w-4/12">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-6 flex items-center space-x-2">
                <Logo width="100px" />
                <span className="text-xl font-bold text-white tracking-wide">
                  Blogify
                </span>
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Blogify. All rights reserved.
              </p>
            </div>
          </div>

          <div className="w-1/2 p-6 sm:w-1/2 md:w-1/4 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white">Features</Link></li>
              <li><Link to="/" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/" className="hover:text-white">Affiliate Program</Link></li>
              <li><Link to="/" className="hover:text-white">Press Kit</Link></li>
            </ul>
          </div>

          <div className="w-1/2 p-6 sm:w-1/2 md:w-1/4 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white">Account</Link></li>
              <li><Link to="/" className="hover:text-white">Help</Link></li>
              <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-white">Customer Support</Link></li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Legals
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white">Terms &amp; Conditions</Link></li>
              <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white">Licensing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          Made with ❤️ by SOURAV
        </div>
      </div>
    </footer>
  );
}

export default Footer;
