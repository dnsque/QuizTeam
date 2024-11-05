import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Login, Register, Profile, HomePage, AuthHeader, Header, Footer, ProtectedRoute } from './components';
import './index.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setUserName] = useState('');
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        setIsLoggedIn(!!token);
        setUserName(name || '');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setIsLoggedIn(false);
        setUserName('');
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {isAuthPage ? (
                <AuthHeader />
            ) : (
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} name={name} />
            )}
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
                    <Route path="/register" element={<Register />} />
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
            {/* Conditionally render the footer */}
            {!isAuthPage && <Footer />}
        </div>
    );
}

// Wrap the App in Router
const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;
