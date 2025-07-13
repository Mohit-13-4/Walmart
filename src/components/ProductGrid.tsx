import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductClick, 
  onAddToCart,
  searchQuery 
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

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return '#28a745';
      case 'low-stock': return '#ffc107';
      case 'out-of-stock': return '#dc3545';
      default: return '#28a745';
    }
  };

  const getStockStatusText = (status: string, stock: number) => {
    switch (status) {
      case 'in-stock': return `In Stock (${stock})`;
      case 'low-stock': return `Low Stock (${stock} left)`;
      case 'out-of-stock': return 'Out of Stock';
      default: return `In Stock (${stock})`;
    }
  };

  if (products.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-content">
          <h3>No products found</h3>
          {searchQuery && (
            <p>Try adjusting your search terms or browse our categories</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {searchQuery && (
        <div className="search-results-header">
          <h2>Search results for "{searchQuery}"</h2>
          <p>{products.length} items found</p>
        </div>
      )}
      
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductClick(product)}>
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

              <div className="stock-status" style={{ color: getStockStatusColor(product.stockStatus) }}>
                {getStockStatusText(product.stockStatus, product.stock)}
              </div>

              <div className="product-actions">
                <button 
                  className={`add-to-cart-btn ${product.stockStatus === 'out-of-stock' ? 'disabled' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.stockStatus !== 'out-of-stock') {
                      onAddToCart(product);
                    }
                  }}
                  disabled={product.stockStatus === 'out-of-stock'}
                >
                  <Plus size={16} />
                  {product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;