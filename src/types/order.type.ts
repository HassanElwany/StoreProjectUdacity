import orderProducts from "./orderProducts.type";

type Order = {
  id?: number;
  user_id: number;
  order_status: string;
};

export default Order;
