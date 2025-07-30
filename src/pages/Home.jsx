
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  // Pre-signin section (no posts or user not logged in)
  if (!authStatus || posts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <Container>
            <div className="relative z-10 text-center max-w-6xl mx-auto">
              {/* Main Hero Content */}
              <div className="mb-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-6 px-4">
                  Blogify
                </h1>
                <p className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-8 max-w-3xl mx-auto">
                  Where Stories Come to Life
                </p>
                <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of writers and readers in a community that celebrates creativity, 
                  connection, and the power of storytelling.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <Link
                    to="/login"
                    className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg sm:text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    to="/signup"
                    className="group px-8 sm:px-12 py-4 sm:py-5 bg-white text-blue-600 border-2 border-blue-600 text-lg sm:text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center">
                      Sign Up Free
                      <svg className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-gray-500 text-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free Forever
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Beginner Friendly
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant Setup
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-24 lg:py-32 bg-gray-50">
          <Container>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful tools designed for modern content creators who want to build their audience and share their stories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Write & Publish</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create beautiful blog posts with our intuitive editor. Rich formatting, media support, and instant publishing.
                </p>
              </div>

              <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect & Engage</h3>
                <p className="text-gray-600 leading-relaxed">
                  Build meaningful connections with readers and fellow writers. Comment, like, and share stories that inspire.
                </p>
              </div>

              <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Grow Your Audience</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reach more readers with SEO optimization, social sharing, and analytics to track your growth.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of writers who are already sharing their stories and building their audience.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                Start Writing Today
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  // Post-signin section (user logged in and posts exist)
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome back, {userData?.name || 'Writer'}! 👋
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ready to create something amazing? Explore the latest stories or start writing your own.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/add-post"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                ✍️ Write New Post
              </Link>
              <Link
                to="/all-posts"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-300"
              >
                📚 Browse Posts
              </Link>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Latest Stories
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map((post) => (
                  <PostCard key={post.$id} {...post} />
                ))}
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No posts yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Be the first to share your story with the community!
                </p>
                <Link
                  to="/add-post"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Create Your First Post
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
