import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { Transaction } from "./transaction.entity";

export interface SaleOrderProps extends BaseInterface {
  transactionId: Transaction | string;
  price: number;
  productName: string;
  productId: number;
  amount: number;
}

@Entity("saleOrder")
export class SaleOrder extends Base implements SaleOrderProps {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Transaction, (value) => value.orderId, { nullable: false })
  @JoinColumn({ name: "transactionId", referencedColumnName: "orderId" })
  transactionId: Transaction | string;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  productId: number;
}
