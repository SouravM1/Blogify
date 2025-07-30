
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  const imageUrl = featuredimage
    ? appwriteService.getFilePreview(featuredimage)
    : null;

  return (
    <Link
      to={`/post/${$id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
    >
      <div className="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-1">
        {/* Image section - Enhanced responsive heights */}
        <div className="w-full h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center p-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-500 text-xs sm:text-sm">No image</span>
              </div>
            </div>
          )}
          {/* Enhanced overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Content section - Enhanced responsive padding and text */}
        <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 leading-tight line-clamp-2 flex-1 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
          
          {/* Read More indicator - Enhanced responsive */}
          <div className="mt-4 sm:mt-5 flex items-center text-blue-600 text-xs sm:text-sm font-semibold group-hover:text-blue-700 transition-colors duration-300">
            <span>Read more</span>
            <svg 
              className="ml-2 w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
