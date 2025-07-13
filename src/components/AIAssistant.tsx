import React, { useState, useRef } from 'react';
import { Mic, Send, Bot, User, ShoppingCart, Search, X } from 'lucide-react';
import { Product, allProducts } from '../data/products';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: Array<{
    type: 'add_to_cart' | 'search' | 'navigate' | 'remove_from_cart';
    label: string;
    data: any;
  }>;
}

interface AIAssistantProps {
  onAddToCart: (product: Product) => void;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
  onRemoveFromCart: (productId: string) => void;
  cartItems: any[];
  userHistory: any[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  onAddToCart,
  onSearch,
  onNavigate,
  onRemoveFromCart,
  cartItems,
  userHistory
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (messages.length === 0 && isOpen) {
      addAIMessage("Hello! I'm your Walmart shopping assistant. I can help you find products, manage your cart, and answer questions. Try asking me anything!");
    }
  }, [isOpen]);

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addAIMessage = (content: string, actions?: Message['actions']) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content,
      timestamp: new Date(),
      actions
    };
    setMessages(prev => [...prev, message]);
  };

  const processAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Enhanced AI processing with more intelligent responses
    
    // Cart management - Remove items
    if (input.includes('remove') && (input.includes('cart') || input.includes('delete'))) {
      const itemToRemove = cartItems.find(item => 
        input.includes(item.name.toLowerCase().split(' ')[0]) ||
        input.includes(item.name.toLowerCase()) ||
        input.split(' ').some(word => item.name.toLowerCase().includes(word))
      );
      
      if (itemToRemove) {
        addAIMessage(
          `I'll remove ${itemToRemove.name} from your cart.`,
          [{
            type: 'remove_from_cart',
            label: `Remove ${itemToRemove.name}`,
            data: itemToRemove.id
          }]
        );
        return;
      } else if (cartItems.length > 0) {
        const itemsList = cartItems.map(item => item.name).join(', ');
        addAIMessage(`I couldn't find that specific item. Your cart contains: ${itemsList}. Which item would you like me to remove?`);
        return;
      } else {
        addAIMessage("Your cart is empty. There's nothing to remove!");
        return;
      }
    }

    // Cart management - Add items
    if ((input.includes('add') || input.includes('put')) && input.includes('cart')) {
      const searchTerms = input.replace(/add|put|to|cart|in|my/gi, '').trim();
      const matchingProducts = allProducts.filter(p => 
        searchTerms.split(' ').some(term => 
          p.name.toLowerCase().includes(term) || 
          p.category.toLowerCase().includes(term)
        )
      );

      if (matchingProducts.length > 0) {
        const actions = matchingProducts.slice(0, 3).map(product => ({
          type: 'add_to_cart' as const,
          label: `Add ${product.name} (₹${product.price})`,
          data: product
        }));

        addAIMessage(
          `I found ${matchingProducts.length} products matching "${searchTerms}". Here are the top options:`,
          actions
        );
        return;
      }
    }

    // Cart management - Show cart
    if (input.includes('cart') && (input.includes('show') || input.includes('what') || input.includes('view') || input.includes('check'))) {
      if (cartItems.length === 0) {
        addAIMessage("Your cart is empty. Would you like me to help you find some products?");
        return;
      }
      
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemsList = cartItems.map(item => `${item.name} (${item.quantity})`).join(', ');
      
      addAIMessage(
        `Your cart has ${cartItems.length} items totaling ₹${total.toLocaleString()}. Items: ${itemsList}`,
        [{
          type: 'navigate',
          label: 'View Cart',
          data: '/cart'
        }]
      );
      return;
    }

    // Health-conscious and medical searches
    if (input.includes('diabetic') || input.includes('sugar-free') || input.includes('diabetes')) {
      const diabeticProducts = allProducts.filter(p => 
        p.name.toLowerCase().includes('diabetic') || 
        p.name.toLowerCase().includes('sugar-free') ||
        p.description?.toLowerCase().includes('diabetic') ||
        p.description?.toLowerCase().includes('sugar-free')
      );

      const priceMatch = input.match(/under?\s*₹?(\d+)/);
      let filteredProducts = diabeticProducts;
      
      if (priceMatch) {
        const maxPrice = parseInt(priceMatch[1]);
        filteredProducts = diabeticProducts.filter(p => p.price <= maxPrice);
      }

      if (filteredProducts.length > 0) {
        const actions = filteredProducts.slice(0, 3).map(product => ({
          type: 'add_to_cart' as const,
          label: `Add ${product.name} (₹${product.price})`,
          data: product
        }));

        addAIMessage(
          `I found ${filteredProducts.length} diabetic-friendly products${priceMatch ? ` under ₹${priceMatch[1]}` : ''}. Here are the top options:`,
          actions
        );
      } else {
        addAIMessage("I couldn't find any diabetic-friendly products matching your criteria. Would you like me to search for general healthy snacks instead?");
      }
      return;
    }

    // Insurance and medical coverage questions
    if (input.includes('insurance') || input.includes('cover') || input.includes('medical') || input.includes('wheelchair') || input.includes('mobility')) {
      if (input.includes('wheelchair') || input.includes('mobility')) {
        addAIMessage(
          "Wheelchairs and mobility aids are often covered by insurance. Coverage varies by plan, but many include:\n\n• Manual wheelchairs\n• Power wheelchairs (with prescription)\n• Mobility scooters\n• Walking aids\n\nI recommend checking with your insurance provider for specific coverage details. Would you like me to help you find mobility products?"
        );
      } else {
        addAIMessage(
          "For insurance coverage information, I recommend checking with your insurance provider directly. However, many medical equipment items like wheelchairs, diabetic supplies, and mobility aids are often covered. Would you like me to help you find specific medical products?"
        );
      }
      return;
    }

    // Price-based search
    const priceMatch = input.match(/under?\s*₹?(\d+(?:,\d+)*)/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1].replace(/,/g, ''));
      const affordableProducts = allProducts.filter(p => p.price <= maxPrice);
      
      if (affordableProducts.length > 0) {
        const actions = affordableProducts.slice(0, 3).map(product => ({
          type: 'add_to_cart' as const,
          label: `Add ${product.name} (₹${product.price})`,
          data: product
        }));

        addAIMessage(
          `I found ${affordableProducts.length} products under ₹${maxPrice.toLocaleString()}. Here are some great options:`,
          actions
        );
      } else {
        addAIMessage(`I couldn't find any products under ₹${maxPrice.toLocaleString()}. Would you like me to search for products in a higher price range?`);
      }
      return;
    }

    // General product search
    if (input.includes('find') || input.includes('search') || input.includes('show') || input.includes('look for')) {
      let searchTerm = input.replace(/find|search|show|me|look|for/gi, '').trim();
      
      // Enhanced search with multiple keywords
      const searchWords = searchTerm.split(' ').filter(word => word.length > 2);
      const matchingProducts = allProducts.filter(p => 
        searchWords.some(word => 
          p.name.toLowerCase().includes(word) ||
          p.description?.toLowerCase().includes(word) ||
          p.category.toLowerCase().includes(word)
        )
      );

      if (matchingProducts.length > 0) {
        const actions = matchingProducts.slice(0, 3).map(product => ({
          type: 'add_to_cart' as const,
          label: `Add ${product.name} (₹${product.price})`,
          data: product
        }));

        addAIMessage(
          `I found ${matchingProducts.length} products matching "${searchTerm}". Here are the top results:`,
          actions
        );
      } else {
        onSearch(searchTerm);
        addAIMessage(
          `Searching for "${searchTerm}"...`,
          [{
            type: 'search',
            label: `View Search Results`,
            data: searchTerm
          }]
        );
      }
      return;
    }

    // Category-based searches
    const categoryKeywords = {
      electronics: ['phone', 'mobile', 'laptop', 'computer', 'tablet', 'tv', 'electronics', 'gadget'],
      grocery: ['food', 'grocery', 'rice', 'milk', 'bread', 'snacks', 'eat', 'drink'],
      home: ['furniture', 'home', 'sofa', 'table', 'chair', 'bed', 'decor'],
      clothing: ['clothes', 'shirt', 'pants', 'dress', 'shoes', 'wear', 'fashion']
    };

    const detectedCategory = Object.keys(categoryKeywords).find(cat => 
      categoryKeywords[cat as keyof typeof categoryKeywords].some(keyword => 
        input.includes(keyword)
      )
    );

    if (detectedCategory) {
      const categoryProducts = allProducts.filter(p => p.category === detectedCategory);
      const actions = categoryProducts.slice(0, 3).map(product => ({
        type: 'add_to_cart' as const,
        label: `Add ${product.name} (₹${product.price})`,
        data: product
      }));

      addAIMessage(
        `Here are some popular ${detectedCategory} products:`,
        actions
      );
      return;
    }

    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      addAIMessage("Hello! I'm here to help you shop. You can ask me to find products, manage your cart, or answer questions about our items. What can I help you with today?");
      return;
    }

    // Help requests
    if (input.includes('help') || input.includes('what can you do')) {
      addAIMessage(
        "I can help you with:\n\n• Finding products ('Find laptops under ₹50,000')\n• Managing your cart ('Add rice to cart', 'Remove items')\n• Product questions ('Is this covered by insurance?')\n• Price searches ('Show items under ₹1000')\n• Category browsing ('Show me electronics')\n\nWhat would you like to do?"
      );
      return;
    }

    // Default intelligent response
    addAIMessage(
      `I understand you're looking for something, but I need a bit more information. You can ask me to:\n\n• Find specific products\n• Add or remove items from your cart\n• Search by price range\n• Answer product questions\n\nTry being more specific, like "Find smartphones under ₹20,000" or "Add rice to my cart"`
    );
  };

  const handleUserMessage = (content: string) => {
    addUserMessage(content);
    processAIResponse(content);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserMessage(inputText);
      setInputText('');
    }
  };

  const handleActionClick = (action: Message['actions'][0]) => {
    switch (action.type) {
      case 'add_to_cart':
        onAddToCart(action.data);
        addAIMessage(`Added ${action.data.name} to your cart!`);
        break;
      case 'remove_from_cart':
        onRemoveFromCart(action.data);
        addAIMessage(`Removed item from your cart!`);
        break;
      case 'search':
        onSearch(action.data);
        break;
      case 'navigate':
        onNavigate(action.data);
        break;
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="ai-assistant-toggle"
        aria-label="Open AI Assistant"
      >
        <Bot size={24} />
        <span className="ai-badge">AI</span>
      </button>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div className="ai-assistant-modal">
          <div className="ai-header">
            <div className="ai-title">
              <Bot size={20} />
              <span>Walmart AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-ai">
              <X size={20} />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-content">
                  <p>{message.content}</p>
                  {message.actions && (
                    <div className="message-actions">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action)}
                          className="action-button"
                        >
                          {action.type === 'add_to_cart' && <ShoppingCart size={14} />}
                          {action.type === 'search' && <Search size={14} />}
                          {action.type === 'remove_from_cart' && <X size={14} />}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="ai-input-form">
            <div className="ai-input-container">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about shopping..."
                className="ai-input"
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`voice-btn ${isListening ? 'listening' : ''}`}
              >
                <Mic size={20} />
              </button>
              <button type="submit" className="send-btn" disabled={!inputText.trim()}>
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;