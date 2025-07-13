import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  total,
  onCheckout
}) => {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Your Cart ({items.length} items)</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-content">
                <h3>Your cart is empty</h3>
                <p>Add items to get started</p>
              </div>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="cart-item-image"
                    />
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-price">{formatPrice(item.price)}</p>
                    </div>

                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="quantity-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="remove-button"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <div className="total-line">
                    <span>Subtotal:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="total-line">
                    <span>Shipping:</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  <div className="total-line final-total">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="checkout-button" onClick={onCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;