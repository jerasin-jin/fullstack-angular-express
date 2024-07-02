export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  img?: string;
  available?: number;
  status?: boolean;
  createBy?: string;
  updateBy?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface ProductForm {
  key: string;
  name: string;
  type: string;
  value?: any;
  require?: boolean;
}
