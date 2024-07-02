import { Column } from "typeorm";
import { DateTime } from "luxon";

export interface BaseInterface {
  createdAt?: DateTime;
  updatedAt?: DateTime;
  createBy: string;
  updateBy?: string;
}

export class Base implements BaseInterface {
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
  })
  createdAt?: DateTime;

  @Column({
    nullable: true,
    type: "timestamp",
    // default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: "CURRENT_TIMESTAMP()",
  })
  updatedAt?: DateTime;

  @Column()
  createBy: string;

  @Column({ nullable: true })
  updateBy?: string;
}
