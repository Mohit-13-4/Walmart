import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface FlashDeal {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  endsAt: string;
  discount: number;
}

interface FlashDealsProps {
  onDealClick: (productId: string) => void;
}

const FlashDeals: React.FC<FlashDealsProps> = ({ onDealClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  const deals: FlashDeal[] = [
    {
      id: "WM-IP15-PRO",
      name: "iPhone 15 Pro",
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
      originalPrice: 134900,
      salePrice: 124900,
      endsAt: "2024-12-31T23:59:59",
      discount: 10000
    },
    {
      id: "WM-TV-SAM55",
      name: "Samsung 55' Smart TV",
      image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg",
      originalPrice: 54999,
      salePrice: 39999,
      endsAt: "2024-12-25T23:59:59",
      discount: 15000
    },
    {
      id: "WM-MBA-M2",
      name: "MacBook Air M2",
      image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
      originalPrice: 114900,
      salePrice: 106900,
      endsAt: "2024-12-30T23:59:59",
      discount: 8000
    },
    {
      id: "WM-OP12",
      name: "OnePlus 12",
      image: "https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg",
      originalPrice: 64999,
      salePrice: 59999,
      endsAt: "2024-12-24T18:00:00",
      discount: 5000
    },
    {
      id: "WM-GAMING-LAP",
      name: "Gaming Laptop RTX 4060",
      image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg",
      originalPrice: 89999,
      salePrice: 77999,
      endsAt: "2024-12-24T23:59:59",
      discount: 12000
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [deals.length]);

  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeLeft: { [key: string]: string } = {};
      
      deals.forEach(deal => {
        const now = new Date().getTime();
        const endTime = new Date(deal.endsAt).getTime();
        const difference = endTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          
          if (days > 0) {
            newTimeLeft[deal.id] = `${days}d ${hours}h`;
          } else {
            newTimeLeft[deal.id] = `${hours}h ${minutes}m`;
          }
        } else {
          newTimeLeft[deal.id] = "EXPIRED";
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);

    return () => clearInterval(interval);
  }, [deals]);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const handleDealClick = (dealId: string) => {
    onDealClick(dealId);
  };

  return (
    <div className="flash-deals-container">
      <div className="flash-deals-header">
        <div className="flash-deals-badge">
          <Zap size={20} />
          <span>FLASH DEALS</span>
        </div>
        <div className="flash-deals-subtitle">Limited Time Offers</div>
      </div>
      
      <div className="flash-deals-carousel">
        <div className="deals-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="deal-card"
              onClick={() => handleDealClick(deal.id)}
            >
              <div className="deal-image-container">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="deal-image"
                />
                <div className="deal-discount-badge">
                  {Math.round((deal.discount / deal.originalPrice) * 100)}% OFF
                </div>
              </div>
              
              <div className="deal-info">
                <h3 className="deal-name">{deal.name}</h3>
                
                <div className="deal-prices">
                  <span className="deal-sale-price">{formatPrice(deal.salePrice)}</span>
                  <span className="deal-original-price">{formatPrice(deal.originalPrice)}</span>
                </div>
                
                <div className="deal-timer">
                  <Clock size={16} />
                  <span>Ends in {timeLeft[deal.id] || 'Loading...'}</span>
                </div>
                
                <div className="deal-savings">
                  Save {formatPrice(deal.discount)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="deals-indicators">
          {deals.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to deal ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashDeals;