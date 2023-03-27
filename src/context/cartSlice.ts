import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
  cartCount?: number;
};
type State = {
  items: Product[];
  total: number;
  isOpen: boolean;
};

const storedCart = localStorage.getItem("cart");
const initialState: State = {
  items: storedCart ? JSON.parse(storedCart) : [],
  total: 0,
  isOpen: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state: State, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                cartCount:
                  item.cartCount !== undefined ? item.cartCount + 1 : 1,
              }
            : item
        );
      } else {
        state.items = [...state.items, { ...action.payload, cartCount: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    close: (state: State, action) => {
      state.isOpen = false;
    },
    open: (state: State, action) => {
      state.isOpen = true;
    },
    remove: (state: State, action: PayloadAction<number>) => {
      let items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(items));
      state.items = items;
    },
    decrease: (state: State, action: PayloadAction<number>) => {
      const cartItem = state.items.find((item) => item.id === action.payload);
      if (cartItem) {
        const newItems = state.items.map((item) => {
          if (item.id === cartItem.id) {
            let newCount =
              item.cartCount !== undefined ? item.cartCount - 1 : 0;
            if (newCount <= 1) {
              newCount = 1;
            }
            return {
              ...item,
              cartCount: newCount,
            };
          }
          return item;
        });

        localStorage.setItem("cart", JSON.stringify(newItems));
        state.items = newItems;
      }
    },
    getTotalPrice: (state: State, action) => {
      let res = state.items.reduce(
        (acc, cur) =>
          acc + (cur.cartCount !== undefined ? cur.cartCount * cur.price : 0),
        0
      );
      let total = parseFloat(res.toFixed(3));
      state.total = total;
    },
  },
});
export const { add, open, close, remove, decrease, getTotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
