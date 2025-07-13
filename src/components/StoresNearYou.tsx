import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  distance: number;
  hours: string;
  phone: string;
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface StoresNearYouProps {
  userLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

const StoresNearYou: React.FC<StoresNearYouProps> = ({ userLocation }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyStores();
    }
  }, [userLocation]);

  const fetchNearbyStores = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockStores: Store[] = [
      {
        id: 'WM-001',
        name: 'Walmart Supercenter - Downtown',
        address: '123 Main Street, Downtown, City 110001',
        distance: 2.3,
        hours: '6:00 AM - 11:00 PM',
        phone: '+91-11-1234-5678',
        services: ['Grocery Pickup', 'Pharmacy', 'Auto Center', 'Vision Center'],
        coordinates: { lat: 28.6139, lng: 77.2090 }
      },
      {
        id: 'WM-002',
        name: 'Walmart Neighborhood Market - Central',
        address: '456 Central Avenue, Central District, City 110002',
        distance: 4.1,
        hours: '7:00 AM - 10:00 PM',
        phone: '+91-11-2345-6789',
        services: ['Grocery Pickup', 'Pharmacy'],
        coordinates: { lat: 28.6289, lng: 77.2065 }
      },
      {
        id: 'WM-003',
        name: 'Walmart Supercenter - North Plaza',
        address: '789 North Plaza, North District, City 110003',
        distance: 6.8,
        hours: '6:00 AM - 12:00 AM',
        phone: '+91-11-3456-7890',
        services: ['Grocery Pickup', 'Pharmacy', 'Auto Center', 'Garden Center'],
        coordinates: { lat: 28.6448, lng: 77.2167 }
      },
      {
        id: 'WM-004',
        name: 'Walmart Express - South Gate',
        address: '321 South Gate Road, South District, City 110004',
        distance: 8.2,
        hours: '8:00 AM - 9:00 PM',
        phone: '+91-11-4567-8901',
        services: ['Grocery Pickup'],
        coordinates: { lat: 28.5989, lng: 77.2013 }
      }
    ];

    setStores(mockStores);
    setLoading(false);
  };

  const handleGetDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleCallStore = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (!userLocation) {
    return (
      <div className="stores-near-you">
        <div className="location-prompt">
          <MapPin size={48} />
          <h3>Find Stores Near You</h3>
          <p>Enable location access to see nearby Walmart stores and local deals</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="stores-near-you">
        <div className="stores-loading">
          <div className="loading-spinner"></div>
          <h3>Finding Stores Near You...</h3>
          <p>Locating nearby Walmart stores</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stores-near-you">
      <div className="stores-header">
        <h2>Stores Near You</h2>
        <p>Found {stores.length} Walmart stores within 10 miles</p>
      </div>

      <div className="stores-list">
        {stores.map(store => (
          <div 
            key={store.id} 
            className={`store-card ${selectedStore === store.id ? 'selected' : ''}`}
            onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
          >
            <div className="store-main-info">
              <div className="store-header-info">
                <h3>{store.name}</h3>
                <span className="store-distance">{store.distance} miles</span>
              </div>
              
              <div className="store-address">
                <MapPin size={16} />
                <span>{store.address}</span>
              </div>

              <div className="store-hours">
                <Clock size={16} />
                <span>{store.hours}</span>
              </div>

              <div className="store-services">
                {store.services.map(service => (
                  <span key={service} className="service-tag">{service}</span>
                ))}
              </div>
            </div>

            <div className="store-actions">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetDirections(store);
                }}
                className="store-action-btn directions"
              >
                <Navigation size={16} />
                Directions
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCallStore(store.phone);
                }}
                className="store-action-btn call"
              >
                <Phone size={16} />
                Call
              </button>
            </div>

            {selectedStore === store.id && (
              <div className="store-details">
                <div className="store-detail-section">
                  <h4>Contact Information</h4>
                  <p><Phone size={14} /> {store.phone}</p>
                </div>

                <div className="store-detail-section">
                  <h4>Available Services</h4>
                  <ul>
                    {store.services.map(service => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>

                <div className="store-detail-section">
                  <h4>Store Features</h4>
                  <ul>
                    <li>Free Wi-Fi</li>
                    <li>Wheelchair Accessible</li>
                    <li>Restrooms Available</li>
                    <li>ATM Available</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="stores-footer">
        <p>Store hours may vary on holidays. Call ahead to confirm.</p>
      </div>
    </div>
  );
};

export default StoresNearYou;