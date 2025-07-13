import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { Product } from '../data/products';

interface InfiniteScrollProps {
  initialProducts: Product[];
  category: string;
  searchQuery: string;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  initialProducts,
  category,
  searchQuery,
  onProductClick,
  onAddToCart
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Initialize with first 50 products
  useEffect(() => {
    const firstBatch = initialProducts.slice(0, 50);
    setDisplayedProducts(firstBatch);
    setLoadedIds(new Set(firstBatch.map(p => p.id)));
    setHasMore(initialProducts.length > 50);
  }, [initialProducts]);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentCount = displayedProducts.length;
    const nextBatch = initialProducts
      .slice(currentCount, currentCount + 20)
      .filter(product => !loadedIds.has(product.id)); // Prevent duplicates
    
    if (nextBatch.length === 0) {
      setHasMore(false);
    } else {
      setDisplayedProducts(prev => [...prev, ...nextBatch]);
      setLoadedIds(prev => new Set([...prev, ...nextBatch.map(p => p.id)]));
      
      // Check if we've loaded all available products
      if (currentCount + nextBatch.length >= initialProducts.length) {
        setHasMore(false);
      }
    }
    
    setLoading(false);
  }, [loading, hasMore, displayedProducts.length, initialProducts, loadedIds]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreProducts();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [loadMoreProducts, hasMore, loading]);

  // Reset when filters change
  useEffect(() => {
    const firstBatch = initialProducts.slice(0, 50);
    setDisplayedProducts(firstBatch);
    setLoadedIds(new Set(firstBatch.map(p => p.id)));
    setHasMore(initialProducts.length > 50);
    setLoading(false);
  }, [initialProducts, category, searchQuery]);

  return (
    <div className="infinite-scroll-container">
      <ProductGrid
        products={displayedProducts}
        onProductClick={onProductClick}
        onAddToCart={onAddToCart}
        searchQuery={searchQuery}
      />

      {/* Load more trigger element */}
      <div ref={loadMoreTriggerRef} className="load-more-trigger">
        {loading && (
          <div className="loading-more">
            <Loader2 className="loading-spinner" size={32} />
            <p>Loading more products...</p>
          </div>
        )}
      </div>

      {!hasMore && displayedProducts.length > 0 && (
        <div className="end-of-results">
          <p>You've seen all {displayedProducts.length} products</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top"
          >
            Back to Top
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;