/**
 * Product Entity
 */
export class Product {
  constructor({ id, name, price, image_url, description, category, badge }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image_url = image_url;
    this.description = description;
    this._category = category;
    this._badge = badge;
  }

  // Domain logic can be added here, e.g., formatted price
  get formattedPrice() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.price);
  }

  // Use category from DB if available, otherwise infer from name
  get category() {
    if (this._category) return this._category;
    const n = this.name.toLowerCase();
    if (n.includes('keyboard') || n.includes('mouse') || n.includes('desk')) return 'Desktop';
    if (n.includes('headphone') || n.includes('speaker') || n.includes('audio')) return 'Audio';
    if (n.includes('watch') || n.includes('wearable') || n.includes('fitness')) return 'Wearables';
    return 'Other';
  }

  // Use badge from DB if available, otherwise generate pseudo-random
  get badge() {
    if (this._badge !== undefined && this._badge !== null) return this._badge;
    const hash = (this.name.length + (this.id ? this.id.charCodeAt(0) : 0)) % 4;
    switch (hash) {
      case 0: return 'Best Seller';
      case 1: return 'New';
      case 2: return 'Featured';
      default: return null;
    }
  }
}
