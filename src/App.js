import React, { lazy, Suspense } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
// Lazy loading components
const Content = lazy(() => import("./Content"));
const LoginPage = lazy(() => import("./LoginPage"));
const ProductList = lazy(() => import("./Products"));
const Cart = lazy(() => import("./Cart"));
const Checkout = lazy(() => import("./Checkout")); // Added Checkout page

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap with CartProvider */}
        <Router>
          <div className="App">
            <Header />
            <Suspense fallback={<h2>Loading...</h2>}>
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
