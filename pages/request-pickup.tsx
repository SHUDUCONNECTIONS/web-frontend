import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/RequestPickupPage.module.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapLoaderProps {
  apiKey: string;
  onMapLoad: (map: google.maps.Map) => void;
}

const MapLoader: React.FC<MapLoaderProps> = ({ apiKey, onMapLoad }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBKa7XXei6arjKZrpZXXT6Teo9I1bgSWPs',
  });

  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoaded && mapContainer.current) {
      const googleMap = new google.maps.Map(mapContainer.current, {
        center: { lat: -33.918861, lng: 18.423300 },
        zoom: 13,
      });
      onMapLoad(googleMap);
    }
  }, [isLoaded, onMapLoad]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

interface RequestPickUpPageProps {
  googleMapsApiKey: string;
}

const RequestPickUpPage: React.FC<RequestPickUpPageProps> = ({ googleMapsApiKey }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [rideType, setRideType] = useState('');

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
    // Try to get the user's location when the map loads
    handleFindLocation();
  };

  const handleFindLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (userPosition) => {
          const currentPosition = {
            lat: userPosition.coords.latitude,
            lng: userPosition.coords.longitude,
          };
          map.setCenter(currentPosition);
          setPosition(currentPosition);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  };

  const handleRequestPickUp = () => {
    console.log('Pick-up requested:', {
      position,
      recipientName,
      recipientPhone,
      rideType,
    });
  };

  return (
    <div className={styles.container}>
      <br />
      <h1 className={styles.title}>Request Pick Up</h1>
      {map && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={position || { lat: -33.918861, lng: 18.423300 }}
          zoom={13}
          onLoad={(map) => setMap(map as google.maps.Map)}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      )}
      <div className={styles.form}>
        <label>
          Enter Street Code or Building Name:
          <input type="text" placeholder="Enter Street Code or Building Name" />
        </label>
        <label>
          Recipient's Name:
          <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
        </label>
        <label>
          Recipient's Cellphone Number:
          <input type="text" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} />
        </label>
        <label>
          Select Ride Type:
          <select value={rideType} onChange={(e) => setRideType(e.target.value)}>
            <option value="">Select Ride Type</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        <button onClick={handleFindLocation}>Find Location</button>
        <button onClick={handleRequestPickUp}>Request Pick Up</button>
      </div>
      <MapLoader apiKey={googleMapsApiKey} onMapLoad={handleMapLoad} />
    </div>
  );
};

export default RequestPickUpPage;
