import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { Product } from "./product.entity";

export interface CategoryProps extends BaseInterface {
  name: string;
  description?: string;
  img?: string;
  weightPriority?: number;
  status?: boolean;
}

@Entity()
export class Category extends Base implements CategoryProps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  img?: string;

  @Column({ default: true })
  status?: boolean;

  @Column({ unique: true })
  weightPriority?: number;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
