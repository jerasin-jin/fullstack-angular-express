import { Request, Response, Router } from "express";
import { myDataSource } from "../app-data-source";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { WareHouse, WareHouseProps } from "../entities/warehouse.entity";

const router = Router();

const wareHouseRepo = (): Repository<WareHouse> =>
  myDataSource.getRepository(WareHouse);

export const createWareHouse = async (
  props: WareHouseProps
): Promise<WareHouse | null> => {
  const productId = parseInt(props.productId as any);
  const getWareHouse = await findOneWareHouseById(productId);

  if (getWareHouse != null) return null;

  console.log("props", props);

  const wareHouseProps = wareHouseRepo().create(props);
  const result = await wareHouseRepo().save(wareHouseProps);
  return result;
};

const findOneWareHouseById = async (
  productId: number
): Promise<WareHouse | null> => {
  return wareHouseRepo()
    .createQueryBuilder("wh")
    .where("wh.productId = :productId", { productId })
    .getOne();
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const wareHouses = await wareHouseRepo().find();
    res.json(wareHouses);
  }
);

router.get(
  "/count",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { amount } = req.query ?? {};
    let query: FindManyOptions<WareHouse> = {};
    if (amount != null) {
      query = {
        where: {
          amount: parseInt(amount as any),
        },
      };
    }

    const wareHouses = await wareHouseRepo().count(query);
    res.json(wareHouses);
  }
);

router.post(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const wareHouse = createWareHouse(req.body);
    res.json(wareHouse);
  }
);

router.put(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const props = req.body;
    const wareHouse = await wareHouseRepo()
      .createQueryBuilder("wh")
      .where("wh.productId = :productId", { productId: id })
      .getOne();

    console.log("wareHouse", wareHouse);

    if (wareHouse == null) {
      res
        .status(404)
        .json({ status: "Not Found", message: "WareHouse item Not Found" });
      return;
    }

    console.log("update", { ...wareHouse, ...props });

    const result = await wareHouseRepo().save({ ...wareHouse, ...props });
    res.json(result);
  }
);

router.put(
  "/updateAmount/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const props = req.body;
    const wareHouse = await wareHouseRepo()
      .createQueryBuilder("wh")
      .where("wh.productId = :productId", { productId: id })
      .getOne();

    if (wareHouse == null) {
      res
        .status(404)
        .json({ status: "Not Found", message: "WareHouse item Not Found" });
      return;
    }

    if (wareHouse.amount > 0) {
      const resultAmount = wareHouse.amount - props.amount;

      wareHouse.amount = resultAmount;
      console.log("update", wareHouse);
      const result = await wareHouseRepo()
        .createQueryBuilder("wh")
        .update()
        .set(wareHouse)
        .where("productId = :productId", { productId: id })
        .execute();
      res.json(result);
    } else {
      res.status(400).json({
        status: "Cannot Update Amount",
        message: "Error for update Amount",
      });
    }
  }
);

router.delete(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const wareHouse = await wareHouseRepo()
      .createQueryBuilder()
      .where("productId = :productId", { productId: id })
      .getOne();

    if (wareHouse == null) {
      res
        .status(404)
        .json({ status: "Not Found", message: "WareHouse item Not Found" });
    } else {
      res.json(wareHouse);
    }
  }
);

export { router };
