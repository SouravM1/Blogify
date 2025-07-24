
import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div
      className="flex items-center justify-center group cursor-pointer select-none"
      style={{ width }}
    >
      {/* Gradient Circle Icon Only */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
        B
      </div>
    </div>
  );
}

export default Logo;
