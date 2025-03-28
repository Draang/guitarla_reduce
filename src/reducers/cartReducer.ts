import { db } from "../data/db";
import type { CartItem, Guitar } from "../types";
const MAX_ITEMS = 5,
  MIN_ITEMS = 1;
export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { item: Guitar } }
  | { type: "increase-quantity"; payload: { item: Guitar } }
  | { type: "decrease-quantity"; payload: { item: Guitar } }
  | { type: "clear-cart" };
export type CartState = {
  guitars: Guitar[];
  cart: CartItem[];
};
const initialCart = (): CartItem[] => {
  const localCart = localStorage.getItem("cart");
  return localCart ? JSON.parse(localCart) : [];
};
export const initialState: CartState = {
  guitars: db,
  cart: initialCart(),
};
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case "add-to-cart": {
      const itemExists = state.cart.find(
        (cartItem) => cartItem.id === action.payload.item.id
      );
      let updatedCart: CartItem[] = [];
      if (itemExists) {
        updatedCart = state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.item.id) {
            if (cartItem.qty < MAX_ITEMS)
              return { ...cartItem, qty: cartItem.qty + 1 };
          }
          return cartItem;
        });
      } else {
        const newItem: CartItem = { ...action.payload.item, qty: 1 };
        updatedCart = [...state.cart, newItem];
      }
      return { ...state, cart: updatedCart };
    }
    case "remove-from-cart": {
      const updatedCart = state.cart.filter(
        (i) => i.id !== action.payload.item.id
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "increase-quantity": {
      const updatedCart = state.cart.map((i) =>
        i.id === action.payload.item.id && i.qty < MAX_ITEMS
          ? { ...i, qty: i.qty + 1 }
          : i
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "decrease-quantity": {
      const updatedCart = state.cart.map((i) =>
        i.id === action.payload.item.id && i.qty > MIN_ITEMS
          ? { ...i, qty: i.qty - 1 }
          : i
      );
      return { ...state, cart: updatedCart };
    }
    case "clear-cart":
      return { ...state, cart: [] };

    default:
      return state;
  }
};
