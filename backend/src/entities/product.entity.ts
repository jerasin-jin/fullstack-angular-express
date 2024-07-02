import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { Category } from "./categories.entity";

export interface ProductProps extends BaseInterface {
  name: string;
  price: number;
  description?: string;
  img?: string;
  weightPriority?: number;
  status?: boolean;
  category: Category | number;
}

@Entity()
export class Product extends Base implements ProductProps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  img?: string;

  @Column({ default: true })
  status?: boolean;

  @Column({ nullable: true, unique: true })
  weightPriority?: number;

  @ManyToOne(() => Category, (category) => category.product, {
    nullable: false,
  },)
  category: Category | number;
}
