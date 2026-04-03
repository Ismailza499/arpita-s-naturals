import { products as defaultProducts, Product } from "@/data/products";

const STORAGE_KEY = "goarpita_admin_products";

export interface AdminProduct extends Product {
  isBestSeller: boolean;
  sortOrder: number;
}

const toAdminProduct = (p: Product, index: number): AdminProduct => ({
  ...p,
  isBestSeller: p.rating >= 4.7,
  sortOrder: index,
});

export const getAdminProducts = (): AdminProduct[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultProducts.map(toAdminProduct);
    }
  }
  return defaultProducts.map(toAdminProduct);
};

export const saveAdminProducts = (products: AdminProduct[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const generateId = () => Math.random().toString(36).substring(2, 15);
