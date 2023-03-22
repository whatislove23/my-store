import { Link } from "react-router-dom";

export default function Home(props: {}) {
  return (
    <div className="mt-20 ">
      <div className="container mx-auto flex flex-col justify-between items-center gap-20  ">
        <h1 className="text-3xl sm:text-4xl uppercase font-bold text-gray-600 text-center">
          Welcome to our store
        </h1>
        <img
          src="https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg"
          alt=""
          className="mix-blend-multiply h-96"
        />

        <Link
          className="p-4 w-80 bg-purple-500 text-lg rounded shadow-lg text-white hover:animate-pulse text-center"
          to="/store"
        >
          Start shopping
        </Link>
      </div>
    </div>
  );
}
