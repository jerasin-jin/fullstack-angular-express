import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { User } from "./user.entity";

export enum Status {
  APPROVE = "approve",
  PENDING = "pending",
  REJECT = "reject",
}

export interface TransactionProps extends BaseInterface {
  orderId: string;
  totalPrice: number;
  totalAmount: number;
  userId: User | number;
  status: Status | string;
}

@Entity("transaction")
export class Transaction extends Base implements TransactionProps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  orderId: string;

  @Column()
  totalPrice: number;

  @Column()
  totalAmount: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User | number;
}
