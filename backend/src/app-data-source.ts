import { DataSource } from "typeorm";
import {
  Product,
  User,
  WareHouse,
  SaleOrder,
  Transaction,
  Category,
} from "./entities";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "api",
  password: "123456",
  database: "api",
  entities: [Product, User, WareHouse, SaleOrder, Transaction, Category],
  logging: false,
  synchronize: true,
});
