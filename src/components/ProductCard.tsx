import React from 'react';
import { Star, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  deal?: {
    type: string;
    originalPrice: number;
  };
  walmartExclusive?: boolean;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
  onCompareClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  onAddToCart,
  onCompareClick 
}) => {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="product-card" onClick={onClick}>
      {product.walmartExclusive && (
        <div className="walmart-exclusive-badge">
          Walmart Exclusive
        </div>
      )}
      
      {product.deal && (
        <div className="deal-badge">
          {product.deal.type === 'ROLLBACK' ? 'Rollback' : 'Deal'}
        </div>
      )}

      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `/fallbacks/${product.category}.jpg`;
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="rating-container">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="price-container">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.deal && (
            <span className="original-price">
              {formatPrice(product.deal.originalPrice)}
            </span>
          )}
        </div>

        <div className="product-actions">
          <button 
            className="add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <Plus size={16} />
            Add to cart
          </button>
          
          <button 
            className="compare-btn"
            onClick={(e) => {
              e.stopPropagation();
              onCompareClick();
            }}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;