import React, { createContext, useState } from "react";
import { Product } from "../components/Store";
interface CtxType {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: Product[];
  setItems: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (data: Product) => void;
  removeFromCart: (id: number) => void;
  decreaseCart: (id: number) => void;
  getTotalPrice: () => number;
}
export const MyCartContext = createContext({} as CtxType);
export default function CartContext({ children }: { children: JSX.Element }) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (data: Product) => {
    const { id } = data;
    let item = items.find((item) => item.id === id);
    if (item !== undefined) {
      setItems((prev) =>
        prev.map((cartItem) => {
          if (cartItem.id === item!.id) {
            const cartCount =
              cartItem.cartCount !== undefined ? cartItem.cartCount + 1 : 1;
            return { ...cartItem, cartCount };
          }
          return cartItem;
        })
      );
    } else {
      setItems((prev) => [...prev, { ...data, cartCount: 1 }]);
    }
  };
  const removeFromCart = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const decreaseCart = (id: number) => {
    setItems((prev) =>
      prev.map((elem) => {
        if (elem.id === id) {
          let newCount = elem.cartCount !== undefined ? elem.cartCount - 1 : 0;
          if (newCount === 0 && elem.cartCount === 1) {
            removeFromCart(id);
          } else {
            return {
              ...elem,
              cartCount: newCount,
            };
          }
        }
        return elem;
      })
    );
  };
  const getTotalPrice = () => {
    let res = items.reduce(
      (acc, cur) =>
        acc + (cur.cartCount !== undefined ? cur.cartCount * cur.price : 0),
      0
    );
    return parseFloat(res.toFixed(3));
  };

  return (
    <MyCartContext.Provider
      value={{
        isOpen,
        setOpen,
        items,
        setItems,
        addToCart,
        removeFromCart,
        decreaseCart,
        getTotalPrice,
      }}
    >
      {children}
    </MyCartContext.Provider>
  );
}
