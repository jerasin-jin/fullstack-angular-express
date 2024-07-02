export interface BasePagination<T> {
  page: number;
  size: number;
  data: T;
}
