import React, { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { PackageX } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-beige-200 bg-white shadow-sm animate-pulse">
      <div className="aspect-[4/5] bg-beige-100" />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="h-5 bg-beige-200 rounded w-4/5" />
        <div className="h-4 bg-beige-200 rounded w-3/5" />
        <div className="mt-auto h-11 bg-beige-200 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading,
  error,
  onProductClick,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center bg-cream-50 rounded-[2.5rem] border border-beige-200">
        <PackageX size={64} className="text-brown-200 mb-6 mx-auto" />
        <h3 className="font-serif text-3xl font-black text-brown-900 mb-3">
          Under Maintenance
        </h3>
        <p className="text-brown-600 max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-32 text-center flex flex-col items-center justify-center bg-cream-50 rounded-[2.5rem] border border-beige-200">
        <PackageX size={64} className="text-brown-200 mb-8" />
        <h3 className="font-serif text-3xl font-black text-brown-900 mb-4">
          No items found
        </h3>
        <p className="text-brown-600 max-w-sm leading-relaxed">
          We couldn't find any items matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-16">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
}

