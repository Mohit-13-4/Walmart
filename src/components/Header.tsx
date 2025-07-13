import React, { useState } from 'react';
import { Search, ShoppingCart, User, MapPin, Mic, ChevronDown, Heart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  currentUser: any;
  onSignInClick: () => void;
  onVoiceClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  currentUser,
  onSignInClick,
  onVoiceClick
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const formatCartTotal = () => {
    // Mock cart total calculation
    return '$0.00';
  };

  return (
    <header className="walmart-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <div className="walmart-spark">✦</div>
          <span className="walmart-text">Walmart</span>
        </div>

        {/* Location Picker */}
        <div className="location-picker">
          <button 
            className="location-button"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <div className="location-content">
              <div className="location-header">
                <MapPin size={16} />
                <span>Pickup or delivery?</span>
                <ChevronDown size={16} />
              </div>
              <div className="location-address">
                Sacramento, 95829 • Sacramento Supe...
              </div>
            </div>
          </button>
          
          {isLocationDropdownOpen && (
            <div className="location-dropdown">
              <div className="dropdown-section">
                <h4>Delivery Options</h4>
                <button className="dropdown-item">
                  <MapPin size={16} />
                  <div>
                    <div>Delivery to 95829</div>
                    <div className="item-subtitle">Sacramento, CA</div>
                  </div>
                </button>
                <button className="dropdown-item">
                  <div>🏪</div>
                  <div>
                    <div>Pickup from store</div>
                    <div className="item-subtitle">Sacramento Supercenter</div>
                  </div>
                </button>
              </div>
              <div className="dropdown-section">
                <button className="change-location-btn">Change location</button>
              </div>
            </div>
          )}
        </div>

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
            <button className="action-button">
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
                      <a href="#purchase-history">Purchase History</a>
                      <a href="#walmart-plus">Walmart+</a>
                      <a href="#protection-plans">Protection & Support Plans</a>
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
                      <a href="#account">My Account</a>
                      <a href="#purchase-history">Purchase History</a>
                      <a href="#walmart-plus">Walmart+</a>
                      <a href="#protection-plans">Protection & Support Plans</a>
                      <button className="sign-out-btn">Sign Out</button>
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
            <div className="cart-total">{formatCartTotal()}</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;