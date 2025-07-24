
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);


  if (posts.length === 0) {
    return (
      <div className="w-full py-20 mt-4 text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-inner">
        <Container>
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800 hover:text-gray-600 transition-colors">
              🚀 Login to explore amazing blogs!
            </h1>
            <p className="text-gray-500 text-lg max-w-md">
              Join the community and start sharing your own thoughts today.
            </p>
            <a
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
            >
              Login Now
            </a>
          </div>
        </Container>
      </div>
    );
  }


  return (
    <div className="w-full py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-8 mb-8 shadow-lg">
          <h1 className="text-4xl font-extrabold">Welcome Back!</h1>
          <p className="text-lg mt-2">
            Explore the latest blogs and share your ideas 💡
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">✨ Latest Posts</h1>

        {/* 📌 Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
