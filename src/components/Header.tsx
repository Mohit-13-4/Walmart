import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin, Mic } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onVoiceClick: () => void;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  userLocation?: string;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onVoiceClick,
  onCartClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  userLocation
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="walmart-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <div className="walmart-logo">
            <span className="logo-text">Walmart</span>
            <span className="logo-spark">✦</span>
          </div>
        </Link>

        {/* Location */}
        {userLocation && (
          <div className="location-display">
            <MapPin className="location-icon" size={16} />
            <span className="location-text">{userLocation}</span>
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
            <button
              type="button"
              onClick={onVoiceClick}
              className="voice-button"
              aria-label="Voice search"
            >
              <Mic size={18} />
            </button>
          </div>
        </form>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* User Menu */}
          <div className="user-menu">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="user-button"
              aria-label="Account menu"
            >
              <User size={24} />
              <span className="user-text">Account</span>
            </button>
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <Link to="/signin" className="dropdown-item">Sign In</Link>
                <Link to="/account" className="dropdown-item">My Account</Link>
                <Link to="/orders" className="dropdown-item">Purchase History</Link>
              </div>
            )}
          </div>

          {/* Cart */}
          <button onClick={onCartClick} className="cart-button" aria-label="Shopping cart">
            <div className="cart-icon-container">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
            <span className="cart-text">
              ${cartItemCount > 0 ? '0.00' : '0.00'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;