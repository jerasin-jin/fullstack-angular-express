export interface Category {
  id: number;
  name: string;
  description?: string;
  img?: string;
  status?: boolean;
  weightPriority?: number;
  createBy: string;
  updateBy: string;
  updatedAt?: string;
  createdAt?: string;
}
