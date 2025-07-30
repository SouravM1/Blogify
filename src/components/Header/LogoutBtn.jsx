
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // First, try to logout from Appwrite
      await authService.logout();
    } catch (error) {
      console.log("Logout error:", error);
      // Continue with local logout even if Appwrite logout fails
    } finally {
      // Always clear local state and redirect
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg shadow-sm hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
    >
      <svg 
        className="w-4 h-4 mr-1 sm:mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="hidden sm:inline">Logout</span>
      <span className="sm:hidden">Out</span>
    </button>
  );
}

export default LogoutBtn;
