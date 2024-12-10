import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',               // Automatically adjust margin to push footer down
                color: 'black',           // Text color
                textAlign: 'center',      // Center align text
                padding: 2,               // Padding for the footer
                position: 'relative',      // Ensure relative positioning
                bottom: 0,                // Stick to the bottom
                width: '100%',            // Full width
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} QuizTeam. Visos teisės saugomos.
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
                    Privatumo politika
                </Link>
                <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
                    Naudojimo sąlygos
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
