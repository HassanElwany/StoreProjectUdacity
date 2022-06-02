import orderProducts from "./orderProducts.type";

type Order = {
  order_id?: string;
  user_id: number;
  order_status: string;
  products: orderProducts[];
};

export default Order;
