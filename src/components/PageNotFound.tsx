import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="container mx-auto h-screen text-center pt-10 flex items-center justify-center text-gray-800">
        <div className="text-xl flex flex-col">
          <div className="text-9xl ">404</div>
          Ooops seems the page not found...
          <button className="m-5 p-2 bg-yellow-300 rounded-md hover:-translate-y-1 transition-all duration-300">
            <Link to="/">Return to the home page</Link>
          </button>
        </div>
      </div>
    </>
  );
}
