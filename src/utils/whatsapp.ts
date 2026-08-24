import { STORE_CONFIG } from '../data/storeConfig';
import { CartItem, CustomerOrderDetails, CustomGiftRequestData, PhotoEditingRequestData } from '../types';

/**
 * Builds standard WhatsApp URL with encoded message
 */
export function buildWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = (customPhone || STORE_CONFIG.whatsappNumber).replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Formats Cart Order WhatsApp Message (Supports optional customer object)
 */
export function formatCartOrderMessage(
  items: CartItem[],
  customer: CustomerOrderDetails | { name?: string; phone?: string; deliveryAddress?: string; notes?: string },
  subtotal: number,
  deliveryCharge: number,
  total: number
): string {
  let text = `*Hello RUBS, I would like to place an order.*\n\n`;
  text += `📦 *ORDER DETAILS:*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;

  items.forEach((item, index) => {
    text += `${index + 1}. *${item.name}*\n`;
    if (item.size) {
      text += `   • Size: ${item.size}\n`;
    }
    if (item.material) {
      text += `   • Material: ${item.material}\n`;
    }
    if (item.customDetails) {
      text += `   • Customization: ${item.customDetails}\n`;
    }
    text += `   • Quantity: ${item.quantity}\n`;
    text += `   • Price: ${STORE_CONFIG.currencySymbol}${item.price} each (Item total: ${STORE_CONFIG.currencySymbol}${item.price * item.quantity})\n\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 *Subtotal:* ${STORE_CONFIG.currencySymbol}${subtotal.toLocaleString('en-IN')}\n`;
  text += `🚚 *Delivery Charge:* ${deliveryCharge === 0 ? 'FREE' : `${STORE_CONFIG.currencySymbol}${deliveryCharge}`}\n`;
  text += `🏷️ *Estimated Total:* ${STORE_CONFIG.currencySymbol}${total.toLocaleString('en-IN')}\n\n`;

  if (customer && (customer.name || customer.phone || ('deliveryAddress' in customer && customer.deliveryAddress) || ('address' in customer && customer.address))) {
    text += `👤 *CUSTOMER DETAILS:*\n`;
    if (customer.name) text += `• *Name:* ${customer.name}\n`;
    if (customer.phone) text += `• *Phone / WhatsApp:* ${customer.phone}\n`;
    if ('deliveryAddress' in customer && customer.deliveryAddress) {
      text += `• *Delivery Address:* ${customer.deliveryAddress}\n`;
    } else if ('address' in customer && customer.address) {
      text += `• *Delivery Address:* ${customer.address}, ${(customer as CustomerOrderDetails).city || ''} - ${(customer as CustomerOrderDetails).pincode || ''}\n`;
    }
    if ('notes' in customer && customer.notes) {
      text += `• *Note:* ${customer.notes}\n`;
    } else if ('specialInstructions' in customer && (customer as CustomerOrderDetails).specialInstructions) {
      text += `• *Note:* ${(customer as CustomerOrderDetails).specialInstructions}\n`;
    }
  }

  text += `\n_Please confirm my order and share delivery timeframe._`;
  return text;
}

/**
 * Convenient alias for Cart Order format
 */
export function formatCartWhatsAppOrder(
  items: CartItem[],
  subtotal: number,
  deliveryCharge: number,
  total: number,
  customer?: { name?: string; phone?: string; deliveryAddress?: string; notes?: string }
): string {
  return formatCartOrderMessage(items, customer || {}, subtotal, deliveryCharge, total);
}

/**
 * Custom Gift Quick WhatsApp Message
 */
export function formatCustomGiftWhatsAppEnquiry(
  productName: string,
  customText: string,
  variant: string,
  quantity: number = 1
): string {
  let text = `*Hello RUBS, I would like to order a Custom Gift.*\n\n`;
  text += `🎁 *GIFT TYPE:* ${productName}\n`;
  text += `• *Variant / Option:* ${variant}\n`;
  text += `• *Custom Text / Inscription:* "${customText}"\n`;
  text += `• *Quantity:* ${quantity}\n\n`;
  text += `_(I will attach the reference photo directly here in WhatsApp.)_\n`;
  text += `Please send me the digital mockup preview and pricing.`;
  return text;
}

/**
 * Photo Editing Request Quick Message
 */
export function formatEditingRequestWhatsAppMessage(
  serviceName: string,
  photoCount: number,
  instructions: string,
  turnaround: string
): string {
  let text = `*Hello RUBS, I would like to request Professional Photo Editing.*\n\n`;
  text += `🎨 *SERVICE:* ${serviceName}\n`;
  text += `• *Number of Photos:* ${photoCount}\n`;
  text += `• *Turnaround Preference:* ${turnaround}\n`;
  text += `• *Instructions:* ${instructions}\n\n`;
  text += `_(I will send the high-res photo files here in WhatsApp.)_\n`;
  text += `Please review and let me know the quote and turnaround time.`;
  return text;
}

/**
 * Formats Instant "Buy Now" Single Product WhatsApp Message
 */
export function formatSingleProductOrderMessage(
  productName: string,
  size: string,
  material: string,
  price: number,
  quantity: number,
  customer?: CustomerOrderDetails
): string {
  let text = `*Hello RUBS, I would like to order this item immediately.*\n\n`;
  text += `🖼️ *PRODUCT DETAILS:*\n`;
  text += `• *Product:* ${productName}\n`;
  text += `• *Size:* ${size}\n`;
  if (material) {
    text += `• *Material:* ${material}\n`;
  }
  text += `• *Quantity:* ${quantity}\n`;
  text += `• *Price:* ${STORE_CONFIG.currencySymbol}${price} each\n`;
  text += `• *Total Amount:* ${STORE_CONFIG.currencySymbol}${(price * quantity).toLocaleString('en-IN')}\n\n`;

  if (customer && customer.name) {
    text += `👤 *CUSTOMER DETAILS:*\n`;
    text += `• *Name:* ${customer.name}\n`;
    text += `• *Phone:* ${customer.phone}\n`;
    text += `• *Address:* ${customer.address}, ${customer.city} - ${customer.pincode}\n`;
    if (customer.specialInstructions) {
      text += `• *Note:* ${customer.specialInstructions}\n`;
    }
    text += `\n`;
  }

  text += `Please let me know how to send my photo for framing and confirm the delivery timeframe.`;
  return text;
}

/**
 * Formats Custom Gift Request WhatsApp Message
 */
export function formatCustomGiftRequestMessage(data: CustomGiftRequestData): string {
  let text = `*Hello RUBS, I would like to order a Custom Gift.*\n\n`;
  text += `🎁 *GIFT REQUIREMENTS:*\n`;
  text += `• *Product:* ${data.productName}\n`;
  text += `• *Quantity:* ${data.quantity}\n`;
  
  if (data.customText && data.customText.trim()) {
    text += `• *Custom Text / Name:* "${data.customText.trim()}"\n`;
  }

  if (data.uploadedPhotoNames && data.uploadedPhotoNames.length > 0) {
    text += `• *Photos Attached/Selected:* ${data.uploadedPhotoNames.length} photo(s) (${data.uploadedPhotoNames.join(', ')})\n`;
    text += `  _(I will also send the high-resolution images in this WhatsApp chat)_\n`;
  }

  if (data.specialInstructions && data.specialInstructions.trim()) {
    text += `• *Requirements / Theme:* ${data.specialInstructions.trim()}\n`;
  }

  text += `\n👤 *CUSTOMER INFORMATION:*\n`;
  text += `• *Name:* ${data.customerName}\n`;
  text += `• *Phone:* ${data.phone}\n`;
  if (data.whatsapp && data.whatsapp !== data.phone) {
    text += `• *WhatsApp:* ${data.whatsapp}\n`;
  }
  if (data.email) {
    text += `• *Email:* ${data.email}\n`;
  }

  text += `\nPlease provide the quotation, mockup preview, and payment instructions.`;
  return text;
}

/**
 * Formats Photo Editing Request WhatsApp Message
 */
export function formatPhotoEditingRequestMessage(data: PhotoEditingRequestData): string {
  let text = `*Hello RUBS, I would like to request Professional Photo Editing.*\n\n`;
  text += `🎨 *SERVICE REQUEST:*\n`;
  text += `• *Service:* ${data.serviceName}\n`;
  text += `• *Number of Photos:* ${data.numberOfPhotos}\n`;
  text += `• *Deadline / Urgency:* ${data.deadline || 'Standard (24–48 Hours)'}\n`;
  
  if (data.requirements && data.requirements.trim()) {
    text += `• *Specific Requirements:* ${data.requirements.trim()}\n`;
  }

  if (data.uploadedPhotoNames && data.uploadedPhotoNames.length > 0) {
    text += `• *Files to Edit:* ${data.uploadedPhotoNames.length} image(s) (${data.uploadedPhotoNames.join(', ')})\n`;
    text += `  _(I am sharing the raw/original images directly in this chat)_\n`;
  }

  text += `\n👤 *CLIENT DETAILS:*\n`;
  text += `• *Name:* ${data.name}\n`;
  text += `• *WhatsApp:* ${data.whatsapp}\n`;
  if (data.email) {
    text += `• *Email:* ${data.email}\n`;
  }

  text += `\nPlease check the photos and share price estimate and delivery time.`;
  return text;
}

/**
 * Formats General Enquiry WhatsApp Message
 */
export function formatGeneralEnquiryMessage(topic?: string): string {
  if (topic) {
    return `*Hello RUBS!* I have an enquiry regarding *${topic}*. Could you please assist me?`;
  }
  return `*Hello RUBS!* I am visiting your website and would like to ask a question about your Photo Frames, Custom Gifts, and Photo Editing services.`;
}
