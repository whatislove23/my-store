import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Store from "./components/Store";
import CartContext from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import OrderPage from "./components/OrderPage";
import { Provider } from "react-redux";
import store from "./context/store";
function App() {
  return (
    <div className="App  ">
      <Provider store={store}>
        <CartContext>
          <BrowserRouter basename="/my-store">
            <Cart />
            <div className="flex flex-col justify-between h-screen">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Footer />
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
              theme="light"
            />
          </BrowserRouter>
        </CartContext>
      </Provider>
    </div>
  );
}

export default App;
