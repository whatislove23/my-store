import { createStore } from "redux";
import { combineReducers } from "redux";
type Product = {
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

interface CartState {
  items: Product[];
  total: number;
  isOpen: boolean;
}
const storedCart = localStorage.getItem("cart");
const initialState: CartState = {
  items: storedCart ? JSON.parse(storedCart) : [],
  total: 0,
  isOpen: false,
};
enum CartActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
  DECREASE = "DECREASE",
  GET_TOTAL_PRICE = "GET_TOTAL_PRICE",
  CLOSE = "CLOSE",
  OPEN = "OPEN",
}
interface addAction {
  type: typeof CartActionTypes.ADD;
  item: Product;
}
interface closeAction {
  type: typeof CartActionTypes.CLOSE;
}
interface openAction {
  type: typeof CartActionTypes.OPEN;
}
interface decreaseAction {
  type: typeof CartActionTypes.DECREASE;
  id: number;
}

interface removeAction {
  type: typeof CartActionTypes.REMOVE;
  id: number;
}
interface getTotalPriceAction {
  type: typeof CartActionTypes.GET_TOTAL_PRICE;
}

type cartAction =
  | addAction
  | removeAction
  | decreaseAction
  | getTotalPriceAction
  | closeAction
  | openAction;

function CartReduser(state = initialState, action: cartAction) {
  switch (action.type) {
    case CartActionTypes.ADD:
      let item = state.items.find((item) => (item.id = action.item.id));
      if (item !== undefined) {
        let res = state.items.map((cartItem) => {
          if (cartItem.id === action.item.id) {
            const cartCount =
              cartItem.cartCount !== undefined ? cartItem.cartCount + 1 : 1;
            return { ...cartItem, cartCount };
          }
          return cartItem;
        });
        localStorage.setItem("cart", JSON.stringify(res));
        return { ...state, items: res };
      }
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.items, { ...action.item, cartCount: 1 }])
      );
      return {
        ...state,
        items: [...state.items, { ...action.item, cartCount: 1 }],
      };
    case CartActionTypes.REMOVE:
      let items = state.items.filter((item) => item.id !== action.id);
      localStorage.setItem("cart", JSON.stringify(items));
      return { ...state, items };
    case CartActionTypes.DECREASE:
      let cartItem = state.items.find((item) => item.id === action.id);
      if (cartItem !== undefined) {
        let newItems = state.items.map((item) => {
          if (item.id === cartItem!.id) {
            let newCount = item.cartCount !== undefined && item.cartCount - 1;
            if (newCount <= 1) {
              return { ...item, cartCount: 1 };
            }
            return {
              ...item,
              cartCount: newCount,
            };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(newItems));
        return { ...state, items: newItems };
      }
      return state;
    case CartActionTypes.GET_TOTAL_PRICE:
      let res = state.items.reduce(
        (acc, cur) =>
          acc + (cur.cartCount !== undefined ? cur.cartCount * cur.price : 0),
        0
      );
      let total = parseFloat(res.toFixed(3));
      return { ...state, total };
    case CartActionTypes.CLOSE:
      return { ...state, isOpen: false };
    case CartActionTypes.OPEN:
      return { ...state, isOpen: true };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  CartReduser,
});
const store = createStore(rootReducer);

export default store;
