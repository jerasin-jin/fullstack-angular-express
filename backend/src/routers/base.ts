import { myDataSource } from "../app-data-source";
import {
  Repository,
  EntityTarget,
  ObjectLiteral,
  FindManyOptions,
  FindOptionsRelations,
} from "typeorm";

interface Pagination<T> {
  page: number;
  size: number;
  total: number;
  totalPage: number;
  data: T;
}

interface PaginationOption extends Options {
  categoryId?: number;
  productId?: number;
  status?: boolean;
}

interface Options {
  relations?: Record<string, any>;
}

export const repo = <T extends ObjectLiteral>(
  model: EntityTarget<any>
): Repository<T> => {
  return myDataSource.getRepository(model);
};

export const findOne = <T extends ObjectLiteral>(
  model: EntityTarget<any>,
  whereCondition: Record<string, any>
): Promise<T | null> => {
  const where = [];
  for (const [key, value] of Object.entries(whereCondition)) {
    let resource: Record<string, any> = {};
    resource[key] = value;
    where.push(resource);
  }

  return repo<T>(model).findOne({ where: { ...where } });
};

export const pagination = async <T extends ObjectLiteral>(
  model: EntityTarget<any>,
  pageNumber = 1,
  sizeNumber = 5,
  options?: PaginationOption
): Promise<Pagination<T[]>> => {
  const page = (pageNumber - 1) * sizeNumber;
  const size = sizeNumber;

  const condition: Record<string, any> = {
    where: {},
  };

  const relations: FindOptionsRelations<ObjectLiteral> = {
    relations: {},
  };

  if (options?.relations != null) {
    relations["relations"] = options?.relations;
  }

  if (options?.categoryId != null) {
    condition["where"]["category"] = { id: options?.categoryId };
  } else if (options?.productId != null) {
    condition["where"]["id"] = options?.productId;
  }

  if (options?.status != null) {
    condition["where"]["status"] = options?.status;
  }

  const data = await repo<T>(model).find({
    ...condition,
    skip: page,
    take: size,
    ...relations,
  });

  const count = await repo<T>(model).count({
    ...condition,
    skip: page,
    take: size,
    ...relations,
  });

  return {
    page: pageNumber,
    size: sizeNumber,
    data,
    total: count,
    totalPage: Math.ceil(count / sizeNumber),
  };
};

export const countAll = async <T extends ObjectLiteral>(
  model: EntityTarget<any>,
  whereCondition?: FindManyOptions<T>
): Promise<number> => {
  return repo<T>(model).count(whereCondition);
};
