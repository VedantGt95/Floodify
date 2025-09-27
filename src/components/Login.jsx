import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { loginUser, registerUser } from "../API/api";

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate(); 

  // ---- LOGIN FORM ----
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors }, reset: resetLogin } = useForm();

  const onLogin = async (data) => {
    try {
      const res = await loginUser(data);
      resetLogin();
      if (res.data) {
        alert(`Welcome ${res.data.username}!`);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/map");
      } else {
        alert("User not found. Please register.");
        setShowRegister(true);
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
      setShowRegister(true);
    }
  };

  // ---- REGISTRATION FORM ----
  const { register: regRegister, handleSubmit: handleRegSubmit, formState: { errors: regErrors }, reset: resetReg } = useForm();

  const onRegister = async (data) => {
    try {
      const res = await registerUser(data);
      resetReg();
      if (res.data) {
        alert("User registered successfully! Please login.");
        setShowRegister(false);
        navigate("/login"); 
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {!showRegister ? (
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                {...loginRegister("username", { required: "Username is required" })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {loginErrors.username && <p className="text-red-500 text-sm mt-1">{loginErrors.username.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...loginRegister("password", { required: "Password is required" })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {loginErrors.password && <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
            <p className="text-center text-gray-600 mt-2">
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => setShowRegister(true)}>
                Register
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegSubmit(onRegister)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                {...regRegister("username", { required: "Username is required" })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {regErrors.username && <p className="text-red-500 text-sm mt-1">{regErrors.username.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...regRegister("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
                })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {regErrors.email && <p className="text-red-500 text-sm mt-1">{regErrors.email.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...regRegister("password", { required: "Password is required" })}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {regErrors.password && <p className="text-red-500 text-sm mt-1">{regErrors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Register
            </button>
            <p className="text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => setShowRegister(false)}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
