import React, { useState } from 'react';
import { ArrowLeft, Star, Shield, Truck, RotateCcw, Plus, Minus } from 'lucide-react';

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
  description?: string;
  specifications?: { [key: string]: string };
  warranty?: string;
  delivery?: string;
  returns?: string;
}

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
  onCompareClick: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  onAddToCart, 
  onBack,
  onCompareClick 
}) => {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-details">
      <button onClick={onBack} className="back-button">
        <ArrowLeft size={20} />
        Back to results
      </button>

      <div className="product-details-container">
        <div className="product-details-left">
          <div className="product-image-large-container">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image-large"
            />
            {product.walmartExclusive && (
              <div className="walmart-exclusive-badge-large">
                Walmart Exclusive
              </div>
            )}
          </div>
        </div>

        <div className="product-details-right">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="rating-reviews">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-number">{product.rating}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="price-section">
            <div className="price-container-large">
              <span className="current-price-large">{formatPrice(product.price)}</span>
              {product.deal && (
                <span className="original-price-large">
                  {formatPrice(product.deal.originalPrice)}
                </span>
              )}
            </div>
            {product.deal && (
              <div className="savings">
                You save {formatPrice(product.deal.originalPrice - product.price)}
              </div>
            )}
          </div>

          <div className="walmart-specs">
            <h3>🛒 Walmart Benefits</h3>
            <ul>
              <li>
                <Shield size={16} />
                {product.warranty || "1-Year Manufacturer Warranty"}
              </li>
              <li>
                <Truck size={16} />
                {product.delivery || "Free 2-Day Delivery"}
              </li>
              <li>
                <RotateCcw size={16} />
                {product.returns || "90-Day Free Returns"}
              </li>
            </ul>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="quantity-btn"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="quantity-btn"
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="add-to-cart-btn-large"
            >
              Add to cart
            </button>
            
            <button 
              onClick={() => onCompareClick(product)}
              className="compare-btn-large"
            >
              Compare prices
            </button>
          </div>

          {product.description && (
            <div className="product-description">
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {product.specifications && (
            <div className="product-specifications">
              <h3>Specifications</h3>
              <table>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;