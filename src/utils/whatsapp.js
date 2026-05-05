/**
 * WhatsApp Link Generator Utility
 * Generates a pre-filled WhatsApp message with cart items
 */

const WHATSAPP_NUMBER = '6282174128947';

/**
 * Generates a WhatsApp checkout link with cart items
 * @param {Array} cart - Array of cart items with name, qty, price
 * @returns {string} WhatsApp wa.me link
 */
export const generateWhatsAppLink = (cart) => {
  if (!cart || cart.length === 0) return '';

  let message = "Halo, saya ingin memesan:\n\n";

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name}\n`;
    message += `Qty: ${item.qty}\n`;
    message += `Harga: Rp ${item.price.toLocaleString('id-ID')}\n\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `Total: Rp ${total.toLocaleString('id-ID')}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default generateWhatsAppLink;
