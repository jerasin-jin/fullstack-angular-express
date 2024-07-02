import { Status, TransactionProps } from "../src/entities";

export const transactionList: TransactionProps[] = [
  {
    orderId: "0001",
    totalPrice: 5000,
    totalAmount: 2,
    userId: 1,
    createBy: "admin",
    status: Status.APPROVE,
  },
  {
    orderId: "0002",
    totalPrice: 1500,
    totalAmount: 3,
    userId: 1,
    createBy: "admin",
    status: Status.PENDING,
  },
];
