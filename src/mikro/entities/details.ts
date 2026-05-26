import { Entity, ManyToOne, Property } from "@mikro-orm/decorators/legacy";
import { Order } from "./orders";
import { Product } from "./products";

@Entity({ tableName: "order_details" })
export class Detail {
  @Property({
    fieldName: "unit_price",
    columnType: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  unitPrice: number;

  @Property({ fieldName: "quantity" })
  quantity: number;

  @Property({
    fieldName: "discount",
    columnType: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  discount: number;

  @ManyToOne(() => Order, { fieldName: "order_id", primary: true })
  order!: Order;

  @ManyToOne(() => Product, { fieldName: "product_id", primary: true })
  product!: Product;
}
