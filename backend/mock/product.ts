import { ProductProps } from "../src/entities";

export const productList: ProductProps[] = [
  {
    name: "Tissue",
    price: 150,
    description: "test1",
    createBy: "admin",
    weightPriority: 1,
    category: 1,
  },
  {
    name: "NoteBook",
    price: 500,
    description: "test2",
    createBy: "admin",
    weightPriority: 2,
    category: 2,
  },
  {
    name: "TV",
    price: 400,
    description: "test3",
    img: "product_tv.jpg",
    createBy: "admin",
    weightPriority: 3,
    category: 2,
  },
  {
    name: "Book",
    price: 120,
    description: "test4",
    createBy: "admin",
    weightPriority: 4,
    category: 3,
  },
  {
    name: "Iphone",
    price: 3200,
    createBy: "admin",
    weightPriority: 5,
    category: 2,
  },
  {
    name: "Ipad",
    price: 3200,
    createBy: "admin",
    weightPriority: 6,
    category: 2,
  },
];
