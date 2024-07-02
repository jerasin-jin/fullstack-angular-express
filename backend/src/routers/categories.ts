import { Request, Response, Router } from "express";
import { Category, CategoryProps } from "../entities";
import { FindManyOptions, Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { countAll, pagination, repo } from "./base";

const router = Router();

export const categoryRepo = (): Repository<Category> => {
  return repo(Category);
};

export const createCategory = async (
  props: CategoryProps
): Promise<Category | null> => {
  const findCategory = await findOneCategory(props);

  if (findCategory != null) return null;
  const category = categoryRepo().create(props);
  return categoryRepo().save(category);
};

const findOneCategory = async (
  props: CategoryProps
): Promise<Category | null> => {
  return categoryRepo().findOne({ where: { name: props.name } });
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { page, size } = req.query ?? {};
    const pageNumber = parseInt(page as string);
    const sizeNumber = parseInt(size as string);

    const products = await pagination(Category, pageNumber, sizeNumber, {
      status: true,
    });
    res.json(products);
  }
);

router.get(
  "/all",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const products = await categoryRepo().find();
    res.json(products);
  }
);

router.get(
  "/count",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query ?? {};

    let query: FindManyOptions<Category> = {};
    if (status != null) {
      query = {
        where: {
          status: status as any,
        },
      };
    }

    const total = await countAll(Category, query);
    res.json(total);
  }
);

export { router };
