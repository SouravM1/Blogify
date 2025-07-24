
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
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
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        {/* Featured Image Section */}
        <div className="w-full flex justify-center mb-6 relative border rounded-xl p-4 bg-white shadow">
          {post.featuredimage ? (
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-xl max-h-[400px] object-contain"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
              <span className="text-gray-500 text-lg">No image available</span>
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="px-4 py-2">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="px-4 py-2"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        </div>

        <div className="prose max-w-none prose-lg">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
