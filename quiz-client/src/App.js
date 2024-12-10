import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Login, Register, Profile, HomePage, AuthHeader, Header, Footer, QuizPage, AboutPage, QuizList } from './components';
import './index.css';

export const AppContext = createContext();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setUserName] = useState('');

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedName = localStorage.getItem('name');
        setIsLoggedIn(!!token);
        setUserName(storedName || '');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setIsLoggedIn(false);
        setUserName('');
    };

    const isAuthPage = /^\/(login|register)$/.test(location.pathname);

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background:'linear-gradient(90deg, rgba(220,121,116,1) 0%, rgba(226,130,125,1) 26%, rgba(216,108,108,1) 61%, rgba(212,105,95,1) 77%, rgba(220,116,105,1) 100%)' }}>
                {isAuthPage ? (
                    <AuthHeader />
                ) : (
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} name={name} />
                )}
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/quiz-list" element={<QuizList />} />
                        <Route path="/quiz/:id" element={<QuizPage />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                {!isAuthPage && <Footer />}
            </div>
        </AppContext.Provider>
    );
};

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AppContext);
    return isLoggedIn ? children : <Navigate to="/login" />;
};

const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;
