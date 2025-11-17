export interface Venture {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  heroImage: string;
  logo: string;
  primaryCTA: {
    label: string;
    url: string;
  };
  secondaryCTA?: {
    label: string;
    url: string;
  };
  kpis: Array<{
    label: string;
    value: string;
  }>;
  pillars: Array<{
    title: string;
    outcome: string;
  }>;
  gallery: string[];
  pressLinks: Array<{
    title: string;
    outlet: string;
    url: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  teaserSummary: string;
  heroImage: string;
  category: 'Innovation' | 'Strategy' | 'Ecosystem' | "Founder's Note";
  author: string;
  date: string;
  readTime: string;
  relatedVentures?: string[];
}

export interface PressItem {
  id: string;
  title: string;
  outlet: string;
  date: string;
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedinUrl: string;
}







// ====================================TDH ECOMMERCE UI SYSTEM========================

export type UserRole = 'customer' | 'distributor' | 'logistics' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  unit: string;
}

export interface Order {
  id: string;
  customerId: string;
  distributorId?: string;
  logisticsId?: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  address: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Distributor {
  id: string;
  name: string;
  location: string;
  rating: number;
  activeOrders: number;
  completedOrders: number;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}
