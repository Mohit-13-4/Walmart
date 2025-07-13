import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import ComparisonModal from './components/ComparisonModal';
import SaleFlashBanners from './components/SaleFlashBanners';
import InfiniteScroll from './components/InfiniteScroll';
import AIAssistant from './components/AIAssistant';
import AuthFlow from './components/AuthFlow';
import CheckoutFlow from './components/CheckoutFlow';
import VoiceSearch from './components/VoiceSearch';
import { allProducts } from './data/products';
import { filterProducts } from './utils/searchUtils';
import './styles/walmart.css';
import './styles/senior.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [comparisonProduct, setComparisonProduct] = useState<any>(null);
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('walmart-cart') || '[]');
    setCartItems(savedCart);
    
    const savedHistory = JSON.parse(localStorage.getItem('walmart-history') || '[]');
    setUserHistory(savedHistory);
    
    const savedUser = JSON.parse(localStorage.getItem('walmart-user') || 'null');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('walmart-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const filtered = filterProducts(allProducts, searchQuery, selectedCategory);
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  const handleBannerClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('home');
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('walmart-user');
    localStorage.removeItem('walmart-auth-token');
    setCurrentUser(null);
  };

  const handleReorderClick = () => {
    // Show reorder functionality - could show previous orders
    alert('Reorder functionality - showing your previous orders');
  };

  const handlePurchaseHistoryClick = () => {
    // Show purchase history
    alert('Purchase History - showing your order history');
  };

  const handleWalmartPlusClick = () => {
    // Show Walmart Plus information
    alert('Walmart+ - Premium membership benefits');
  };

  const handleProtectionPlansClick = () => {
    // Show protection plans
    alert('Protection & Support Plans - Extended warranty options');
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    localStorage.removeItem('walmart-cart');
    setIsCheckoutOpen(false);
    setCurrentView('home');
    
    // Add to order history
    const orderHistory = JSON.parse(localStorage.getItem('walmart-orders') || '[]');
    const newOrder = {
      id: 'WM' + Date.now(),
      items: cartItems,
      total: getTotalPrice(),
      date: new Date().toISOString(),
      status: 'Processing'
    };
    orderHistory.push(newOrder);
    localStorage.setItem('walmart-orders', JSON.stringify(orderHistory));
  };

  const handleAddToCart = (product: any, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleNavigate = (path: string) => {
    if (path === '/cart') {
      setIsCartOpen(true);
    } else {
      setCurrentView('home');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleVoiceCommand = (command: string) => {
    // Process voice command through AI Assistant
    console.log('Voice command received:', command);
    handleSearch(command);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="walmart-app">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
        currentUser={currentUser}
        onSignInClick={() => setIsAuthModalOpen(true)}
        onVoiceClick={() => setIsVoiceSearchOpen(true)}
        onReorderClick={handleReorderClick}
        onPurchaseHistoryClick={handlePurchaseHistoryClick}
        onWalmartPlusClick={handleWalmartPlusClick}
        onProtectionPlansClick={handleProtectionPlansClick}
        onSignOutClick={handleSignOut}
      />
      
      <SaleFlashBanners onBannerClick={handleBannerClick} />
      
      <CategoryNav 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="main-content">
        {currentView === 'home' && (
          <InfiniteScroll 
            initialProducts={filteredProducts}
            category={selectedCategory}
            searchQuery={searchQuery}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setCurrentView('product');
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'search' && (
          <InfiniteScroll 
            initialProducts={filteredProducts}
            category={selectedCategory}
            searchQuery={searchQuery}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setCurrentView('product');
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentView('home')}
            onCompareClick={setComparisonProduct}
          />
        )}
      </main>

      <AIAssistant
        onAddToCart={handleAddToCart}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        onRemoveFromCart={handleRemoveFromCart}
        cartItems={cartItems}
        userHistory={userHistory}
      />

      {isVoiceSearchOpen && (
        <VoiceSearch 
          onClose={() => setIsVoiceSearchOpen(false)}
          onCommand={handleVoiceCommand}
        />
      )}

      {isCartOpen && (
        <Cart 
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          total={getTotalPrice()}
          onCheckout={handleCheckout}
        />
      )}

      {comparisonProduct && (
        <ComparisonModal 
          product={comparisonProduct}
          onClose={() => setComparisonProduct(null)}
        />
      )}

      {isAuthModalOpen && (
        <AuthFlow 
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutFlow 
          cartItems={cartItems}
          total={getTotalPrice()}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderComplete={handleOrderComplete}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default App;