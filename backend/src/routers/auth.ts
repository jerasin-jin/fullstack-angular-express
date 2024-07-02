import { Request, Response, Router } from "express";
import { User, UserProps } from "../entities";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { repo } from "./base";
import { createUser } from "./users";

const router = Router();
const secret = "SecretKey";

const getRepository = (): Repository<User> => repo(User);

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  let matchPassword = false;
  const { email, password } = req.body;
  const user = await getRepository().findOne({ where: { email } });

  if (user == null) {
    res.status(404).json({ status: "User Not Found", code: 404 });
    return;
  }

  if (user?.password != null) {
    matchPassword = await bcrypt.compare(password, user?.password);
  }

  if (!matchPassword || user?.status == false) {
    res.status(400).json({ status: "Authentication Failed", code: 400 });
    return;
  }

  const token = jwt.sign(
    {
      email: user?.email,
      id: user?.id,
      role: user?.role,
    },
    secret,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, role } = req.body;
  let roleSystem = null;

  if (role == null) {
    roleSystem = "user";
  } else {
    roleSystem = role;
  }

  const user = await getRepository().findOne({
    where: { email, firstName, lastName },
  });

  if (user != null) {
    res.status(400).json({ status: "User Is Found", code: 400 });
    return;
  }

  const payload: UserProps = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    createBy: email,
    role: roleSystem
  };

  await createUser(payload);

  res.status(200).json({ status: "Create Success", code: 200 });
});

export { router };
