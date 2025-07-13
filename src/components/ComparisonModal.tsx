import React, { useState, useEffect } from 'react';
import { X, TrendingDown, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ComparisonData {
  walmart: number;
  amazon: number;
  flipkart: number;
}

interface ComparisonModalProps {
  product: Product;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ product, onClose }) => {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for competitor prices
    const fetchComparisonData = async () => {
      setLoading(true);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock comparison data
      const basePrice = product.price;
      const amazonPrice = Math.round(basePrice + (Math.random() * 2000 - 1000));
      const flipkartPrice = Math.round(basePrice + (Math.random() * 1500 - 750));
      
      setComparisonData({
        walmart: basePrice,
        amazon: Math.max(amazonPrice, basePrice * 0.8),
        flipkart: Math.max(flipkartPrice, basePrice * 0.85)
      });
      
      setLoading(false);
    };

    fetchComparisonData();
  }, [product]);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const getBestPrice = () => {
    if (!comparisonData) return 'walmart';
    
    const prices = {
      walmart: comparisonData.walmart,
      amazon: comparisonData.amazon,
      flipkart: comparisonData.flipkart
    };
    
    return Object.keys(prices).reduce((a, b) => 
      prices[a as keyof ComparisonData] < prices[b as keyof ComparisonData] ? a : b
    );
  };

  const getSavings = (basePrice: number, comparePrice: number) => {
    const savings = comparePrice - basePrice;
    return {
      amount: Math.abs(savings),
      isPositive: savings > 0
    };
  };

  return (
    <div className="comparison-modal-overlay">
      <div className="comparison-modal">
        <div className="comparison-header">
          <h3>Price Comparison</h3>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="comparison-content">
          <div className="product-info-comparison">
            <img src={product.image} alt={product.name} className="comparison-product-image" />
            <h4>{product.name}</h4>
          </div>

          {loading ? (
            <div className="comparison-loading">
              <div className="loading-spinner"></div>
              <p>Fetching competitor prices...</p>
            </div>
          ) : comparisonData ? (
            <div className="comparison-table">
              <div className="comparison-row header-row">
                <div className="store-name">Store</div>
                <div className="price">Price</div>
                <div className="delivery">Delivery</div>
                <div className="savings">Vs Others</div>
              </div>

              <div className={`comparison-row ${getBestPrice() === 'walmart' ? 'best-price' : ''}`}>
                <div className="store-info">
                  <span className="store-logo">🛒</span>
                  <span className="store-name">Walmart</span>
                  {getBestPrice() === 'walmart' && <span className="best-badge">Best Price</span>}
                </div>
                <div className="price">{formatPrice(comparisonData.walmart)}</div>
                <div className="delivery free">FREE</div>
                <div className="savings">
                  {getBestPrice() === 'walmart' ? (
                    <span className="best-price-text">Lowest Price!</span>
                  ) : (
                    <span className="savings-amount">
                      <TrendingDown size={16} />
                      Save ₹{getSavings(comparisonData.walmart, Math.min(comparisonData.amazon, comparisonData.flipkart)).amount}
                    </span>
                  )}
                </div>
              </div>

              <div className={`comparison-row ${getBestPrice() === 'amazon' ? 'best-price' : ''}`}>
                <div className="store-info">
                  <span className="store-logo">📦</span>
                  <span className="store-name">Amazon</span>
                  {getBestPrice() === 'amazon' && <span className="best-badge">Best Price</span>}
                </div>
                <div className="price">{formatPrice(comparisonData.amazon)}</div>
                <div className="delivery paid">₹99</div>
                <div className="savings">
                  {getBestPrice() !== 'amazon' && (
                    <span className="more-expensive">
                      <TrendingUp size={16} />
                      +₹{getSavings(comparisonData.walmart, comparisonData.amazon).amount}
                    </span>
                  )}
                </div>
              </div>

              <div className={`comparison-row ${getBestPrice() === 'flipkart' ? 'best-price' : ''}`}>
                <div className="store-info">
                  <span className="store-logo">🛍️</span>
                  <span className="store-name">Flipkart</span>
                  {getBestPrice() === 'flipkart' && <span className="best-badge">Best Price</span>}
                </div>
                <div className="price">{formatPrice(comparisonData.flipkart)}</div>
                <div className="delivery paid">₹40</div>
                <div className="savings">
                  {getBestPrice() !== 'flipkart' && (
                    <span className="more-expensive">
                      <TrendingUp size={16} />
                      +₹{getSavings(comparisonData.walmart, comparisonData.flipkart).amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="comparison-error">
              <p>Unable to fetch competitor prices at the moment.</p>
            </div>
          )}

          <div className="comparison-footer">
            <p className="comparison-note">
              * Prices and availability may vary. Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;