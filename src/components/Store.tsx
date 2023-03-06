import { useEffect, useState } from "react";
import FakePost from "./FakePost";
import Item from "./Item";

export type Product = {
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

export default function Store(props: {}) {
  const [data, setData] = useState<Product[]>();
  const [filteredData, setfilteredData] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setfilteredData(json);
        });
    } catch (error: any) {
      setError(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  const findItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value.trim();
    if (!str) {
      setfilteredData(data);
    }
    let filtered = data?.filter(
      (item) => item.title.includes(str) || item.description.includes(str)
    );
    if (filtered !== undefined && filtered.length <= 0) {
      setfilteredData(data);
    }
    console.log(filtered);
    setfilteredData(filtered);
  };

  return (
    <div className="mt-20">
      <div className="container mx-auto ">
        <input
          type="text"
          placeholder="Find..."
          className="text-sm p-2 border rounded w-full   sm:w-72 sm:mx-2 c"
          onInput={findItems}
        />
      </div>
      <div className="container mx-auto my-5 flex flex-wrap justify-center gap-5 max-w-7xl">
        {isLoading || error
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => <FakePost key={item} />)
          : filteredData?.map((item) => <Item key={item.id} {...item} />)}
      </div>
    </div>
  );
}
