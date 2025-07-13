import React, { useState, useEffect } from 'react';
import { User, MapPin, X, LogIn, UserPlus } from 'lucide-react';
import GoogleIcon from './icons/GoogleIcon';
import FacebookIcon from './icons/FacebookIcon';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

interface AuthFlowProps {
  onClose: () => void;
  onAuthSuccess: (user: AuthUser) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: AuthUser = {
        id: Date.now().toString(),
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        avatar: `https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face`
      };

      // Store user data
      localStorage.setItem('walmart-user', JSON.stringify(user));
      localStorage.setItem('walmart-auth-token', `token_${user.id}`);
      
      onAuthSuccess(user);
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: AuthUser = {
      id: 'google_' + Date.now(),
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face'
    };

    localStorage.setItem('walmart-user', JSON.stringify(user));
    localStorage.setItem('walmart-auth-token', `google_token_${user.id}`);
    
    onAuthSuccess(user);
    setLoading(false);
    onClose();
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    
    // Simulate Facebook OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: AuthUser = {
      id: 'facebook_' + Date.now(),
      name: 'Jane Smith',
      email: 'jane.smith@facebook.com',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face'
    };

    localStorage.setItem('walmart-user', JSON.stringify(user));
    localStorage.setItem('walmart-auth-token', `facebook_token_${user.id}`);
    
    onAuthSuccess(user);
    setLoading(false);
    onClose();
  };

  const requestLocation = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          });
        });

        const { latitude, longitude } = position.coords;
        
        // Simulate reverse geocoding
        const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        
        setLocationPermission('granted');
        
        // Update user with location
        const currentUser = JSON.parse(localStorage.getItem('walmart-user') || '{}');
        const updatedUser = {
          ...currentUser,
          location: {
            lat: latitude,
            lng: longitude,
            address: address
          }
        };
        
        localStorage.setItem('walmart-user', JSON.stringify(updatedUser));
        
      } catch (error) {
        console.error('Location error:', error);
        setLocationPermission('denied');
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <div className="auth-header">
          <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="auth-content">
          <div className="social-auth">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="social-btn google-btn"
            >
              <GoogleIcon style={{fontSize: 22, marginBottom: 4}} />
              <span className="social-btn-text">Continue with Google</span>
            </button>
            
            <button 
              onClick={handleFacebookSignIn}
              disabled={loading}
              className="social-btn facebook-btn"
            >
              <FacebookIcon style={{fontSize: 22, marginBottom: 4}} />
              <span className="social-btn-text">Continue with Facebook</span>
            </button>
          </div>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required={isSignUp}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? (
                <span className="loading-text">
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                <>
                  {isSignUp ? <UserPlus size={16} /> : <LogIn size={16} />}
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="switch-btn"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;