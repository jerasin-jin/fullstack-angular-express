import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Product } from "./product.entity";
import { Base, BaseInterface } from "./base.entity";

export interface WareHouseProps extends BaseInterface {
  productId: Product | number;
  amount: number;
}

@Entity("wareHouse")
export class WareHouse extends Base implements WareHouseProps {
  @PrimaryColumn()
  @OneToOne(() => Product)
  @JoinColumn({ name: "productId" })
  productId: Product | number;

  @Column()
  amount: number;
}
