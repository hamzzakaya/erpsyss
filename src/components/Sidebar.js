// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="w-64 h-full bg-gray-800 text-white fixed">
            <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-xl font-semibold">ERP Sistemi</h1>
            </div>
            <ul className="flex flex-col">
                <li className="hover:bg-gray-700">
                    <NavLink
                        to="/product-management"
                        className={({ isActive }) =>
                            isActive ? "block p-4 w-full text-base font-medium bg-gray-700" : "block p-4 w-full text-base font-medium"
                        }
                    >
                        Ürün Yönetimi
                    </NavLink>
                </li>
                <li className="hover:bg-gray-700">
                    <NavLink
                        to="/data-entry"
                        className={({ isActive }) =>
                            isActive ? "block p-4 w-full text-base font-medium bg-gray-700" : "block p-4 w-full text-base font-medium"
                        }
                    >
                        Veri Girişi
                    </NavLink>
                </li>
                <li className="hover:bg-gray-700">
                    <NavLink
                        to="/stock-page"
                        className={({ isActive }) =>
                            isActive ? "block p-4 w-full text-base font-medium bg-gray-700" : "block p-4 w-full text-base font-medium"
                        }
                    >
                        Stoklar
                    </NavLink>
                </li>
                <li className="hover:bg-gray-700">
                <NavLink
                    to="/produced"
                    className={({ isActive }) =>
                        isActive ? "block p-4 w-full text-base font-medium bg-gray-700" : "block p-4 w-full text-base font-medium"
                    }
                >
                    Üretilenler
                </NavLink>
            </li>
            </ul>
        </div>
    );
}

export default Sidebar;
