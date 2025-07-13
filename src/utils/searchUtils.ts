import { Product } from '../data/products';

export const filterProducts = (
  products: Product[],
  searchQuery: string,
  selectedCategory: string
): Product[] => {
  let filtered = [...products];

  // Filter by category first
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // If no search query, return category-filtered results
  if (!searchQuery.trim()) {
    return filtered;
  }

  const query = searchQuery.toLowerCase().trim();
  
  // Advanced search with category detection
  const categoryKeywords = {
    electronics: ['iphone', 'mobile', 'phone', 'laptop', 'samsung', 'oneplus', 'electronics'],
    grocery: ['rice', 'pasta', 'oil', 'milk', 'food', 'grocery'],
    home: ['sofa', 'table', 'furniture', 'chair', 'home'],
    clothing: ['shirt', 'jeans', 'clothes', 'tshirt'],
    sports: ['bike', 'yoga', 'mat', 'sports', 'outdoor']
  };

  // Detect category from query
  const detectedCategory = Object.keys(categoryKeywords).find(cat => 
    categoryKeywords[cat as keyof typeof categoryKeywords].some(keyword => 
      query.includes(keyword)
    )
  );

  // If category is detected, filter by that category
  if (detectedCategory && selectedCategory === 'all') {
    filtered = filtered.filter(product => product.category === detectedCategory);
  }

  // Price range detection
  const priceMatch = query.match(/under?\s*₹?(\d+(?:,\d+)*)/i);
  let maxPrice = null;
  if (priceMatch) {
    maxPrice = parseInt(priceMatch[1].replace(/,/g, ''));
  }

  // Text search in name and description
  filtered = filtered.filter(product => {
    const matchesText = 
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      Object.values(product.specifications || {}).some(spec => 
        spec.toLowerCase().includes(query)
      );

    const matchesPrice = maxPrice ? product.price <= maxPrice : true;

    return matchesText && matchesPrice;
  });

  // Sort by relevance and deals
  filtered.sort((a, b) => {
    // Prioritize exact matches
    const aExactMatch = a.name.toLowerCase().includes(query);
    const bExactMatch = b.name.toLowerCase().includes(query);
    
    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    // Prioritize products with deals
    const aDeal = a.deal ? 1 : 0;
    const bDeal = b.deal ? 1 : 0;
    
    if (aDeal !== bDeal) return bDeal - aDeal;

    // Sort by rating
    return b.rating - a.rating;
  });

  return filtered;
};

export const getSearchSuggestions = (query: string, products: Product[]): string[] => {
  if (query.length < 2) return [];

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  products.forEach(product => {
    const words = product.name.toLowerCase().split(' ');
    words.forEach(word => {
      if (word.startsWith(queryLower) && word.length > queryLower.length) {
        suggestions.add(word);
      }
    });

    if (product.name.toLowerCase().includes(queryLower)) {
      suggestions.add(product.name);
    }
  });

  return Array.from(suggestions).slice(0, 5);
};