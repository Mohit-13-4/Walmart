import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  distance: number;
  hours: string;
  phone: string;
  services: string[];
}

interface LocationServiceProps {
  onLocationUpdate: (location: { lat: number; lng: number; address: string }) => void;
}

const LocationService: React.FC<LocationServiceProps> = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [zipCode, setZipCode] = useState('');
  const [showZipInput, setShowZipInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = {
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          };
          setLocation(locationData);
          onLocationUpdate(locationData);
          fetchNearbyStores(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Location access denied');
          setShowZipInput(true);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setError('Geolocation not supported');
      setShowZipInput(true);
    }
  };

  const fetchNearbyStores = async (lat: number, lng: number) => {
    // Simulate API call to fetch nearby stores
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockStores: Store[] = [
      {
        id: 'WM-001',
        name: 'Walmart Supercenter - Downtown',
        address: '123 Main Street, Downtown, City 110001',
        distance: 2.3,
        hours: '6:00 AM - 11:00 PM',
        phone: '+91-11-1234-5678',
        services: ['Grocery Pickup', 'Pharmacy', 'Auto Center']
      },
      {
        id: 'WM-002',
        name: 'Walmart Neighborhood Market',
        address: '456 Central Avenue, Central District, City 110002',
        distance: 4.1,
        hours: '7:00 AM - 10:00 PM',
        phone: '+91-11-2345-6789',
        services: ['Grocery Pickup', 'Pharmacy']
      },
      {
        id: 'WM-003',
        name: 'Walmart Supercenter - North',
        address: '789 North Plaza, North District, City 110003',
        distance: 6.8,
        hours: '6:00 AM - 12:00 AM',
        phone: '+91-11-3456-7890',
        services: ['Grocery Pickup', 'Pharmacy', 'Auto Center', 'Garden Center']
      }
    ];

    setStores(mockStores);
  };

  const handleZipCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      setLoading(true);
      
      // Simulate geocoding API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock coordinates for ZIP code
      const mockLocation = {
        lat: 28.6139 + (Math.random() - 0.5) * 0.1,
        lng: 77.2090 + (Math.random() - 0.5) * 0.1,
        address: `ZIP Code: ${zipCode}`
      };
      
      setLocation(mockLocation);
      onLocationUpdate(mockLocation);
      fetchNearbyStores(mockLocation.lat, mockLocation.lng);
      setShowZipInput(false);
      setError(null);
      setLoading(false);
    }
  };

  const handleGetDirections = (store: Store) => {
    if (location) {
      const url = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${store.address}`;
      window.open(url, '_blank');
    }
  };

  const handleCallStore = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="location-service">
      <div className="location-header">
        <h2>
          <MapPin size={24} />
          Your Location & Nearby Stores
        </h2>
        
        {location && (
          <div className="current-location">
            <span>📍 {location.address}</span>
            <button onClick={requestLocation} className="update-location-btn">
              Update Location
            </button>
          </div>
        )}
      </div>

      {error && showZipInput && (
        <div className="zip-code-fallback">
          <h3>Enter Your ZIP Code</h3>
          <p>We'll find stores near you using your ZIP code</p>
          <form onSubmit={handleZipCodeSubmit} className="zip-form">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP code (e.g., 110001)"
              maxLength={6}
              className="zip-input"
            />
            <button type="submit" className="zip-submit-btn" disabled={zipCode.length < 5}>
              Find Stores
            </button>
          </form>
        </div>
      )}

      {loading && (
        <div className="location-loading">
          <div className="loading-spinner"></div>
          <p>Finding stores near you...</p>
        </div>
      )}

      {stores.length > 0 && (
        <div className="nearby-stores">
          <h3>Stores Near You ({stores.length} found)</h3>
          <div className="stores-list">
            {stores.map(store => (
              <div key={store.id} className="store-card">
                <div className="store-main-info">
                  <h4>{store.name}</h4>
                  <p className="store-address">
                    <MapPin size={16} />
                    {store.address}
                  </p>
                  <p className="store-distance">
                    📍 {store.distance} miles away
                  </p>
                  <p className="store-hours">
                    <Clock size={16} />
                    {store.hours}
                  </p>
                  
                  <div className="store-services">
                    {store.services.map(service => (
                      <span key={service} className="service-tag">{service}</span>
                    ))}
                  </div>
                </div>
                
                <div className="store-actions">
                  <button 
                    onClick={() => handleGetDirections(store)}
                    className="directions-btn"
                  >
                    <Navigation size={16} />
                    Directions
                  </button>
                  <button 
                    onClick={() => handleCallStore(store.phone)}
                    className="call-btn"
                  >
                    <Phone size={16} />
                    Call Store
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!location && !showZipInput && !loading && (
        <div className="location-prompt">
          <h3>Find Stores Near You</h3>
          <p>Allow location access to see nearby Walmart stores and local deals</p>
          <button onClick={requestLocation} className="enable-location-btn">
            <MapPin size={20} />
            Enable Location
          </button>
          <button 
            onClick={() => setShowZipInput(true)} 
            className="zip-code-btn"
          >
            Enter ZIP Code Instead
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationService;