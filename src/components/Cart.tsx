import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyCartContext } from "../context/CartContext";
import CartItem from "./CartItem";

export default function Cart(props: {}) {
  const { isOpen, setOpen, items, getTotalPrice } = useContext(MyCartContext);
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  return (
    <>
      {isOpen ? (
        <div
          onClick={() => {
            setOpen(false);
          }}
          className="backdrop-blur h-screen bg-gray-800 w-screen top-0 right-0 fixed z-30 flex justify-end bg-opacity-60 hover:cursor-pointer"
        >
          <div
            className="w-full lg:w-96 sm:w-80 bg-gray-50 text-2xl p-2 text-gray-600 hover:cursor-default flex flex-col "
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" flex align-center justify-between">
              <div>Your cart</div>
              <button onClick={() => setOpen(false)} className="text-3xl">
                &#215;
              </button>{" "}
            </div>
            <div className=" overflow-x-auto h-5/6 rounded">
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
            <div className="mt-2 text-lg">Total price: {getTotalPrice()} $</div>
            {items.length > 0 && (
              <Link
                to="/order"
                className="mb-20 mt-2 bg-green-600 text-white p-2 rounded shadow-lg text-center"
                onClick={() => setOpen(false)}
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
