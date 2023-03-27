import "./App.css";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import Store from "./components/Store";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OrderPage from "./components/OrderPage";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import newStore from "./context/newStore";
function App() {
  return (
    <div className="App  ">
      <Provider store={newStore}>
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
      </Provider>
    </div>
  );
}

export default App;
