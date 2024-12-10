import React from 'react';
import logo from '../assets/images/logo.png';
import { Link, useLocation } from "react-router-dom";

const AuthHeader = () => {
    const location = useLocation();

    // Проверяем текущий путь
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    return (
        <header>
            <div className="p-4 flex justify-between items-center absolute w-full">
                {/* Логотип */}
                <a href="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="w-24 p-2" />
                </a>

                {/* Кнопки авторизации */}
                <div className="flex space-x-4">
                    {isLoginPage && (
                        <Link
                            to="/register"
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition"
                        >
                            Užsiregistruoti
                        </Link>
                    )}
                    {isRegisterPage && (
                        <Link
                            to="/login"
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition"
                        >
                            Prisijungti
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AuthHeader;
