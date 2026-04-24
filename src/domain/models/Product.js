/**
 * Product Entity
 */
export class Product {
  constructor({ id, name, price, image, description }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  // Domain logic can be added here, e.g., formatted price
  get formattedPrice() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(this.price);
  }

  // Infer category based on product name for frontend filtering
  get category() {
    const n = this.name.toLowerCase();
    if (n.includes('keyboard') || n.includes('mouse') || n.includes('desk')) return 'Desktop';
    if (n.includes('headphone') || n.includes('speaker') || n.includes('audio')) return 'Audio';
    if (n.includes('watch') || n.includes('wearable') || n.includes('fitness')) return 'Wearables';
    return 'Other';
  }

  // Generate a consistent pseudo-random badge based on the string length and id
  get badge() {
    const hash = (this.name.length + (this.id ? this.id.charCodeAt(0) : 0)) % 4;
    switch (hash) {
      case 0: return 'Best Seller';
      case 1: return 'New';
      case 2: return 'Featured';
      default: return null;
    }
  }
}
