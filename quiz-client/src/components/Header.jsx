import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = ({ isLoggedIn, onLogout, name }) => {
  return (
    <header>
      <div className="p-4 flex justify-between items-center w-full">
        {/* Логотип */}
        <div className="w-1/4">        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-24 p-2" />
        </a></div>

        {/* Навигация */}
        <div className="w-1/2">
        <nav className="flex gap-x-5 justify-center">
          <Link
            to="/quiz-list"
            className="hover:text-blue-200 transition"
          >
            Pradėti quizą
          </Link>
          <Link
            to="/make-quiz"
            className="hover:text-blue-200 transition"
          >
            Sukurti quizą
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-200 transition"
          >
            Apie QuizTeam
          </Link>
          <Link
            to="/contacts"
            className="hover:text-blue-200 transition"
          >
            Kontaktai
          </Link>
          {isLoggedIn && (
            <Link
              to="/profile"
              className="hover:text-blue-200 transition"
            >
              {name}
            </Link>
            
          )}
        </nav>
        </div>
        {/* Кнопки авторизации */}
        <div className="flex space-x-4 w-1/4 justify-end">
  {isLoggedIn ? (
    // Кнопка выхода
    <button
      onClick={onLogout}
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition"
    >
      Išeiti
    </button>
  ) : (
    // Ссылки для входа и регистрации
    <>
      <Link
        to="/login"
        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition"
      >
        Prisijungti
      </Link>
      <Link
        to="/register"
        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition"
      >
        Užsiregistruoti
      </Link>
    </>
  )}
</div>

      </div>
    </header>
  );
};

export default Header;
