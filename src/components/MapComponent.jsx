import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { getFloodAreas, addFloodArea, verifyFloodArea, deleteFloodArea } from '../API/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pendingIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const verifiedIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const userIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapComponent({ role, username }) {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchMarkers();
    getUserLocation();
  }, []);

  const fetchMarkers = async () => {
    try {
      const res = await getFloodAreas();
      const data = Array.isArray(res.data)
        ? res.data.map(m => ({
            ...m,
            latitude: Number(m.latitude),
            longitude: Number(m.longitude),
          }))
        : [];
      setMarkers(data);
    } catch (err) {
      console.error('Error fetching markers', err);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error('Geolocation error:', err);
        },
        { enableHighAccuracy: true, timeout: 1000 }
      );
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const newMarker = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          status: 'PENDING',
        };
        try {
          const res = await addFloodArea(newMarker);
          const savedMarker = {
            ...res.data,
            latitude: Number(res.data.latitude),
            longitude: Number(res.data.longitude),
          };
          setMarkers(prev => [...prev, savedMarker]);
        } catch (err) {
          console.error('Error adding marker', err);
          alert('Marker not saved. Check backend.');
        }
      },
    });
    return null;
  }

  const handleVerify = async (id) => {
    try {
      const res = await verifyFloodArea(id);
      setMarkers(prev =>
        prev.map(m => (m.id === id ? { ...m, status: res.data.status } : m))
      );
    } catch (err) {
      console.error('Error verifying marker', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFloodArea(id);
      setMarkers(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting marker', err);
    }
  };

  const center = userLocation ? [userLocation.lat, userLocation.lng] : [19.076, 72.8777];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>{username} (You)</Popup>
          </Marker>
        )}

        {markers.map(m => (
          <Marker
            key={m.id}
            position={[m.latitude, m.longitude]}
            icon={m.status === 'PENDING' ? pendingIcon : verifiedIcon}
          >
            <Popup>
              Lat: {m.latitude.toFixed(4)}, Lng: {m.longitude.toFixed(4)} <br />
              Status: {m.status === 'PENDING' ? '⏳ Pending' : '✅ Verified'}
              {role === 'ADMIN' && (
                <>
                  {m.status === 'PENDING' && (
                    <>
                      <br />
                      <button className="border p-1" onClick={() => handleVerify(m.id)}>✔ Verify</button>
                    </>
                  )}
                  <br />
                  <button className="border p-1" onClick={() => handleDelete(m.id)}>❌ Remove</button>
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
