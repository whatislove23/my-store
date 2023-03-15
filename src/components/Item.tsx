import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Product } from "./Store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
export default function Item({
  id,
  image,
  description,
  title,
  rating,
  price,
}: Product) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const onBtnClic = (): void => setOpen((prev) => !prev);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch({
      type: "ADD",
      item: { id, image, description, title, rating, price },
    });
    dispatch({ type: "GET_TOTAL_PRICE" });
  };
  return (
    <div
      className=" container mx-2 sm:w-full md:w-72  bg-white shadow-md rounded p-2 pb-4 flex
    flex-col justify-between height "
    >
      <div>
        <div className="p-2 h-64 overflow-hidden ">
          <img
            src={image}
            alt={title}
            className="object-contain h-full w-full rounded  transform ease-in-out hover:scale-105 hover:duration-200 duration-200 "
          />
        </div>
        <div>
          <div className="">{title}</div>
          <div className="text-gray-500">{price} $</div>
        </div>
      </div>
      <div className=" felx-col  items-start">
        <div className="flex justify-between items-center">
          <button
            onClick={onBtnClic}
            className="flex items-center justify-between focus:outline-none"
          >
            <svg
              className={`w-7 h-7 transform duration-100  ${
                isOpen && " ease-in duration-200 -rotate-90"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <button
            className="flex items-center px-2"
            onClick={() => {
              addToCart();
              toast.success("Added to cart!");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-cart-plus"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />{" "}
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{" "}
            </svg>
          </button>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="border-t border-gray-300 p-2 mt-2 ">
            <p className="text-gray-700 text-justify overflow-hidden">
              {description}
            </p>
          </div>
        </Transition>
      </div>
    </div>
  );
}
