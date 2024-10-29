import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = ({ isLoggedIn, onLogout, name }) => { // Accept name as a prop
    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
                    <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
                        Pagrindinis
                    </Typography>
                    <Button component={Link} to="/about" sx={{ color: 'white', marginLeft: 2 }}>
                        Apie mus
                    </Button>
                    {isLoggedIn && (
                        <Button component={Link} to="/profile" sx={{ color: 'white', marginLeft: 2 }}>
                            {name}
                        </Button>
                    )}
                </Box>
                <Box>
                    {isLoggedIn ? (
                        <Button onClick={onLogout} sx={{ color: 'white', marginLeft: 2 }}>
                            Išeiti
                        </Button>
                    ) : (
                        <Button component={Link} to="/login" sx={{ color: 'white', marginLeft: 2 }}>
                            Prisijungti
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
