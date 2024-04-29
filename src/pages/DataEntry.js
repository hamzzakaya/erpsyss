import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function DataEntry() {
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    producedQuantity: "",
    scrap: "",
    grossTotal: "",
    shift: "",
    productionDate: "",
    productStatus: "",
    department: "",
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/get-products")
      .then((response) => {
        console.log("response", response);
        const newOptions = response.data.documents.map((doc) => ({
          value: doc.product_code,
          label: `${doc.product_name} `,
        }));
        console.log(newOptions);
        setOptions(newOptions);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSaveProducts = () => {
    // Stok hesaplamaları yapılacak sayfaya yönlendirme
    // Örneğin React Router kullanarak /stock-page sayfasına yönlendirme yapılabilir
    // Burada stok hesaplamaları ve durumları gösterilecek
    // Bu örnekte basit bir log işlemi yapılacak
    console.log("Ürünler kaydedildi:", productList);
    // Ürün listesini temizleme veya ilgili işlemler yapılabilir
    setProductList([]);
  };
  function formatDepartment(department) {
    return department
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const [productList, setProductList] = useState([]);

  // Ürün listesini localStorage'dan yükleyin
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === "productCode") {
        const product = products.find((p) => p.productCode === value);
        newFormData.productName = product ? product.productName : "";
      } else if (name === "productName") {
        const product = products.find((p) => p.productName === value);
        newFormData.productCode = product ? product.productCode : "";
      }

      if (name === "producedQuantity" || name === "scrap") {
        const producedQuantity =
          parseInt(newFormData.producedQuantity, 10) || 0;
        const scrap = parseInt(newFormData.scrap, 10) || 0;
        newFormData.grossTotal = (producedQuantity + scrap).toString();
      }

      return newFormData;
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProductList([...productList, formData]); // Ürün listesine yeni ürün ekleyin
    // Sadece bazı alanları sıfırla, diğerlerini koru
    setFormData((prevFormData) => ({
      ...prevFormData,
      productName: "", // Ürün adını sıfırla
      productCode: "", // Ürün kodunu sıfırla
      producedQuantity: "", // Üretilen miktarı sıfırla
      scrap: "", // Zayiatı sıfırla
      grossTotal: "", // Brüt/Toplam değerini sıfırla
      // Vardiya, Üretim Tarihi ve Durum değerlerini koru
      // shift, productionDate, productStatus değerleri sabit kalacak
      department: "",
    }));
  };

  const handleRemoveProduct = (index) => {
    setProductList((currentList) => currentList.filter((_, i) => i !== index));
  };

  const handleProductsSave = () => {
    localStorage.setItem("producedProducts", JSON.stringify(productList));
    console.log("Ürünler kaydedildi:", productList);
    setProductList([]);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Veri Girişleri</h1>
      <form
        onSubmit={handleAddProduct}
        className="flex flex-wrap justify-start items-center gap-4"
      >
        <div>
          <Select
            onChange={(e) => {
              console.log(e);
              setFormData({
                ...formData,
                productCode: e.value,
                productName: e.label,
              });
            }}
            options={options}
          />
        </div>
        <input
          type="number"
          name="producedQuantity"
          placeholder="Üretilen Miktar"
          value={formData.producedQuantity}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/6 p-2 rounded border"
        />
        <input
          type="number"
          name="scrap"
          placeholder="Zayiat"
          value={formData.scrap}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/6 p-2 rounded border"
        />
        <input
          type="text"
          name="grossTotal"
          placeholder="Brüt/Toplam"
          value={formData.grossTotal}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/6 p-2 rounded border"
        />

        <select
          name="shift"
          value={formData.shift}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/12 p-2 rounded border"
        >
          <option value="">Vardiya Seç</option>
          <option value="gündüz">Gündüz</option>
          <option value="paşa">Paşa</option>
          <option value="gece">Gece</option>
        </select>
        <input
          type="date"
          name="productionDate"
          value={formData.productionDate}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/6 p-2 rounded border"
        />
        <select
          name="productStatus"
          value={formData.productStatus}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/12 p-2 rounded border"
        >
          <option value="">Durum</option>
          <option value="ham ürün">Ham Ürün</option>
          <option value="bisküvi ürün">Bisküvi Ürün</option>
        </select>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="flex-grow min-w-0 w-1/6 p-2 rounded border"
        >
          <option value="">Bölüm Seç</option>
          <option value="fincan_torna">Fincan Torna</option>
          <option value="tabak_torna">Tabak Torna</option>
          <option value="izostatik">İzostatik</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
        >
          Ekle
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-700">Eklenen Ürünler</h2>
        <ul>
          {productList.map((product, index) => (
            <li key={index} className="mb-2 p-2 shadow rounded bg-white">
              Ürün Adı: {product.productName}, Ürün Kodu: {product.productCode},
              Üretilen Miktar: {product.producedQuantity}, Zayiat:{" "}
              {product.scrap}, Brüt/Toplam: {product.grossTotal}, Vardiya:{" "}
              {product.shift}, Üretildiği Tarih: {product.productionDate}, Ürün
              Durumu: {product.productStatus}, Bölüm:{" "}
              {formatDepartment(product.department)}
              <button
                onClick={() => handleRemoveProduct(index)}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleProductsSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

export default DataEntry;

// axios.get(http://localhost:8080/get-products)
// .then(response => {
//   const product = response;
//
//   setTemperature(temperatureCelsius.toFixed(0));
// })
// .catch(error => {
//   console.log(error);
//   setTemperature('Hava durumu bilgileri alınamadı.');
// });
// };
