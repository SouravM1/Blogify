
import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (slug) => {
    navigate(slug);
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (slug) => {
    return location.pathname === slug;
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <Container>
        <nav className="flex items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group">
            <div className="relative p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
              <Logo width="32px" className="sm:w-[40px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="hidden sm:block text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blogify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.slug)}
                    className={`relative px-4 sm:px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isActiveRoute(item.slug)
                        ? 'text-blue-600 bg-blue-50 shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                    }`}
                  >
                    {item.name}
                    {isActiveRoute(item.slug) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-3">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Tablet Navigation (simplified) */}
          <ul className="hidden md:flex lg:hidden items-center space-x-2">
            {navItems.slice(0, 3).map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.slug)}
                    className={`relative px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
                      isActiveRoute(item.slug)
                        ? 'text-blue-600 bg-blue-50 shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger Icon */}
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-5 w-5 sm:h-6 sm:w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close Icon */}
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-5 w-5 sm:h-6 sm:w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu-container ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-3 pt-3 pb-4 space-y-2 bg-white rounded-2xl mt-3 border border-gray-100 shadow-2xl animate-in slide-in-from-top-2 duration-300">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.slug)}
                  className={`block w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActiveRoute(item.slug)
                      ? 'text-blue-600 bg-blue-50 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <div className="px-4 py-2">
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
