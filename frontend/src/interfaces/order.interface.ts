import { BaseInterface } from './base.interface';

export interface OrderProps extends BaseInterface {
  transactionId: string;
  productName: string;
  price: number;
  amount: number;
  productId: number;
}

export interface Order extends OrderProps {
  id: number;
}
