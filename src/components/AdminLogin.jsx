import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../API/api";

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

      alert(`Welcome Admin ${data.username}!`);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
