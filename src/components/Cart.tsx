import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "./Store";
import { useEffect } from "react";

export default function Cart(props: {}) {
  const dispatch = useDispatch();
  const { items, total, isOpen } = useSelector(
    (state: {
      CartReduser: { items: Product[]; total: number; isOpen: boolean };
    }) => state.CartReduser
  );
  const close = () => {
    dispatch({ type: "CLOSE" });
  };
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  useEffect(() => {
    dispatch({ type: "GET_TOTAL_PRICE" });
  }, []);
  return (
    <>
      {isOpen ? (
        <div
          onClick={() => {
            close();
          }}
          className="backdrop-blur h-screen bg-gray-800 w-screen top-0 right-0 fixed z-30 flex justify-end bg-opacity-60 hover:cursor-pointer"
        >
          <div
            className="w-full lg:w-96 sm:w-80 bg-gray-50 text-2xl p-2 text-gray-600 hover:cursor-default flex flex-col "
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" flex align-center justify-between">
              <div>Your cart</div>
              <button onClick={close} className="text-3xl">
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
                onClick={close}
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
