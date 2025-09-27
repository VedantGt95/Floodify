import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { 
  getMarkers, setMarker, verifyMarker, deleteMarker,
  getFloodAreas, addFloodArea, verifyFloodArea, deleteFloodArea
} from '../API/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icons
const pendingIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const verifiedIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const userIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const floodIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });

function MapComponent({ role, username }) {
  const [generalMarkers, setGeneralMarkers] = useState([]);
  const [floodMarkers, setFloodMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchAllMarkers();
    getUserLocation();
  }, []);

  const fetchAllMarkers = async () => {
    try {
      const genRes = await getMarkers();
      const floodRes = await getFloodAreas();

      const generalData = Array.isArray(genRes.data)
        ? genRes.data.map(m => ({ ...m, latitude: Number(m.latitude), longitude: Number(m.longitude), type: 'GENERAL' }))
        : [];

      const floodData = Array.isArray(floodRes.data)
        ? floodRes.data.map(m => ({ ...m, latitude: Number(m.latitude), longitude: Number(m.longitude), type: 'FLOOD' }))
        : [];

      setGeneralMarkers(generalData);
      setFloodMarkers(floodData);
    } catch (err) {
      console.error('Error fetching markers', err);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => console.error('Geolocation error:', err),
        { enableHighAccuracy: true, timeout: 1000 }
      );
    }
  };

  // Map click handler
  function MapClickHandler() {
    useMapEvents({
      click: async e => {
        try {
          // Users add both general marker and flood marker
          if (role !== 'ADMIN') {
            const newGen = { latitude: e.latlng.lat, longitude: e.latlng.lng, status: 'PENDING' };
            const genRes = await setMarker(newGen);
            setGeneralMarkers(prev => [...prev, { ...genRes.data, latitude: Number(genRes.data.latitude), longitude: Number(genRes.data.longitude), type: 'GENERAL' }]);

            const newFlood = { latitude: e.latlng.lat, longitude: e.latlng.lng, status: 'PENDING' };
            const floodRes = await addFloodArea(newFlood);
            setFloodMarkers(prev => [...prev, { ...floodRes.data, latitude: Number(floodRes.data.latitude), longitude: Number(floodRes.data.longitude), type: 'FLOOD' }]);
          } else {
            // Admin could add logic if needed
          }
        } catch (err) {
          console.error('Error adding marker', err);
          alert('Marker not saved. Check backend.');
        }
      }
    });
    return null;
  }

  const handleVerify = async (m) => {
    try {
      if (m.type === 'GENERAL') {
        const res = await verifyMarker(m.id);
        setGeneralMarkers(prev => prev.map(x => x.id === m.id ? { ...x, status: res.data.status } : x));
      } else if (m.type === 'FLOOD') {
        const res = await verifyFloodArea(m.id);
        setFloodMarkers(prev => prev.map(x => x.id === m.id ? { ...x, status: res.data.status } : x));
      }
    } catch (err) {
      console.error('Error verifying marker', err);
    }
  };

  const handleDelete = async (m) => {
    try {
      if (m.type === 'GENERAL') await deleteMarker(m.id);
      else if (m.type === 'FLOOD') await deleteFloodArea(m.id);

      if (m.type === 'GENERAL') setGeneralMarkers(prev => prev.filter(x => x.id !== m.id));
      else setFloodMarkers(prev => prev.filter(x => x.id !== m.id));
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

        {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}><Popup>{username} (You)</Popup></Marker>}

        {generalMarkers.map(m => (
          <Marker key={`gen-${m.id}`} position={[m.latitude, m.longitude]} icon={m.status === 'PENDING' ? pendingIcon : verifiedIcon}>
            <Popup>
              GENERAL Marker <br />
              Lat: {m.latitude.toFixed(4)}, Lng: {m.longitude.toFixed(4)} <br />
              Status: {m.status === 'PENDING' ? '⏳ Pending' : '✅ Verified'}
              {role === 'ADMIN' && (
                <>
                  {m.status === 'PENDING' && <><br /><button className="border p-1 mt-1" onClick={() => handleVerify(m)}>✔ Verify</button></>}
                  <br />
                  <button className="border p-1 mt-1" onClick={() => handleDelete(m)}>❌ Remove</button>
                </>
              )}
            </Popup>
          </Marker>
        ))}

        {floodMarkers.map(m => (
          <Marker key={`flood-${m.id}`} position={[m.latitude, m.longitude]} icon={floodIcon}>
            <Popup>
              FLOOD Marker <br />
              Lat: {m.latitude.toFixed(4)}, Lng: {m.longitude.toFixed(4)} <br />
              Status: {m.status === 'PENDING' ? '⏳ Pending' : '✅ Verified'}
              {role === 'ADMIN' && (
                <>
                  {m.status === 'PENDING' && <><br /><button className="border p-1 mt-1" onClick={() => handleVerify(m)}>✔ Verify</button></>}
                  <br />
                  <button className="border p-1 mt-1" onClick={() => handleDelete(m)}>❌ Remove</button>
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
