import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { loginUser, registerUser } from "../API/api";
import floodbg from "./floodbg.jpeg";

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
   <div
  className="flex flex-col min-h-screen"
  style={{
     backgroundImage: `url(${floodbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* ------------------ NAVBAR ------------------ */}
  <nav
    className="flex justify-between items-center px-8 py-4 shadow-md"
    style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
  >
    <h1
      className="text-2xl font-bold text-white cursor-pointer tracking-wide"
      onClick={() => navigate("/")}
    >
      Floodify
    </h1>
    
  </nav>

  {/* ------------------ LOGIN / REGISTER CARD ------------------ */}
  <div className="flex justify-center items-center flex-grow p-4">
    <div className="w-full max-w-md bg-white/90 p-8 rounded-xl shadow-xl backdrop-blur-sm">
      {!showRegister ? (
        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-6">
          <h2
            className="text-2xl font-bold text-center text-white p-2 rounded-lg mb-4"
            style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
          >
            Login Panel
          </h2>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              {...loginRegister("username", { required: "Username is required" })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {loginErrors.username && (
              <p className="text-red-500 text-sm mt-1">{loginErrors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...loginRegister("password", { required: "Password is required" })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {loginErrors.password && (
              <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-medium transition-colors"
            style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setShowRegister(true)}
            >
              Register
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegSubmit(onRegister)} className="space-y-6">
          <h2
            className="text-2xl font-bold text-center text-white p-2 rounded-lg mb-4"
            style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
          >
            Register
          </h2>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              {...regRegister("name", { required: "Name is required" })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {regErrors.name && (
              <p className="text-red-500 text-sm mt-1">{regErrors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...regRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {regErrors.email && (
              <p className="text-red-500 text-sm mt-1">{regErrors.email.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              {...regRegister("username", { required: "Username is required" })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {regErrors.username && (
              <p className="text-red-500 text-sm mt-1">{regErrors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...regRegister("password", { required: "Password is required" })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {regErrors.password && (
              <p className="text-red-500 text-sm mt-1">{regErrors.password.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium">Phone No</label>
            <input
              type="tel"
              {...regRegister("phoneNo", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {regErrors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">{regErrors.phoneNo.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-medium transition-colors"
            style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
          >
            Register
          </button>

          <p className="text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setShowRegister(false)}
            >
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  </div>

  {/* ------------------ FOOTER ------------------ */}
  <footer
    className="text-white text-center py-4"
    style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
  >
    &copy; {new Date().getFullYear()} Floodify. All rights reserved.
  </footer>
</div>

  );
}

export default Login;
