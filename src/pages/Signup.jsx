
import React from "react";
import { Signup as SignupComponent } from "../components";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
