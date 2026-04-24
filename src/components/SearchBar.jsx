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
    <div className="relative max-w-3xl w-full mx-auto flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative group w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-xl hover:shadow-indigo-500/10 backdrop-blur-xl"
          placeholder="Search for amazing products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <div className="flex items-center gap-2 text-slate-400 mr-2 text-sm">
            <Filter size={16} />
            <span className="hidden sm:inline">Categories:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory && onSelectCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
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
