import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';

export function SearchBar({
  onSearch,
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  loadingCategories = false,
}) {
  const [query, setQuery] = useState('');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Input Container */}
      <div className="relative max-w-2xl mx-auto group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-brown-300 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-white border border-beige-200 text-brown-900 placeholder-brown-300 rounded-2xl py-5 pl-14 pr-14 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-sm hover:shadow-luxury text-lg"
          placeholder="Search our collection..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-5 flex items-center text-brown-300 hover:text-brown-900 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Categories Horizontal System */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-brown-400">
          <Filter size={16} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Filter by Category</span>
        </div>
        
        <div className="w-full overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center justify-start lg:justify-center min-w-max gap-3 px-6">
            {loadingCategories ? (
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-24 rounded-full bg-beige-100 animate-pulse"
                />
              ))
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onSelectCategory?.(category)}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                    selectedCategory === category
                      ? 'bg-brown-900 border-brown-900 text-white shadow-luxury translate-y-[-2px]'
                      : 'bg-white border-beige-200 text-brown-600 hover:border-brown-300 hover:bg-beige-50'
                  }`}
                >
                  {category}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

