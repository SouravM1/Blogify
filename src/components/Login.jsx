import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-100">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl">
            <span className="inline-block w-full max-w-[80px] sm:max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-gray-800 mb-2">
          Welcome back
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm sm:text-base text-center">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          
          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <Button type="submit" className="w-full text-sm sm:text-base py-3 sm:py-4">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
