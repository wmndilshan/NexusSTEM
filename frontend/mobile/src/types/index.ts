export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'preorder';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  b2bPrice?: number;
  images: string[];
  stockStatus: StockStatus;
  stockCount: number;
  isPreorder: boolean;
  isFeatured: boolean;
  isStarterKit: boolean;
  shortDescription: string;
  specs: ProductSpec[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'payhere' | 'paykoko' | 'bank_transfer';

export interface OrderAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  address: OrderAddress;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  trackingSteps: TrackingStep[];
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface TrackingStep {
  id: string;
  label: string;
  description: string;
  completedAt?: string;
  status: 'completed' | 'current' | 'pending';
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  isB2B: boolean;
  b2bStatus?: 'pending' | 'approved' | 'rejected';
  companyName?: string;
}

export interface B2BApplication {
  companyName: string;
  registrationNumber: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  businessType: string;
  monthlyVolume: string;
  address: string;
  notes: string;
}

// Navigation param types
export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
  OrderSuccess: { orderId: string; orderNumber: string };
  OrderTracking: { orderId: string };
  B2BApply: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Categories: { categoryId?: string } | undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};
