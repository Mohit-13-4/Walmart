import React, { useState } from 'react';
import { ArrowLeft, Star, Shield, Truck, RotateCcw, Plus, Minus, MessageCircle } from 'lucide-react';

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
  const [showReviews, setShowReviews] = useState(false);

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

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent product!",
      comment: "This product exceeded my expectations. Great quality and fast delivery."
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      title: "Good value for money",
      comment: "Good product overall. Minor issues but nothing major. Would recommend."
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2024-01-08",
      title: "Perfect!",
      comment: "Exactly what I was looking for. Fast shipping and great customer service."
    }
  ];

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
            <button 
              onClick={() => setShowReviews(!showReviews)}
              className="view-reviews-btn"
            >
              <MessageCircle size={16} />
              View Reviews
            </button>
          </div>

          {showReviews && (
            <div className="reviews-section">
              <h3>Customer Reviews</h3>
              <div className="reviews-list">
                {mockReviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                      <div className="review-meta">
                        <span className="review-user">{review.user}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <h4 className="review-title">{review.title}</h4>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            <div className="quantity-controls-large">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="quantity-btn-large"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <span style={{fontSize: '2rem', fontWeight: 'bold', lineHeight: 1}}>-</span>
              </button>
              <span className="quantity-display-large">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="quantity-btn-large"
                disabled={quantity >= 10}
                aria-label="Increase quantity"
              >
                <span style={{fontSize: '2rem', fontWeight: 'bold', lineHeight: 1}}>+</span>
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