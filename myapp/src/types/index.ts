// Inventory Types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  location: string;
  status: string;
  brand: string;
  sizes: string;
  productCode: string;
  orderName: string;
  storeAvailability: StoreAvailability[];
  lastUpdate: string;
}

export interface StoreAvailability {
  location: string;
  available: boolean;
}
