export type AccessibilityProfile = 'standard' | 'vision' | 'mobility' | 'cognitive';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  category: string;
  image: string;
  farmer: string;
  location: string;
  organic: boolean;
  farmToTable: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
