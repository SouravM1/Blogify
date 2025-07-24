
import React from "react";
import { Login as LoginComponent } from "../components";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
