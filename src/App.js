import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import UserDashboard from "./components/UserDashboard";

const getUser = () => JSON.parse(localStorage.getItem("user"));


const PrivateRoute = ({ children }) => {
  const user = getUser();
  return user ? children : <Navigate to="/login" />;
};


const isAdminLoggedIn = () => sessionStorage.getItem("isAdmin") === "true";

const AdminRoute = ({ children }) => {
  return isAdminLoggedIn() ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

     
        <Route 
          path="/map" 
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } 
        />

       
        <Route path="/admin" element={<AdminLogin />} />

        
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />

       
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
