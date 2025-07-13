import React, { useState } from 'react';
import { Check, CreditCard, MapPin, Package, ArrowLeft, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutStepperProps {
  cartItems: CartItem[];
  total: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  cartItems,
  total,
  onClose,
  onOrderComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  const steps = [
    {
      id: 'cart',
      name: 'Cart Review',
      icon: Package,
      description: 'Review your items'
    },
    {
      id: 'address',
      name: 'Delivery Address',
      icon: MapPin,
      description: 'Where should we deliver?'
    },
    {
      id: 'payment',
      name: 'Payment',
      icon: CreditCard,
      description: 'Choose payment method'
    },
    {
      id: 'confirmation',
      name: 'Confirmation',
      icon: Check,
      description: 'Order summary'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete order
      onOrderComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const renderCartReview = () => (
    <div className="checkout-step-content">
      <h3>Review Your Order</h3>
      <div className="checkout-items">
        {cartItems.map(item => (
          <div key={item.id} className="checkout-item">
            <img src={item.image} alt={item.name} className="checkout-item-image" />
            <div className="checkout-item-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="checkout-item-price">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <div className="summary-line">
          <span>Subtotal:</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping:</span>
          <span className="free">FREE</span>
        </div>
        <div className="summary-line total">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );

  const renderAddressForm = () => (
    <div className="checkout-step-content">
      <h3>Delivery Address</h3>
      <div className="address-form">
        <div className="form-row">
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, street: e.target.value }
              }))}
              placeholder="Enter street address"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, city: e.target.value }
              }))}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              value={formData.address.state}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, state: e.target.value }
              }))}
              placeholder="Enter state"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              value={formData.address.zipCode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, zipCode: e.target.value }
              }))}
              placeholder="Enter ZIP code"
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <select
              value={formData.address.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, country: e.target.value }
              }))}
            >
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="checkout-step-content">
      <h3>Payment Information</h3>
      <div className="payment-methods">
        <div className="payment-method">
          <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked={formData.payment.method === 'card'}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              payment: { ...prev.payment, method: e.target.value }
            }))}
          />
          <label htmlFor="card">Credit/Debit Card</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="upi"
            name="payment"
            value="upi"
            checked={formData.payment.method === 'upi'}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              payment: { ...prev.payment, method: e.target.value }
            }))}
          />
          <label htmlFor="upi">UPI Payment</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="cod"
            checked={formData.payment.method === 'cod'}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              payment: { ...prev.payment, method: e.target.value }
            }))}
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
      </div>

      {formData.payment.method === 'card' && (
        <div className="card-form">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={formData.payment.cardNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                payment: { ...prev.payment, cardNumber: e.target.value }
              }))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={formData.payment.expiryDate}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  payment: { ...prev.payment, expiryDate: e.target.value }
                }))}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={formData.payment.cvv}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  payment: { ...prev.payment, cvv: e.target.value }
                }))}
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              value={formData.payment.nameOnCard}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                payment: { ...prev.payment, nameOnCard: e.target.value }
              }))}
              placeholder="Enter name as on card"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderConfirmation = () => (
    <div className="checkout-step-content">
      <div className="order-confirmation">
        <div className="confirmation-icon">
          <Check size={48} />
        </div>
        <h3>Order Confirmed!</h3>
        <p>Your order has been placed successfully.</p>
        
        <div className="order-details">
          <h4>Order Summary</h4>
          <div className="order-info">
            <p><strong>Order ID:</strong> WM{Date.now()}</p>
            <p><strong>Total:</strong> {formatPrice(total)}</p>
            <p><strong>Delivery Address:</strong> {formData.address.street}, {formData.address.city}</p>
            <p><strong>Payment Method:</strong> {formData.payment.method.toUpperCase()}</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={onClose} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderCartReview();
      case 1: return renderAddressForm();
      case 2: return renderPaymentForm();
      case 3: return renderConfirmation();
      default: return renderCartReview();
    }
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="checkout-stepper">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-icon">
                  <Icon size={20} />
                </div>
                <div className="step-info">
                  <div className="step-name">{step.name}</div>
                  <div className="step-description">{step.description}</div>
                </div>
                {index < steps.length - 1 && <div className="step-connector" />}
              </div>
            );
          })}
        </div>

        <div className="checkout-content">
          {renderStepContent()}
        </div>

        {currentStep < 3 && (
          <div className="checkout-actions">
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="checkout-btn secondary"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            
            <button 
              onClick={handleNext}
              className="checkout-btn primary"
            >
              {currentStep === steps.length - 2 ? 'Place Order' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutStepper;