import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherMumbai = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=19.0728&longitude=72.8826&hourly=temperature_2m,rain,showers&forecast_days=1&timezone=Asia/Kolkata`
        );
        const hourly = response.data.hourly;
        const times = hourly.time;
        const temps = hourly.temperature_2m;
        const rains = hourly.rain;
        const showers = hourly.showers;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const currentTimeString = `${year}-${month}-${day}T${hour}:00`;

        const idx = times.indexOf(currentTimeString);
        if (idx !== -1) {
          setWeatherInfo({
            time: times[idx],
            temperature: temps[idx],
            rain: rains[idx],
            showers: showers[idx],
          });
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherInfo) return <p style={{ textAlign: "center" }}>Loading weather data...</p>;

  const { time, temperature, rain, showers } = weatherInfo;

  return (
    <section style={{
      width: "100%",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "white",
      padding: "40px 20px",
      borderRadius: "12px",
      margin: "30px auto",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    }}>
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "15px" }}>🌤 Mumbai Weather (Live)</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          Updated for: {new Date(time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div style={{ flex: "1", minWidth: "150px", background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>🌡 Temperature</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{temperature} °C</p>
          </div>
          <div style={{ flex: "1", minWidth: "150px", background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>🌧 Rain</h3>
            <p style={{ fontSize: "1.5rem" }}>{rain} mm</p>
          </div>
          <div style={{ flex: "1", minWidth: "150px", background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>🌦 Showers</h3>
            <p style={{ fontSize: "1.5rem" }}>{showers} mm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherMumbai;
