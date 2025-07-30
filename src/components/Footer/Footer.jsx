
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 mt-auto border-t border-slate-600/50 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm">
                <Logo width="28px" className="sm:w-[32px]" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                Blogify
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400/80 leading-relaxed max-w-xs">
              Share your thoughts, connect with others, and discover amazing stories from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-slate-600/30 pb-1">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-1 sm:gap-2">
              <Link to="/" className="text-xs sm:text-sm text-slate-400 hover:text-blue-300 transition-all duration-200 hover:translate-x-1">
                Home
              </Link>
              <Link to="/" className="text-xs sm:text-sm text-slate-400 hover:text-blue-300 transition-all duration-200 hover:translate-x-1">
                About
              </Link>
              <Link to="/" className="text-xs sm:text-sm text-slate-400 hover:text-blue-300 transition-all duration-200 hover:translate-x-1">
                Contact
              </Link>
              <Link to="/" className="text-xs sm:text-sm text-slate-400 hover:text-blue-300 transition-all duration-200 hover:translate-x-1">
                Privacy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-slate-600/30 pb-1">
              Connect
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-400/80">
              <p className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>hello@blogify.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                <span>Follow us on social media</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-slate-600/50 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <p className="text-xs sm:text-sm text-slate-500/80">
            &copy; {new Date().getFullYear()} Blogify. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-slate-500/80">
            Made with{" "}
            <span className="text-red-400 animate-pulse">❤️</span> by{" "}
            <span className="text-blue-400 font-medium hover:text-blue-300 transition-colors duration-200">SOURAV</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
