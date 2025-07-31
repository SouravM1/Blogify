
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { renderContent } from "../utils/contentRenderer";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          if (post.featuredimage) {
            appwriteService.deleteFile(post.featuredimage);
          }
          navigate("/");
        }
      });
    }
  };

  return post ? (
    <div className="py-6 sm:py-8 lg:py-12 xl:py-16 bg-white">
      <Container>
        {/* Featured Image Section */}
        <div className="w-full flex justify-center mb-6 sm:mb-8 relative border rounded-xl p-4 sm:p-6 bg-white shadow-sm">
          {post.featuredimage ? (
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-xl max-h-[300px] sm:max-h-[400px] object-contain w-full"
            />
          ) : (
            <div className="w-full h-48 sm:h-64 bg-gray-100 flex items-center justify-center rounded-xl">
              <span className="text-gray-500 text-base sm:text-lg">No image available</span>
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-4 sm:right-6 top-4 sm:top-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="px-3 sm:px-4 py-2 text-sm sm:text-base"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="w-full mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="prose max-w-none prose-sm sm:prose-base lg:prose-lg prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-purple-600">
          {renderContent(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
