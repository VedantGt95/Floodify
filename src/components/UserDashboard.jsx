import React from 'react';
import MapComponent from './MapComponent';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login");               
  };

  return (
    <div className="flex flex-col h-screen">
   
     <nav
  className="text-white p-3 flex justify-between items-center shadow-md"
  style={{ background: "linear-gradient(135deg, #000080 0%, #00004d 100%)" }}
>
  <h1 className="text-xl font-semibold">User Dashboard</h1>
  <div>
    <span className="mr-4">Hello, {user.username || "User"}</span>
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
        <div className="w-full h-full flex-1">
          <MapComponent  
            role={user.role || "USER"} 
            userId={user.id} 
            username={user.username} 
          />
        </div>
      </main>

    
      <footer className="bg-gray-200 text-gray-700 p-4 text-center">
       {new Date().getFullYear()} JalRakshak Dashboard. All CopyRights reserved.
      </footer>
    </div>
  );
}

export default UserDashboard;
