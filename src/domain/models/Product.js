/**
 * Product Entity
 */
export class Product {
  constructor({
    id,
    name,
    price,
    original_price,
    image_url,
    description,
    category,
    badge,
    is_featured,
    is_active,
    created_at,
    rating,
    sold,
    review_count,
    discount,
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.original_price = original_price || null;
    this.image_url = image_url;
    this.description = description;
    this._category = category;
    this._badge = badge;
    this.is_featured = is_featured || false;
    this.is_active = is_active !== false; // default true when column absent
    this.created_at = created_at || null;
    this._rating = rating;
    this._sold = sold;
    this._review_count = review_count;
    this._discount = discount;
  }

  /** Format sale price in IDR */
  get formattedPrice() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.price);
  }

  /** Format original (before discount) price in IDR, or null if no discount */
  get formattedOriginalPrice() {
    if (!this.hasDiscount) return null;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.original_price);
  }

  /** True when original_price exists and is greater than the sale price */
  get hasDiscount() {
    return Boolean(this.original_price && this.original_price > this.price);
  }

  /** True when the product was created within the last 7 days */
  get isNew() {
    if (!this.created_at) return false;
    const msElapsed = Date.now() - new Date(this.created_at).getTime();
    return msElapsed < 7 * 24 * 60 * 60 * 1000;
  }

  /** Category from DB, with sane fallback */
  get category() {
    return this._category || 'Other';
  }

  /**
   * Badge priority:
   * 1. Explicit badge from DB
   * 2. is_featured  → "Best Seller"
   * 3. isNew        → "New"
   * 4. null
   */
  get badge() {
    if (this._badge !== undefined && this._badge !== null) return this._badge;
    if (this.is_featured) return 'Best Seller';
    if (this.isNew) return 'New';
    return null;
  }

  /** Dynamic rating from DB, fallback to deterministic (4.0 – 5.0) */
  get rating() {
    if (this._rating !== undefined && this._rating !== null) {
      return Number(this._rating);
    }
    const seed =
      (this.name?.length || 0) +
      (this.id ? String(this.id).charCodeAt(0) : 0);
    const scale = [4.0, 4.2, 4.4, 4.5, 4.7, 4.8, 5.0];
    return scale[seed % scale.length];
  }

  /** Dynamic sold count from DB, fallback to 20 */
  get sold() {
    if (this._sold !== undefined && this._sold !== null) {
      return Number(this._sold);
    }
    return 20;
  }

  /** Dynamic review count from DB, fallback to 50 */
  get review_count() {
    if (this._review_count !== undefined && this._review_count !== null) {
      return Number(this._review_count);
    }
    return 50;
  }

  /** Dynamic discount flag from DB, fallback to false */
  get discount() {
    if (this._discount !== undefined && this._discount !== null) {
      return Boolean(this._discount);
    }
    return false;
  }
}
