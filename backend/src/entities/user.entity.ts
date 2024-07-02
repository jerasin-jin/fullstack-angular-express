import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";

export enum Role {
  Admin = "admin",
  User = "user",
}

export interface UserProps {
  firstName: string;
  lastName: string;
  matchName?: string;
  email: string;
  img?: string;
  status?: boolean;
  password: string;
  salt?: string;
  role?: Role;
  address?: string;
  createBy: string;
}

@Entity()
export class User extends Base implements UserProps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  matchName: string;

  @Column({ unique: true })
  password: string;

  @Column({ unique: true })
  salt: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  img?: string;

  @Column({ default: true })
  status?: boolean;

  @Column()
  role?: Role;

  @Column({ nullable: true })
  address?: string;
}
