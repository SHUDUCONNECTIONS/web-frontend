import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/RequestPickupPage.module.css';
import { client } from '../pages/services/graphql.service';
import { CreateRequest } from '../graphql/requestPickup';
import { useRouter } from 'next/router';

const RequestPickUpPage: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientNo, setRecipientNo] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [distance, setDistance] = useState<number | null>(null); 
  const [price, setPrice] = useState<number | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsDisplay, setDirectionsDisplay] = useState<google.maps.DirectionsRenderer | null>(null);
  const pickupAutoCompleteRef = useRef<HTMLInputElement>(null);
  const destinationAutoCompleteRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const initMap = () => {
      const mapOptions: google.maps.MapOptions = {
        zoom: 15,
        center: { lat: -26.2006, lng: 28.0498 }, // Default center (Pretoria)
        mapTypeId: 'roadmap',
      };

      const newMap = new window.google.maps.Map(
        document.getElementById('map') as HTMLElement,
        mapOptions
      );
      setMap(newMap);
      setDirectionsService(new window.google.maps.DirectionsService());
      setDirectionsDisplay(new window.google.maps.DirectionsRenderer());

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            newMap.setCenter(userLocation);

            const userMarker = new window.google.maps.Marker({
              position: userLocation,
              map: newMap,
              title: 'Your Location',
            });

            setMarkers([userMarker]);

            // Reverse geocode the coordinates to get the address
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: userLocation }, (results, status) => {
              if (status === 'OK') {
                if (results && results[0]) {
                  setPickupLocation(results[0].formatted_address);
                } else {
                  console.error('No address found for this location');
                }
              } else {
                console.error('Geocoder failed due to: ' + status);
              }
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    };

    if (!window.google) {
      const apiKey = 'AIzaSyDUyjpfSOAoS2fULkqKvN_Qds_lyw_JL9U';

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  useEffect(() => {
    if (map && pickupAutoCompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(pickupAutoCompleteRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'ZA' } // Restrict to South Africa
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.error('Place not found');
          return;
        }
        setPickupLocation(place.formatted_address || '');
      });
    }
  }, [map]);

  useEffect(() => {
    if (map && destinationAutoCompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(destinationAutoCompleteRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'ZA' } // Restrict to South Africa
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.error('Place not found');
          return;
        }
        setDestinationAddress(place.formatted_address || '');
      });
    }
  }, [map]);

  useEffect(() => {
    if (!destinationAddress || !directionsService || !directionsDisplay || !map) return;

    const origin = markers[0]?.getPosition();
    if (!origin) {
      console.error('User location not found.');
      return;
    }

    const request: google.maps.DirectionsRequest = {
      origin,
      destination: destinationAddress,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        directionsDisplay.setMap(map);
      } else {
        console.error('Error calculating directions:', status);
      }
    });
  }, [destinationAddress, map, markers, directionsService, directionsDisplay]);

    // Function to calculate the distance between pickup and destination
  const calculateDistance = () => {
    if (!map || !pickupLocation || !destinationAddress) return;

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickupLocation],
        destinations: [destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK' && response && response.rows && response.rows.length > 0 &&
            response.rows[0].elements && response.rows[0].elements.length > 0 &&
            response.rows[0].elements[0].distance && response.rows[0].elements[0].distance.value) {
          const distanceValue = response.rows[0].elements[0].distance.value;
          const distanceInKm = distanceValue / 1000; // Convert meters to kilometers
          setDistance(distanceInKm);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  };
  
    useEffect(() => {
      calculateDistance(); // Call the function when pickupLocation or destinationAddress changes
    }, [pickupLocation, destinationAddress]);
  
    // Function to calculate the price based on distance
  const calculatePrice = (distance: number) => {
    if (!distance) return;

    // Assuming a basic pricing model: $0.5 per km
    const pricePerKm = 6;
    const totalPrice = distance * pricePerKm;

    setPrice(totalPrice);
  };

  useEffect(() => {
    if (distance !== null) {
      calculatePrice(distance); // Calculate price when distance changes
    }
  }, [distance]);
  
    const handleRecipientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRecipientName(event.target.value);
    };
  
    const handleRecipientNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRecipientNo(event.target.value);
    };
  
    const handleDeliveryStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setDeliveryState(event.target.value);
    };

  const handleFindLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(userLocation);

          const userMarker = new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
          });

          setMarkers([userMarker]);

          // Reverse geocode the coordinates to get the address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, (results, status) => {
            if (status === 'OK') {
              if (results && results[0]) {
                setPickupLocation(results[0].formatted_address);
              } else {
                console.error('No address found for this location');
              }
            } else {
              console.error('Geocoder failed due to: ' + status);
            }
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  };

  const handleRequestPickUp = async () => {
    try {
      const rideFee = price;

      localStorage.setItem('price', rideFee.toString());
      localStorage.setItem('pickupAddress', pickupLocation);
      localStorage.setItem('deliveryAddress', destinationAddress);
      localStorage.setItem('recipientName', recipientName);
      localStorage.setItem('recipientNo', recipientNo);
      localStorage.setItem('deliveryState', 'NORMAL');
      router.push({
        pathname: '/payment',
       
      });
      
      // Clearing state variables
      setDestinationAddress('');
      setRecipientName('');
      setRecipientNo('');
      setDeliveryState('');
    } catch (error) {
      console.error('Error requesting pick-up:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Request Pick Up</h1>
      <div id="map" style={{ height: '400px', width: '600px', marginBottom: '20px', position: 'relative' }}>
    {/* Overlay for displaying distance and price */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', zIndex: '1000' }}>
      {distance !== null && <p>Distance: {distance.toFixed(2)} km</p>}
      {price !== null && <p>Price: R{price.toFixed(2)}</p>}
    </div>
  </div>

      <div>
        <input
          type="text"
          placeholder="Enter pickup location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className={styles.input}
          ref={pickupAutoCompleteRef}
        />
        <br />
        <input
          type="text"
          placeholder="Enter destination address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          className={styles.input}
          ref={destinationAutoCompleteRef}
        />
        <input
          type="text"
          placeholder="Enter recipient's name"
          value={recipientName}
          onChange={handleRecipientNameChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Enter recipient's number"
          value={recipientNo}
          onChange={handleRecipientNoChange}
          className={styles.input}
        />
        <select
          value={deliveryState}
          onChange={handleDeliveryStateChange}
          className={styles.input}
        >
          <option value="">Select Ride Type</option>
          <option value="standard">Normal</option>
          <option value="premium">Urgent</option>
        </select>
        <br />
         {/* Display distance */}
        {distance !== null && (
          
          <p>Distance: {distance.toFixed(2)} km</p>
        )}
        {/* Display price */}
      {price !== null && (
        <p>Price: R{price.toFixed(2)}</p>
      )}
        <button onClick={handleRequestPickUp} className={styles.button}>
          Request Pick Up
        </button>
        <button onClick={handleFindLocation} className={styles.button}>
          Find Location
        </button>
        
      </div>
    </div>
  );
};

export default RequestPickUpPage;
