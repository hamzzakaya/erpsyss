// src/pages/StockPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function StockPage() {
    const location = useLocation();
    const productList = location.state?.productList || [];

    // Ürünleri durumlarına göre gruplama
    const productsByStatus = productList.reduce((acc, product) => {
        const { productStatus } = product;
        if (!acc[productStatus]) {
            acc[productStatus] = [];
        }
        acc[productStatus].push(product);
        return acc;
    }, {});

    return (
        <div>
            <h1>Stok Durumu</h1>
            {Object.entries(productsByStatus).map(([status, products]) => (
                <div key={status}>
                    <h2>{status} Ürünler</h2>
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                Ürün Adı: {product.productName}, Ürün Kodu: {product.productCode},
                                Üretilen Miktar: {product.producedQuantity}, Zayiat: {product.scrap},
                                Brüt/Toplam: {product.grossTotal}, Vardiya: {product.shift},
                                Üretildiği Tarih: {product.productionDate}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default StockPage;

