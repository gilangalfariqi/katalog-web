import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';

export function SearchBar({ onSearch, categories = [], selectedCategory = 'All', onSelectCategory }) {
  const [query, setQuery] = useState('');

  // Debounce search
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
    <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
      {/* Search Input */}
      <div className="relative group w-full lg:max-w-md xl:max-w-lg flex-shrink-0">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted group-focus-within:text-accent transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-surface/80 border border-white/10 text-text placeholder-muted/60 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all shadow-xl hover:shadow-accent/10 backdrop-blur-xl"
          placeholder="Search curated fashion..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-text transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start lg:justify-end flex-1">
          <div className="flex items-center gap-2 text-muted mr-2 text-sm flex-shrink-0">
            <Filter size={16} />
            <span className="hidden sm:inline">Categories:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory && onSelectCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-surface text-soft hover:bg-primary-dark/40 hover:text-text border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

