import React, { useState } from 'react';
import { Check, CreditCard, MapPin, Package, ArrowLeft, ArrowRight, X } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutFlowProps {
  cartItems: CartItem[];
  total: number;
  onClose: () => void;
  onOrderComplete: () => void;
  currentUser: any;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  cartItems,
  total,
  onClose,
  onOrderComplete,
  currentUser
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState({
    shipping: {
      firstName: currentUser?.name?.split(' ')[0] || '',
      lastName: currentUser?.name?.split(' ')[1] || '',
      email: currentUser?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
      billingAddress: 'same'
    }
  });

  const steps = [
    {
      id: 'review',
      name: 'Review Order',
      icon: Package,
      description: 'Review your items'
    },
    {
      id: 'shipping',
      name: 'Shipping Info',
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
      name: 'Order Placed',
      icon: Check,
      description: 'Order confirmation'
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

  const updateShipping = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, [field]: value }
    }));
  };

  const updatePayment = (field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      payment: { ...prev.payment, [field]: value }
    }));
  };

  const renderOrderReview = () => (
    <div className="checkout-step-content">
      <h3>Review Your Order</h3>
      <div className="order-items">
        {cartItems.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.name} className="order-item-image" />
            <div className="order-item-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-summary">
        <div className="summary-line">
          <span>Subtotal ({cartItems.length} items):</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping:</span>
          <span className="free">FREE</span>
        </div>
        <div className="summary-line">
          <span>Tax:</span>
          <span>{formatPrice(Math.round(total * 0.08))}</span>
        </div>
        <div className="summary-line total">
          <span>Total:</span>
          <span>{formatPrice(total + Math.round(total * 0.08))}</span>
        </div>
      </div>
    </div>
  );

  const renderShippingForm = () => (
    <div className="checkout-step-content">
      <h3>Shipping Information</h3>
      <div className="shipping-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              value={orderData.shipping.firstName}
              onChange={(e) => updateShipping('firstName', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              value={orderData.shipping.lastName}
              onChange={(e) => updateShipping('lastName', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            value={orderData.shipping.email}
            onChange={(e) => updateShipping('email', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            value={orderData.shipping.phone}
            onChange={(e) => updateShipping('phone', e.target.value)}
            placeholder="(555) 123-4567"
            required
          />
        </div>
        <div className="form-group">
          <label>Street Address *</label>
          <input
            type="text"
            value={orderData.shipping.address}
            onChange={(e) => updateShipping('address', e.target.value)}
            placeholder="123 Main Street"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              value={orderData.shipping.city}
              onChange={(e) => updateShipping('city', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>State *</label>
            <select
              value={orderData.shipping.state}
              onChange={(e) => updateShipping('state', e.target.value)}
              required
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              {/* Add more states as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>ZIP Code *</label>
            <input
              type="text"
              value={orderData.shipping.zipCode}
              onChange={(e) => updateShipping('zipCode', e.target.value)}
              placeholder="12345"
              required
            />
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
            checked={orderData.payment.method === 'card'}
            onChange={(e) => updatePayment('method', e.target.value)}
          />
          <label htmlFor="card">Credit/Debit Card</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="paypal"
            name="payment"
            value="paypal"
            checked={orderData.payment.method === 'paypal'}
            onChange={(e) => updatePayment('method', e.target.value)}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="affirm"
            name="payment"
            value="affirm"
            checked={orderData.payment.method === 'affirm'}
            onChange={(e) => updatePayment('method', e.target.value)}
          />
          <label htmlFor="affirm">Affirm (Buy now, pay later)</label>
        </div>
      </div>

      {orderData.payment.method === 'card' && (
        <div className="card-form">
          <div className="form-group">
            <label>Card Number *</label>
            <input
              type="text"
              value={orderData.payment.cardNumber}
              onChange={(e) => updatePayment('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date *</label>
              <input
                type="text"
                value={orderData.payment.expiryDate}
                onChange={(e) => updatePayment('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="form-group">
              <label>CVV *</label>
              <input
                type="text"
                value={orderData.payment.cvv}
                onChange={(e) => updatePayment('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Name on Card *</label>
            <input
              type="text"
              value={orderData.payment.nameOnCard}
              onChange={(e) => updatePayment('nameOnCard', e.target.value)}
              placeholder="John Doe"
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
        <h3>Order Placed Successfully!</h3>
        <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
        
        <div className="order-details">
          <h4>Order Summary</h4>
          <div className="order-info">
            <p><strong>Order Number:</strong> WM{Date.now()}</p>
            <p><strong>Total:</strong> {formatPrice(total + Math.round(total * 0.08))}</p>
            <p><strong>Delivery Address:</strong> {orderData.shipping.address}, {orderData.shipping.city}, {orderData.shipping.state}</p>
            <p><strong>Payment Method:</strong> {orderData.payment.method.toUpperCase()}</p>
            <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={onClose} className="continue-shopping-btn">
            Continue Shopping
          </button>
          <button className="track-order-btn">
            Track Your Order
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderOrderReview();
      case 1: return renderShippingForm();
      case 2: return renderPaymentForm();
      case 3: return renderConfirmation();
      default: return renderOrderReview();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return cartItems.length > 0;
      case 1: 
        return orderData.shipping.firstName && 
               orderData.shipping.lastName && 
               orderData.shipping.email && 
               orderData.shipping.phone && 
               orderData.shipping.address && 
               orderData.shipping.city && 
               orderData.shipping.state && 
               orderData.shipping.zipCode;
      case 2:
        if (orderData.payment.method === 'card') {
          return orderData.payment.cardNumber && 
                 orderData.payment.expiryDate && 
                 orderData.payment.cvv && 
                 orderData.payment.nameOnCard;
        }
        return true;
      default: return true;
    }
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
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
              disabled={!isStepValid()}
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

export default CheckoutFlow;