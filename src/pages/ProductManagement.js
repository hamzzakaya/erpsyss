// src/pages/ProductManagement.js
import React, { useState, useEffect } from "react";
import Select from "react-select";

function ProductManagement() {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "chocolate", label: "Chocolate 12312s1212s" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !productCode) {
      alert("Her iki alan da doldurulmalıdır.");
      return;
    }
    const newProduct = { productName, productCode };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setProductName("");
    setProductCode("");
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4 text-blue-700">
        Ürün Tanımlama
      </h1>
      <form onSubmit={handleAddProduct}>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ürün Adı
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ürün Kodu
          </label>
          <input
            type="text"
            id="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="App">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ürün Ekle
        </button>
      </form>
    </div>
  );
}

export default ProductManagement;
