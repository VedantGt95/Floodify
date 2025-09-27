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
     
     <nav
  className="text-white p-3 flex justify-between items-center shadow-md"
  style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
>
  <h1 className="text-xl font-semibold">Admin Panel</h1>
  <div>
    <span className="mr-4">Hello, {adminName}</span>
    <button
      onClick={() => handleLogout()}
      className="px-3 py-1 rounded font-medium transition-colors"
      style={{
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        color: "#fff",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
      onMouseLeave={e => e.currentTarget.style.opacity = 1}
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
