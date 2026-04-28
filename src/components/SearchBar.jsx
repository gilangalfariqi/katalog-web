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
    <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
      {/* Search Input */}
      <div className="relative group w-full lg:max-w-md xl:max-w-lg shrink-0">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm hover:shadow-md"
          placeholder="Cari koleksi fashion..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Hapus pencarian"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start lg:justify-end flex-1">
        <div className="flex items-center gap-1.5 text-gray-400 mr-1 text-sm shrink-0">
          <Filter size={15} />
          <span className="hidden sm:inline text-xs font-medium uppercase tracking-wide">Kategori</span>
        </div>

        {loadingCategories ? (
          // Skeleton pills while categories are loading
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-gray-200 animate-pulse"
              style={{ width: `${60 + i * 12}px` }}
            />
          ))
        ) : (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory?.(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {category}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
