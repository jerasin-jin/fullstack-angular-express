import { BaseInterface } from './base.interface';

export enum Status {
  APPROVE = 'approve',
  PENDING = 'pending',
  REJECT = 'reject',
}

export interface TransactionProps extends BaseInterface {
  orderId: string;
  totalPrice: number;
  totalAmount: number;
  status: string;
}

export interface Transaction extends TransactionProps {
  id: number;
}
