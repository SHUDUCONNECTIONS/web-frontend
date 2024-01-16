import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/RequestPickupPage.module.css';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface RequestPickUpPageProps {
  googleMapsApiKey: string;
}

const RequestPickUpPage: React.FC<RequestPickUpPageProps> = ({ googleMapsApiKey }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [rideType, setRideType] = useState('');
  const [loadError, setLoadError] = useState<boolean>(false);

  const defaultCenter = {
    lat: -33.918861,
    lng: 18.423300,
  };

  const { isLoaded, loadError: jsApiLoadError } = useJsApiLoader({
    googleMapsApiKey,
  });

  useEffect(() => {
    if (isLoaded && mapContainer.current) {
      const googleMap = new google.maps.Map(mapContainer.current, {
        center: defaultCenter,
        zoom: 13,
      });
      setMap(googleMap);

      // Try to get the user's location when the map loads
      handleFindLocation();

      // Initialize the Places Autocomplete
      if (autocompleteInputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current);
        autocomplete.addListener('place_changed', () => {
          const selectedPlace = autocomplete.getPlace();
          if (selectedPlace.geometry && selectedPlace.geometry.location && googleMap) {
            const selectedPosition = {
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            };
            googleMap.setCenter(selectedPosition);
            setPosition(selectedPosition);
          }
        });
      }
    } else {
      setLoadError(true);
    }
  }, [isLoaded, googleMapsApiKey]);

  const handleFindLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userPosition);
          setPosition(userPosition);
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
      rideType: 'Normal',
    });
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Request Pick Up</h1>
      {loadError && <div>Error loading Google Maps. Please check your API key and internet connection.</div>}
      {isLoaded && !loadError && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={position || defaultCenter}
          zoom={13}
          onLoad={(map) => setMap(map as google.maps.Map)}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      )}
      <div className={styles.form}>
        <label>
          Enter Street Code or Building Name:
          <input
            type="text"
            placeholder="Enter Street Code or Building Name"
            ref={autocompleteInputRef}
          />
        </label>
        <label>
          Recipient&apos;s Name:
          <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
        </label>
        <label>
          Recipient&apos;s Cellphone Number:
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
    </div>
  );
};

export default RequestPickUpPage;

