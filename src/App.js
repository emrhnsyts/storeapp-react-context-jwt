import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category/Category";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="categories/:categoryId" element={<Category />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter >
  );
}

export default App;
