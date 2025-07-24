
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full shadow hover:bg-red-600 hover:shadow-lg transition-all duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
