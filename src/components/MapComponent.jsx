import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { 
  getMarkers, setMarker, verifyMarker, deleteMarker,
  getFloodAreas, addFloodArea, verifyFloodArea, deleteFloodArea
} from '../API/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icons for status
const pendingIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const verifiedIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const userIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const floodIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });
const shelterIcon = L.icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png', iconSize: [40,41], iconAnchor: [12,41], popupAnchor: [1,-34] });

function MapComponent({ role, username }) {
  const [floodMarkers, setFloodMarkers] = useState([]);
  const [shelterMarkers, setShelterMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchAllMarkers();
    getUserLocation();
  }, []);

  // Fetch markers
  const fetchAllMarkers = async () => {
    try {
      const shelterRes = await getMarkers();       // Admin shelters
      const floodRes = await getFloodAreas();      // User flood areas

      const shelters = Array.isArray(shelterRes.data)
        ? shelterRes.data.map(m => ({ 
            ...m, 
            latitude: Number(m.latitude), 
            longitude: Number(m.longitude), 
            type: 'SHELTER' 
          }))
        : [];

      const floods = Array.isArray(floodRes.data)
        ? floodRes.data.map(m => ({ 
            ...m, 
            latitude: Number(m.latitude), 
            longitude: Number(m.longitude), 
            type: 'FLOOD' 
          }))
        : [];

      setShelterMarkers(shelters);
      setFloodMarkers(floods);
    } catch (err) {
      console.error('Error fetching markers', err);
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => console.warn('Geolocation error:', err),
        { enableHighAccuracy: true, timeout: 10000 } // Increased timeout
      );
    }
  };

  // Map click handler
  function MapClickHandler() {
    useMapEvents({
      click: async e => {
        try {
          const newMarker = {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
            status: 'PENDING'
          };

          if (role === 'ADMIN') {
            // Admin adds shelter
            const res = await setMarker(newMarker);
            setShelterMarkers(prev => [
              ...prev,
              { ...res.data, latitude: Number(res.data.latitude), longitude: Number(res.data.longitude), type: 'SHELTER' }
            ]);
          } else {
            // User adds flood marker
            const res = await addFloodArea(newMarker);
            setFloodMarkers(prev => [
              ...prev,
              { ...res.data, latitude: Number(res.data.latitude), longitude: Number(res.data.longitude), type: 'FLOOD' }
            ]);
          }
        } catch (err) {
          console.error('Error adding marker', err);
          alert('Marker not saved. Check backend.');
        }
      }
    });
    return null;
  }

  // Verify marker
  const handleVerify = async (m) => {
    try {
      if (m.type === 'SHELTER') {
        const res = await verifyMarker(m.id);
        setShelterMarkers(prev => prev.map(x => x.id === m.id ? { ...x, status: res.data.status } : x));
      } else if (m.type === 'FLOOD') {
        const res = await verifyFloodArea(m.id);
        setFloodMarkers(prev => prev.map(x => x.id === m.id ? { ...x, status: res.data.status } : x));
      }
    } catch (err) {
      console.error('Error verifying marker', err);
    }
  };

  // Delete marker
  const handleDelete = async (m) => {
    try {
      if (m.type === 'SHELTER') await deleteMarker(m.id);
      else if (m.type === 'FLOOD') await deleteFloodArea(m.id);

      if (m.type === 'SHELTER') setShelterMarkers(prev => prev.filter(x => x.id !== m.id));
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

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>{username} (You)</Popup>
          </Marker>
        )}

        {floodMarkers.map(m => (
          <Marker
            key={flood-${m.id}}
            position={[m.latitude, m.longitude]}
            icon={m.status === 'PENDING' ? floodIcon : floodIcon}
          >
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

        {shelterMarkers.map(m => (
          <Marker
            key={shelter-${m.id}}
            position={[m.latitude, m.longitude]}
            icon={m.status === 'PENDING' ? pendingIcon : verifiedIcon}
          >
            <Popup>
              SHELTER Marker <br />
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