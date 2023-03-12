import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Product } from "./Store";
export default function OrderPage({}: {}) {
  const { items, total } = useSelector(
    (state: { CartReduser: { items: Product[]; total: number } }) =>
      state.CartReduser
  );
  function generateID(): string {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNumber}`;
  }
  function addDays(date: Date, days: number): Date {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
  }
  let orderID = generateID();
  let orderDate = new Date();
  let deliveryDate = addDays(orderDate, 4);
  const options = [
    { value: "Visa", label: "Visa" },
    { value: "Mastercard", label: "Mastercard" },
  ];

  const [isvalid, setValid] = useState<boolean>(true);
  const [payment, setPayment] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();
  const onName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const onLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);
  const onPhone = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);
  const onAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);

  useEffect(() => {
    if (
      payment?.trim() &&
      firstName?.trim() &&
      lastName?.trim() &&
      phone?.trim() &&
      address?.trim() &&
      items.length > 0
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
    if (items.length === 0) {
      navigate("/store");
    }
  }, [payment, firstName, lastName, phone, address, items]);

  return (
    <div className="mt-20 flex flex-col items-center ">
      <div className="container flex flex-col">
        <div className="text-lg text-gray-700 self-center ">
          Your order : {orderID}{" "}
        </div>
        <div className="flex justify-around mt-3">
          <div className="text-gray-700  px-2">
            Order date: {orderDate.toDateString()}
          </div>
          <div className="text-green-500  ">
            Estimated delivery date: {deliveryDate.toDateString()}
          </div>
        </div>
      </div>
      <hr className="border border-gray-500 border-b-1 w-full my-2" />
      <div className="container mx-auto mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {items.map((item, index) => (
          <CartItem {...item} key={item.id} />
        ))}
      </div>
      <div className="container mt-4 flex justify-around  text-lg text-gray-700 flex-wrap-reverse">
        <div className="self-star mt-2 ">
          Total price {total} $
          <div className="flex flex-col gap-2">
            <Select
              onChange={(payment) => setPayment(payment?.value)}
              className="w-64 mt-3 text-sm "
              options={options}
              placeholder="Payment method"
            />
            <button
              className="bg-green-700 p-1 rounded text-white text-lg disabled:bg-gray-400"
              disabled={isvalid}
            >
              Pay
            </button>
          </div>
        </div>
        <div className="w-72">
          <div className="text-center">Contact information</div>
          <form action="post" className="mt-3">
            <div className="flex gap-2 mb-2">
              <input
                value={firstName}
                onInput={onName}
                type="text"
                placeholder="First name"
                className="text-sm p-2 border rounded w-full"
              />
              <input
                value={lastName}
                onInput={onLastName}
                type="text"
                placeholder="Last name"
                className="text-sm p-2 border rounded w-full"
              />
            </div>
            <input
              value={phone}
              onInput={onPhone}
              type="phone"
              className="text-sm p-2 border rounded w-full mb-2 "
              placeholder="Phone"
            />
            <input
              value={address}
              onInput={onAddress}
              type="text"
              placeholder="Delivery address"
              className="text-sm p-2 border rounded w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
