
import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-gradient-to-r from-blue-600 to-purple-600",
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
        px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base tracking-wide
        ${bgColor} ${textColor}
        shadow-lg hover:shadow-xl
        hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        min-h-[44px] sm:min-h-[48px]
        relative overflow-hidden
        before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-10
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
