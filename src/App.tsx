import React from "react";
import "./App.css";

import { Header } from "@components/Header";
import { ProductPage } from "@pages/ProductPage";
import { ProductsPage } from "@pages/ProductsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
