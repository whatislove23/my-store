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
      fetch("https://fakestoreapi.com/products/")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setfilteredData(json);
          setIsLoading(false);
        });
    } catch (error: any) {
      setIsLoading(true);
      setError(error);
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
    setfilteredData(filtered);
  };

  return (
    <div className="mt-20">
      <div className="container mx-auto flex flex-wrap  justify-center lg:justify-start  max-w-7xl items-start ">
        <input
          type="text"
          placeholder="Find..."
          className="text-sm p-2 border rounded w-full mx-2 lg:w-72"
          onInput={findItems}
        />
      </div>
      <div className="container mx-auto my-5 flex flex-wrap justify-center gap-5 max-w-7xl items-start">
        {isLoading || error || data?.length === 0
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => <FakePost key={item} />)
          : filteredData?.map((item) => <Item key={item.id} {...item} />)}
      </div>
    </div>
  );
}
