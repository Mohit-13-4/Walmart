import React, { useState, useEffect } from 'react';

interface Deal {
  id: string;
  text: string;
  category: string;
  discount: string;
}

interface SimplifiedFlashDealsProps {
  onDealClick: (category: string) => void;
}

const SimplifiedFlashDeals: React.FC<SimplifiedFlashDealsProps> = ({ onDealClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const deals: Deal[] = [
    {
      id: "deal-1",
      text: "Electronics Sale - Up to 40% Off",
      category: "electronics",
      discount: "40% OFF"
    },
    {
      id: "deal-2", 
      text: "Grocery Essentials - Buy 2 Get 1 Free",
      category: "grocery",
      discount: "B2G1"
    },
    {
      id: "deal-3",
      text: "Home Furniture - Flat 30% Discount",
      category: "home", 
      discount: "30% OFF"
    },
    {
      id: "deal-4",
      text: "Clothing Collection - Starting ₹299",
      category: "clothing",
      discount: "From ₹299"
    },
    {
      id: "deal-5",
      text: "Sports Equipment - Mega Sale 50% Off",
      category: "sports",
      discount: "50% OFF"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [deals.length]);

  return (
    <div className="simplified-flash-deals">
      <div className="deals-container">
        <div className="deals-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="deal-item"
              onClick={() => onDealClick(deal.category)}
            >
              <span className="deal-text">{deal.text}</span>
              <span className="deal-discount">{deal.discount}</span>
            </div>
          ))}
        </div>
        
        <div className="deals-indicators">
          {deals.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimplifiedFlashDeals;