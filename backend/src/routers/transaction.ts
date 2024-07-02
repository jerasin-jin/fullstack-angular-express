import { Request, Response, Router } from "express";
import { Transaction } from "../entities";
import { Repository } from "typeorm";
import { requireJWTAuth } from "../middleware/auth.middleware";
import { TransactionProps, SaleOrder } from "../entities";
import { countAll, pagination, repo } from "./base";

const router = Router();

export const transactionRepo = (): Repository<Transaction> => {
  return repo(Transaction);
};

export const createTransaction = async (
  props: TransactionProps
): Promise<Transaction | null> => {
  const transaction = await findOneTransaction(props);
  console.log("props", props);
  console.log("transaction", transaction);

  if (transaction != null) return null;

  const payload = transactionRepo().create(props);
  return transactionRepo().save(payload);
};

async function updateTransaction(
  transaction: Transaction
): Promise<Transaction | undefined> {
  const { id } = transaction;
  const findTransaction = await transactionRepo().findOne({ where: { id } });

  if (findTransaction == null) return;

  const updateTransaction = { ...findTransaction, ...transaction };

  const result = await transactionRepo().save(updateTransaction);
  return result;
}

router.get(
  "/count",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const total = await countAll(Transaction);
    res.json(total);
  }
);

export const findOneTransaction = (
  id: TransactionProps
): Promise<Transaction | null> => {
  return transactionRepo()
    .createQueryBuilder("t")
    .where("t.orderId = :orderId", { orderId: id.orderId })
    .getOne();
};

router.get(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const { page, size } = req.query ?? {};
    const pageNumber = parseInt(page as string);
    const sizeNumber = parseInt(size as string);
    const transactions = await pagination(Transaction, pageNumber, sizeNumber);
    res.json(transactions);
  }
);

// router.get(
//   "/:id",
//   requireJWTAuth,
//   async (req: Request, res: Response): Promise<void> => {
//     const createBy: string = req.params.email;

//     const transactions = await transactionRepo().find({ where: { createBy } });

//     res.json(transactions);
//   }
// );

router.get(
  "/history/:userId",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.id);

    const transactions = await transactionRepo().find({
      where: { userId },
      // take: page,
      // skip: size,
    });

    res.json(transactions);
  }
);

router.post(
  "/",
  requireJWTAuth,
  async (req: Request, res: Response): Promise<void> => {
    const result = await createTransaction(req.body);

    res.json(result);
  }
);

router.put("/:id", requireJWTAuth, async (req: Request, res: Response) => {
  const transaction = updateTransaction(req.body);

  if (transaction == null) {
    res.status(404).json({ status: "Product Not Found", code: 404 });
    return;
  }

  res.json(transaction);
});

export { router };
