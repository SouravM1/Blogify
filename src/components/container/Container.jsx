
import React from "react";

function Container({ children, className = "" }) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
