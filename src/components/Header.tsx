import React, { useState } from 'react';
import { Search, ShoppingCart, User, MapPin, Mic, ChevronDown, Heart, X, LocateFixed } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  currentUser: any;
  onSignInClick: () => void;
  onVoiceClick: () => void;
  onReorderClick?: () => void;
  onPurchaseHistoryClick?: () => void;
  onWalmartPlusClick?: () => void;
  onProtectionPlansClick?: () => void;
  onSignOutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  currentUser,
  onSignInClick,
  onVoiceClick,
  onReorderClick,
  onPurchaseHistoryClick,
  onWalmartPlusClick,
  onProtectionPlansClick,
  onSignOutClick
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [location, setLocation] = useState({
    city: 'Sacramento',
    zip: '95829',
    stateCountry: 'California, USA'
  });
  const [newCity, setNewCity] = useState(location.city);
  const [newZip, setNewZip] = useState(location.zip);
  const [newStateCountry, setNewStateCountry] = useState(location.stateCountry);
  const [geoLoading, setGeoLoading] = useState(false);

  const handleLocationSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation({ city: newCity, zip: newZip, stateCountry: newStateCountry });
    setIsLocationModalOpen(false);
    setIsLocationDropdownOpen(false);
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const address = data.address || {};
        setNewCity(address.city || address.town || address.village || '');
        setNewZip(address.postcode || '');
        const state = address.state || '';
        const country = address.country || '';
        setNewStateCountry(`${state}${state && country ? ', ' : ''}${country}`);
      } catch {
        setNewCity('');
        setNewZip('');
        setNewStateCountry('');
      }
      setGeoLoading(false);
    }, () => {
      setGeoLoading(false);
    });
  };

  const handleReorderClick = () => {
    if (onReorderClick) {
      onReorderClick();
    }
    setIsAccountDropdownOpen(false);
  };

  const handlePurchaseHistoryClick = () => {
    if (onPurchaseHistoryClick) {
      onPurchaseHistoryClick();
    }
    setIsAccountDropdownOpen(false);
  };

  const handleWalmartPlusClick = () => {
    if (onWalmartPlusClick) {
      onWalmartPlusClick();
    }
    setIsAccountDropdownOpen(false);
  };

  const handleProtectionPlansClick = () => {
    if (onProtectionPlansClick) {
      onProtectionPlansClick();
    }
    setIsAccountDropdownOpen(false);
  };

  const handleSignOutClick = () => {
    if (onSignOutClick) {
      onSignOutClick();
    }
    setIsAccountDropdownOpen(false);
  };

  return (
    <header className="walmart-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <div className="walmart-spark">✦</div>
          <span className="walmart-text">Walmart</span>
        </div>

        {/* Location Picker - compact */}
        <div className="location-picker" style={{alignSelf: 'center', marginTop: 0, minWidth: 160, maxWidth: 220}}>
          <button 
            className="location-button"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: 0, padding: '4px 10px', height: 38, borderRadius: 20, background: 'white', color: '#0071ce', border: '1px solid #0071ce', fontWeight: 600, fontSize: 14, boxShadow: 'none'}}
          >
            <MapPin size={16} style={{marginRight: 6}} />
            <span style={{fontWeight: 700, fontSize: 15, color: '#0071ce', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 110}}>
              {location.city}, {location.zip}
            </span>
            <ChevronDown size={16} style={{marginLeft: 6}} />
          </button>
          {isLocationDropdownOpen && (
            <div className="location-dropdown" style={{minWidth: 220, left: 'auto', right: 0}}>
              <div className="dropdown-section">
                <h4>Delivery Options</h4>
                <button className="dropdown-item">
                  <MapPin size={16} />
                  <div>
                    <div>Delivery to {location.zip}</div>
                    <div className="item-subtitle">{location.city}</div>
                  </div>
                </button>
                <button className="dropdown-item">
                  <div>🏪</div>
                  <div>
                    <div>Pickup from store</div>
                    <div className="item-subtitle">{location.stateCountry}</div>
                  </div>
                </button>
              </div>
              <div className="dropdown-section">
                <button className="change-location-btn" onClick={() => setIsLocationModalOpen(true)}>Change location</button>
              </div>
            </div>
          )}
        </div>

        {/* Location Modal */}
        {isLocationModalOpen && (
          <div className="location-modal-overlay" style={{position: 'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.3)', zIndex: 3000, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div className="location-modal" style={{background:'white', borderRadius:12, padding:24, minWidth:260, maxWidth:320, boxShadow:'0 8px 32px rgba(0,0,0,0.2)', position:'relative'}}>
              <button onClick={() => setIsLocationModalOpen(false)} style={{position:'absolute', top:12, right:12, background:'none', border:'none', cursor:'pointer'}}><X size={20} /></button>
              <h3 style={{marginBottom:16, fontSize:18}}>Change Location</h3>
              <form onSubmit={handleLocationSave} style={{display:'flex', flexDirection:'column', gap:10}}>
                <button type="button" onClick={handleUseCurrentLocation} style={{display:'flex', alignItems:'center', gap:6, background:'#0071ce', color:'white', border:'none', borderRadius:6, padding:'8px 0', fontWeight:600, cursor:'pointer', marginBottom:10, justifyContent:'center'}} disabled={geoLoading}>
                  <LocateFixed size={16} />
                  {geoLoading ? 'Detecting...' : 'Use my current location'}
                </button>
                <label style={{fontSize:14}}>
                  City:
                  <input type="text" value={newCity} onChange={e => setNewCity(e.target.value)} style={{width:'100%', padding:6, marginTop:2, borderRadius:4, border:'1px solid #ddd', fontSize:14}} required />
                </label>
                <label style={{fontSize:14}}>
                  Zip Code:
                  <input type="text" value={newZip} onChange={e => setNewZip(e.target.value)} style={{width:'100%', padding:6, marginTop:2, borderRadius:4, border:'1px solid #ddd', fontSize:14}} required />
                </label>
                <label style={{fontSize:14}}>
                  State, Country:
                  <input type="text" value={newStateCountry} onChange={e => setNewStateCountry(e.target.value)} style={{width:'100%', padding:6, marginTop:2, borderRadius:4, border:'1px solid #ddd', fontSize:14}} required />
                </label>
                <button type="submit" style={{marginTop:10, background:'#0071ce', color:'white', border:'none', borderRadius:6, padding:'10px 0', fontWeight:600, cursor:'pointer', fontSize:15}}>Save Location</button>
              </form>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={onSearchSubmit} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search everything at Walmart online and in store"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Voice Search */}
        <button
          onClick={onVoiceClick}
          className="voice-search-btn"
          aria-label="Voice search"
        >
          <Mic size={20} />
        </button>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* Reorder */}
          <div className="header-action-item">
            <button className="action-button" onClick={handleReorderClick}>
              <Heart size={20} />
              <div className="action-text">
                <div className="action-label">Reorder</div>
                <div className="action-subtitle">My Items</div>
              </div>
            </button>
          </div>

          {/* Account */}
          <div className="header-action-item">
            <button 
              className="action-button"
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            >
              <User size={20} />
              <div className="action-text">
                <div className="action-label">
                  {currentUser ? 'Hi, ' + currentUser.name.split(' ')[0] : 'Sign in'}
                </div>
                <div className="action-subtitle">Account</div>
              </div>
            </button>

            {isAccountDropdownOpen && (
              <div className="account-dropdown">
                {!currentUser ? (
                  <div className="dropdown-section">
                    <button onClick={onSignInClick} className="sign-in-btn">
                      Sign in or create account
                    </button>
                    <div className="dropdown-links">
                      <button onClick={handlePurchaseHistoryClick} className="dropdown-link">
                        Purchase History
                      </button>
                      <button onClick={handleWalmartPlusClick} className="dropdown-link">
                        Walmart+
                      </button>
                      <button onClick={handleProtectionPlansClick} className="dropdown-link">
                        Protection & Support Plans
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="dropdown-section">
                    <div className="user-info">
                      <div className="user-avatar">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="user-name">{currentUser.name}</div>
                        <div className="user-email">{currentUser.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-links">
                      <button className="dropdown-link">My Account</button>
                      <button onClick={handlePurchaseHistoryClick} className="dropdown-link">
                        Purchase History
                      </button>
                      <button onClick={handleWalmartPlusClick} className="dropdown-link">
                        Walmart+
                      </button>
                      <button onClick={handleProtectionPlansClick} className="dropdown-link">
                        Protection & Support Plans
                      </button>
                      <button onClick={handleSignOutClick} className="sign-out-btn">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <button onClick={onCartClick} className="cart-button">
            <div className="cart-icon-container">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;