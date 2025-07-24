
import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-gradient-to-r from-purple-500 to-pink-500",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center 
        px-5 py-2.5 rounded-full font-medium text-sm tracking-wide
        ${bgColor} ${textColor}
        shadow-md hover:shadow-lg 
        hover:scale-105 active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
