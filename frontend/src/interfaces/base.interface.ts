import { DateTime } from 'luxon';

export interface BaseInterface {
  createdAt?: string;
  updatedAt?: string;
  createBy?: string;
  updateBy?: string;
}

export interface BaseTypeOption {
  categoryId?: number;
  productId?: number;
}

export interface Pagination<T> {
  page: number;
  size: number;
  total: number;
  totalPage: number;
  data: T;
}
