import React from 'react';
import logo from '../assets/images/logo.png';

const AuthHeader = () => {
    return (
        <header style={{ 
            backgroundColor: 'transparent',
            position: 'absolute',
        }}>
            <img src={logo} alt="Logo" style={{ height: 93 }} />
            <nav>
                {/* Можно добавить ссылки или логотип */}
            </nav>
        </header>
    );
};

export default AuthHeader;
