import { Request, Response, Router } from "express";
import { User, UserProps } from "../entities";
import { FindManyOptions, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { admin, test } from "../../mock/user";
import { countAll, pagination, repo } from "./base";

const router = Router();

const userRepo = (): Repository<User> => repo(User);

export const createUser = async (props: UserProps): Promise<User> => {
  const {
    firstName,
    lastName,
    email,
    status,
    password,
    role,
    createBy,
  }: UserProps = props;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user: UserProps = {
    firstName,
    lastName,
    email,
    status,
    matchName: `${firstName} ${lastName}`,
    password: hashPassword,
    salt,
    role,
    createBy,
  };

  const userProps = userRepo().create(user);
  const result = await userRepo().save(userProps);
  return result;
};

const findOneUser = async (props: UserProps) => {
  return userRepo().findOne({ where: { email: props.email } });
};

export const initUserAdmin = async () => {
  const user = await findOneUser(admin);
  if (user != null) return;
  return createUser(admin);
};

export const initUser = async () => {
  const user = await findOneUser(test);
  if (user != null) return;
  return createUser(test);
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { page, size } = req.query ?? {};
    const pageNumber = parseInt(page as string);
    const sizeNumber = parseInt(size as string);

    const users = await pagination(User, pageNumber, sizeNumber);
    res.json(users);
  }
);

router.get(
  "/count",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { status, role } = req.query ?? {};

    let query: FindManyOptions<User> = {};
    if (status != null) {
      query = {
        where: {
          status: status as any,
        },
      };
    } else if (role != null) {
      query = {
        where: {
          role: role as any,
        },
      };
    }

    const total = await countAll(User, query);
    console.log("total", total);
    res.json(total);
  }
);

router.get(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params ?? {};

    if (id == null) {
      res.status(400).json({ status: "Id Not Found", code: 400 });
      return;
    }

    const userId: number = parseInt(id);
    const user = await userRepo().findOne({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        img: true,
        address: true,
      },
    });

    if (user == null) {
      res.status(404).json({ status: "User Not Found", code: 404 });
      return;
    }

    res.json(user);
  }
);

router.post(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await createUser(req.body);
      res.json(result);
    } catch (e: any) {
      res
        .status(400)
        .json({ message: e?.message ?? "Unknown Error", code: 400 });
    }
  }
);

router.put(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const user = await userRepo().findOne({ where: { id } });

    if (user == null) {
      res.status(404).json({ status: "User Not Found", code: 404 });
      return;
    }

    console.log("req", req.body);

    user.address = req.body.address;

    console.log("user", user);

    const result = await userRepo().save(user);
    res.json(result);
  }
);

export { router };
