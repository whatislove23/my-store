import { add, decrease, getTotalPrice, remove } from "../context/store";
import { Product } from "./Store";
export default function CartItem(all: Product) {
  const { id, title, image, price, cartCount }: Product = all;
  const addToCart = () => {
    add(all);
    getTotalPrice();
  };
  const removeFromCart = () => {
    remove({ id });
    getTotalPrice();
  };
  const decreaseCart = () => {
    decrease(id);
    getTotalPrice();
  };
  return (
    <div className="bg-white w-100 rounded shadow flex p-2 flex mt-2 items-center justify-center">
      <button
        onClick={() => removeFromCart()}
        className="bg-red-500  rounded-full text-white text-sm p-1 text-xl h-full"
      >
        &#215;
      </button>
      <div className=" overflow-hidden w-48 h-24 ">
        <img
          className="p-2 object-contain w-48 h-24 "
          src={image}
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-between w-40">
        <div className="text-sm text-gray-800">{title} </div>
        <div className="flex gap-2 items-center text-sm w-100 justify-between">
          <button
            onClick={() => decreaseCart()}
            className="text-gray-700 p-1 rounded border transition duration-200 hover:bg-blue-600 hover:text-white hover:duration-300"
          >
            -
          </button>
          {price}$ &#215; {cartCount}
          <button
            onClick={() => addToCart()}
            className="text-gray-700 p-1 rounded border transition duration-200 hover:bg-blue-600 hover:text-white hover:duration-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
