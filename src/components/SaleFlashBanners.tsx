import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SaleBanner {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  image: string;
  gradient: string;
  category: string;
  badge?: string;
}

interface SaleFlashBannersProps {
  onBannerClick: (category: string) => void;
}

const SaleFlashBanners: React.FC<SaleFlashBannersProps> = ({ onBannerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners: SaleBanner[] = [
    {
      id: 'banner-1',
      title: 'iPhone 15 Pro Max',
      subtitle: 'Limited time offer',
      price: 'From ₹1,34,900',
      originalPrice: '₹1,59,900',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      category: 'electronics',
      badge: 'SALE'
    },
    {
      id: 'banner-2',
      title: 'Samsung Galaxy S24',
      subtitle: 'Best deals on smartphones',
      price: 'From ₹74,999',
      originalPrice: '₹89,999',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      category: 'electronics'
    },
    {
      id: 'banner-3',
      title: 'MacBook Air M3',
      subtitle: 'Power meets portability',
      price: 'From ₹1,14,900',
      originalPrice: '₹1,34,900',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      category: 'electronics',
      badge: 'NEW'
    },
    {
      id: 'banner-4',
      title: 'Home Furniture Sale',
      subtitle: 'Up to 60% off',
      price: 'Starting ₹2,999',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      category: 'home'
    },
    {
      id: 'banner-5',
      title: 'Grocery Essentials',
      subtitle: 'Fresh & affordable',
      price: 'Up to 40% off',
      image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      category: 'grocery'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="sale-flash-banners">
      <div 
        className="banner-container"
        style={{ background: currentBanner.gradient }}
        onClick={() => onBannerClick(currentBanner.category)}
      >
        <button className="nav-button prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
          <ChevronLeft size={24} />
        </button>

        <div className="banner-content">
          <div className="banner-text">
            <div className="banner-header">
              {currentBanner.badge && (
                <span className="sale-badge">{currentBanner.badge}</span>
              )}
              <h2>{currentBanner.title}</h2>
              <p>{currentBanner.subtitle}</p>
            </div>
            <div className="banner-pricing">
              <span className="current-price">{currentBanner.price}</span>
              {currentBanner.originalPrice && (
                <span className="original-price">{currentBanner.originalPrice}</span>
              )}
            </div>
          </div>
          
          <div className="banner-image">
            <img src={currentBanner.image} alt={currentBanner.title} />
          </div>
        </div>

        <button className="nav-button next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="banner-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SaleFlashBanners;