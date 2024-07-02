import { Request, Response, Router } from "express";
import { SaleOrder } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { SaleOrderProps, Transaction } from "../entities";
import { repo } from "./base";

const router = Router();

export const saleOrderRepo = (): Repository<SaleOrder> => {
  return repo(SaleOrder);
};

export const createSaleOrder = async (
  props: SaleOrderProps
): Promise<SaleOrder | null> => {
  const transactionId: string = props.transactionId as string;

  const saleOrder = await findSaleOrder(transactionId);

  if (saleOrder.length > 0) return null;

  const value = saleOrderRepo().create(props);
  return saleOrderRepo().save(value);
};

export const findSaleOrder = (saleOrderId: string): Promise<SaleOrder[]> => {
  return saleOrderRepo()
    .createQueryBuilder("so")
    .leftJoinAndSelect(Transaction, "t", "t.orderId = so.transactionId")
    .where("so.transactionId = :orderId", { orderId: saleOrderId })
    .select([
      "so.transactionId AS transactionId",
      "so.productName AS productName",
      "so.price AS price",
      "so.amount AS amount",
      "so.productId AS productId",
    ])
    .getRawMany();
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const products = await saleOrderRepo().find();
    res.json(products);
  }
);

router.get(
  "/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const product = await saleOrderRepo().findOne({ where: { id } });

    if (product == null) {
      res.status(404).json({ status: "SaleOrder Not Found", code: 404 });
      return;
    }

    res.json(product);
  }
);

router.get(
  "/saleOrderId/:id",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const product = await findSaleOrder(id);

    if (product.length === 0) {
      res.status(404).json({ status: "SaleOrder Not Found", code: 404 });
      return;
    }

    res.json(product);
  }
);

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const result = await createSaleOrder(req.body);

  res.json(result);
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const product = await saleOrderRepo().findOne({ where: { id } });

  if (product == null) {
    res.status(404).json({ status: "Product Not Found", code: 404 });
    return;
  }

  const updateProduct = { ...product, ...req.body };

  const result = await saleOrderRepo().save(updateProduct);
  res.json(result);
});

router.put(
  "/saleOrderId/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const product = await findSaleOrder(id);

    if (product.length === 0) {
      res.status(404).json({ status: "Product Not Found", code: 404 });
      return;
    }

    const updateProduct = { ...product, ...req.body };

    const result = await saleOrderRepo().save(updateProduct);
    res.json(result);
  }
);

router.delete(
  "/saleOrderId/:id",
  async (req: Request, res: Response): Promise<void> => {
    const id: any = req.params.id;
    // await saleOrderRepo().delete({ saleOrderId: id });

    res.json({ status: "Delete Success", message: "Delete SaleOrder Success" });
  }
);

export { router };
