// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProductManagement from './pages/ProductManagement';
import DataEntry from './pages/DataEntry';
import ProducedPage from './pages/ProducedPage'; // Import

function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-grow p-8 ml-64">
                    <Routes>
                        <Route path="/product-management" element={<ProductManagement />} />
                        <Route path="/data-entry" element={<DataEntry />} />
                        <Route path="/produced" element={<ProducedPage />} />  // Yeni Route
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
