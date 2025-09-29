import type { Item } from "../app/models/basket";
import {
  useClearBasketMutation,
  useFetchBasketQuery,
} from "../features/basket/BasketApi";

export const useBasket = () => {
  const { data: basket } = useFetchBasketQuery();
  const [clearBasket] = useClearBasketMutation();
  const subtotal =
    basket?.items.reduce(
      (sum: number, item: Item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  console.log("is it a delivery fee ? ", deliveryFee);
  console.log("is it a subtotal fee ? ", subtotal);
  const total = subtotal + deliveryFee;

  return { basket, subtotal, deliveryFee, total, clearBasket };
};
