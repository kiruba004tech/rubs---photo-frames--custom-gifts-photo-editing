export type FrameSize =
  | '4 × 6 inch'
  | '5 × 7 inch'
  | '6 × 8 inch'
  | '8 × 10 inch'
  | '10 × 12 inch'
  | '12 × 15 inch'
  | '12 × 18 inch'
  | '16 × 20 inch'
  | '18 × 24 inch'
  | 'A4 (8.3 × 11.7 inch)'
  | 'A3 (11.7 × 16.5 inch)'
  | 'A2 (16.5 × 23.4 inch)'
  | string;

export interface SizePriceOption {
  size: string;
  label?: string;
  price: number;
  dimensionsCm: string;
  aspectRatio?: string;
  recommendedFor?: string;
}

export interface FrameProduct {
  id: string;
  name: string;
  tagline?: string;
  material: string;
  finish?: string;
  color?: string;
  basePrice: number;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  description: string;
  features: string[];
  glassType?: string;
  hangingOrientation?: 'Portrait & Landscape' | 'Portrait' | 'Landscape' | string;
  imagePlaceholder: {
    label: string;
    bgGradient?: string;
    frameColor: string;
    innerColor: string;
    aspectRatio?: string;
  };
  sizes: SizePriceOption[];
}

export interface CustomGiftProduct {
  id: string;
  name: string;
  category: string;
  startingPrice: number;
  description: string;
  details?: string[];
  customizationOptions?: string[];
  placeholderBg?: string;
  popularOccasion?: string;
  turnaroundTime?: string;
  imagePlaceholder?: {
    label: string;
    icon?: string;
    bgGradient?: string;
    accentColor?: string;
  };
}

export interface PhotoEditingService {
  id: string;
  name: string;
  slug?: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  priceUnit: string;
  turnaround: string;
  deliverables: string[];
  features?: string[];
  sampleBefore: {
    label: string;
    tags: string[];
    description: string;
  };
  sampleAfter: {
    label: string;
    tags: string[];
    description: string;
  };
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  name: string;
  type: 'frame' | 'custom_gift' | 'custom-gift' | 'photo-editing' | string;
  size?: string;
  material?: string;
  customDetails?: string;
  customNotes?: string;
  price: number;
  quantity: number;
  imageLabel?: string;
}

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city?: string;
  pincode?: string;
  deliveryAddress?: string;
  notes?: string;
  specialInstructions?: string;
}

export interface CustomGiftRequestData {
  customerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  productName: string;
  quantity: number;
  customText: string;
  specialInstructions?: string;
  uploadedPhotoNames?: string[];
}

export interface PhotoEditingRequestData {
  name: string;
  whatsapp: string;
  email?: string;
  serviceName: string;
  numberOfPhotos: number;
  requirements: string;
  deadline?: string;
  uploadedPhotoNames?: string[];
}
