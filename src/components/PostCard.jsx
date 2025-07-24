
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  console.log("🖼️ PostCard props:", { $id, title, featuredimage });

  const imageUrl = featuredimage
    ? appwriteService.getFilePreview(featuredimage)
    : null;

  console.log("➡️ Image URL:", imageUrl);

  return (
    <Link
      to={`/post/${$id}`}
      className="focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl"
    >
      <div className="w-full bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
        {/* Image section */}
        <div className="w-full h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
            />
          ) : (
            <span className="text-gray-500 text-sm">No image available</span>
          )}
        </div>

        {/* Content section */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
