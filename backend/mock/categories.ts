import { CategoryProps } from "../src/entities/categories.entity";

interface MockCategoryProps extends CategoryProps {
  id: number;
}
export const categoryList: MockCategoryProps[] = [
  {
    id: 1,
    name: "Utility",
    weightPriority: 1,
    createBy: "admin",
  },
  {
    id: 2,
    name: "Electronic",
    weightPriority: 2,
    createBy: "admin",
  },
  {
    id: 3,
    name: "Book",
    weightPriority: 3,
    createBy: "admin",
  },
];
