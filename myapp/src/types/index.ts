// Inventory Types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // Always number after validation
  unit: string;
  image: string;
  stock: number; // Always number after validation
  location: string;
  status: string;
  brand: string;
  sizes: string;
  productCode: string;
  orderName: string;
  storeAvailability: StoreAvailability[];
  lastUpdate: string; // From database lastUpdate field
}

export interface StoreAvailability {
  location: string;
  available: boolean;
}

// Auth Types
export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Product Form Types
export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  stock: string;
  location: string;
  status: string;
  brand: string;
  sizes: string;
  productCode: string;
  orderName: string;
}
