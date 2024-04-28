import React, { useState, useEffect } from 'react';

function ProducedPage() {
    const [searchParams, setSearchParams] = useState({
        productCode: '',
        productionDate: '',
        shift: '',
        department: ''
    });
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // LocalStorage'dan ürün listesini yükle
        const loadedProducts = JSON.parse(localStorage.getItem('producedProducts')) || [];
        setProducts(loadedProducts);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = products.filter(product =>
            (searchParams.productCode ? product.productCode === searchParams.productCode : true) &&
            (searchParams.productionDate ? product.productionDate === searchParams.productionDate : true) &&
            (searchParams.shift ? product.shift === searchParams.shift : true) &&
            (searchParams.department ? product.department === searchParams.department : true)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Üretilen Ürünler</h1>
            <form onSubmit={handleSearch} className="flex flex-wrap justify-start items-center gap-4">
                <input type="text" name="productCode" placeholder="Ürün Kodu" value={searchParams.productCode} onChange={handleChange} />
                <input type="date" name="productionDate" value={searchParams.productionDate} onChange={handleChange} />
                <select name="shift" value={searchParams.shift} onChange={handleChange}>
                    <option value="">Vardiya Seç</option>
                    <option value="gündüz">Gündüz</option>
                    <option value="paşa">Paşa</option>
                    <option value="gece">Gece</option>
                </select>
                <select name="department" value={searchParams.department} onChange={handleChange}>
                    <option value="">Bölüm Seç</option>
                    <option value="fincan_torna">Fincan Torna</option>
                    <option value="tabak_torna">Tabak Torna</option>
                    <option value="izostatik">İzostatik</option>
                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Ara</button>
            </form>
            <div>
                <h2 className="text-lg font-semibold text-gray-700">Filtrelenmiş Ürünler</h2>
                <ul>
                    {filteredProducts.map((product, index) => (
                        <li key={index} className="mb-2 p-2 shadow rounded bg-white">
                            Ürün Adı: {product.productName}, Ürün Kodu: {product.productCode},
                            Üretilen Miktar: {product.producedQuantity}, Vardiya: {product.shift},
                            Üretildiği Tarih: {product.productionDate}, Bölüm: {product.department}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProducedPage;
