import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/decorators/legacy";
import { Cascade, Collection } from "@mikro-orm/core";
import { Customer } from "./customers";
import { Detail } from "./details";
import { Employee } from "./employees";

@Entity({ tableName: "orders" })
export class Order {
  @PrimaryKey()
  id: string;

  @Property({ fieldName: "order_date", columnType: "date" })
  orderDate: Date;

  @Property({ fieldName: "required_date" })
  requiredDate: Date;

  @Property({ fieldName: "shipped_date", columnType: "date", nullable: true })
  shippedDate: Date | null;

  @Property({ fieldName: "ship_via" })
  shipVia: number;

  @Property({
    fieldName: "freight",
    columnType: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  freight: number;

  @Property({ fieldName: "ship_name" })
  shipName: string;

  @Property({ fieldName: "ship_city" })
  shipCity: string;

  @Property({ fieldName: "ship_region", columnType: "varchar", nullable: true })
  shipRegion: string | null;

  @Property({
    fieldName: "ship_postal_code",
    columnType: "varchar",
    nullable: true,
  })
  shipPostalCode: string | null;

  @Property({ fieldName: "ship_country" })
  shipCountry: string;

  @ManyToOne(() => Customer, {
    fieldName: "customer_id",
  })
  customer!: Customer;

  @ManyToOne(() => Employee, {
    fieldName: "employee_id",
  })
  employee!: Employee;

  @OneToMany(() => Detail, (detail) => detail.order, { cascade: [Cascade.ALL] })
  details = new Collection<Detail>(this);
}
