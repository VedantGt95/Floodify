import { useNavigate } from "react-router-dom";
import WeatherMumbai from "./WeatherMumbai";
import floodifyLogo from "./floodylogo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav
        className="flex justify-between items-center px-8 py-4 shadow-md"
       style={{
    background: "linear-gradient(135deg, #000080 0%, #00004d 100%)"
  }}

      >
        <h1
          className="text-2xl font-bold text-white cursor-pointer tracking-wide"
          onClick={() => navigate("/")}
        >
          Floodify
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className="flex flex-col md:flex-row items-center justify-center px-10 py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        }}
      >
        <img
          src={floodifyLogo}
          alt="Floodify Logo"
          className="w-44 h-44 mb-6 md:mb-0 md:mr-10 drop-shadow-lg"
        />
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-3 drop-shadow">
            Real-time Flood Monitoring & Safety
          </h2>
          <p className="text-lg leading-relaxed">
            Floodify allows users to monitor flood-affected areas, report incidents,
            and find nearby shelters and hospitals. Stay informed, stay safe, and
            help authorities manage real-time flood situations effectively.
          </p>
        </div>
      </section>

      {/* Weather Info */}
      <section className="flex justify-center items-center py-12 bg-gray-100">
        <div className="w-full max-w-3xl px-6">
          <WeatherMumbai />
        </div>
      </section>

      {/* About Us */}
      <section className="bg-white py-16 text-center shadow-sm"
       style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        }}>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          We are a team dedicated to providing real-time flood monitoring solutions
          using modern web technologies. Our mission is to empower citizens and
          authorities with accurate data, ensuring timely decisions and safety
          during floods.
        </p>

      </section>

      {/* Footer */}
      <footer
        className="text-white text-center py-4 mt-auto"
        style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        }}
      >
        &copy; {new Date().getFullYear()} Floodify. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
