import React from 'react';

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Departments', icon: '🏪' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'grocery', name: 'Grocery', icon: '🛒' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' }
];

const CategoryNav: React.FC<CategoryNavProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <nav className="category-nav">
      <div className="category-container">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`category-button ${
              selectedCategory === category.id ? 'active' : ''
            }`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNav;