import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../API/api";
import floodbg from "./floodbg.jpeg";


function AdminLogin() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();


const onLogin = async (data) => {
  try {
    
    const response = await loginAdmin({
      username: data.username,
      password: data.password,
    });

    if (response.status === 200) {
      
      sessionStorage.setItem("isAdmin", "true");
      sessionStorage.setItem("adminUser", JSON.stringify(response.data));

      alert(`Welcome Admin!`);
      reset();
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials. Try again.");
    }
  } catch (error) {
    console.error("Admin login error:", error);
    alert("Login failed. Please check your credentials.");
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

  {/* ------------------ ADMIN LOGIN CARD ------------------ */}
  <div className="flex justify-center items-center flex-grow p-4">
    <div className="w-full max-w-md bg-white/90 p-8 rounded-xl shadow-xl backdrop-blur-sm">
      <h2
        className="text-2xl font-bold text-center text-white p-2 rounded-lg mb-6"
        style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
      >
        Admin Login
      </h2>

      <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg text-white font-medium transition-colors"
          style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
        >
          Login
        </button>
      </form>
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

export default AdminLogin;
