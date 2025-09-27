import React from 'react';
import MapComponent from './MapComponent';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const adminName = "Team Telusko";

  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login");               
  };

  return (
    <div className="flex flex-col min-h-screen">
     
      <nav className="bg-blue-400 text-white p-3 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <div>
          <span className="mr-4">Hello, {adminName}</span>
          <button
            onClick={() => {handleLogout()}}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      
      <main className="flex-1 w-full">
        <div className="w-full h-full">
          <MapComponent role="ADMIN" />
        </div>
      </main>

      
     
    </div>
  );
}

export default AdminDashboard;
