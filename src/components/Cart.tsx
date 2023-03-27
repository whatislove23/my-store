import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../context/hook";
import { close, getTotalPrice } from "../context/cartSlice";
export default function Cart(props: {}) {
  const { items, total, isOpen } = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  useEffect(() => {
    dispatch(getTotalPrice(1));
  }, []);
  return (
    <>
      {isOpen ? (
        <div
          onClick={() => {
            dispatch(close(1));
          }}
          className="backdrop-blur h-screen bg-gray-800 w-screen top-0 right-0 fixed z-30 flex justify-end bg-opacity-60 hover:cursor-pointer"
        >
          <div
            className="w-full lg:w-96 sm:w-80 bg-gray-50 text-2xl p-2 text-gray-600 hover:cursor-default flex flex-col "
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" flex align-center justify-between">
              <div>Your cart</div>
              <button
                onClick={() => {
                  dispatch(close(1));
                }}
                className="text-3xl"
              >
                &#215;
              </button>{" "}
            </div>
            <div className=" overflow-x-auto h-5/6 rounded">
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
            <div className="mt-2 text-lg">
              {items.length > 0
                ? `Total price: ${total} $`
                : "Your cart is empty"}
            </div>
            {items.length > 0 && (
              <Link
                to="/order"
                className="mb-20 mt-2 bg-green-600 text-white p-2 rounded shadow-lg text-center"
                onClick={() => {
                  dispatch(close(1));
                }}
              >
                Make an order
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
