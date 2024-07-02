import { UserProps, Role } from "../src/entities";

export const admin: UserProps = {
  firstName: "admin",
  lastName: "admin1234",
  email: "admin@gmail.com",
  password: "123456",
  role: Role.Admin,
  createBy: "admin",
};

export const test: UserProps = {
  firstName: "test",
  lastName: "test1234",
  email: "test@gmail.com",
  password: "123456",
  role: Role.User,
  createBy: "admin",
};
