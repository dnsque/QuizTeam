import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent } from '@mui/material';

export default function AboutPage() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => setTabIndex(newValue);

    const tabContent = [
        "„QuizTeam“ įkūrė grupė viktorinų entuziastų, tikinčių, kad žinios turi būti prieinamos, interaktyvios ir įdomios. Aistringai siekiame kurti bendruomenę, kurioje smalsumas ir linksmybės susijungia. Kiekviena mūsų platformos viktorina sukurta taip, kad linksmintų, šviestų ir įkvėptų įvairaus amžiaus ir pomėgių žaidėjus.",
        "Kuriame įvairių temų viktorinas, suburiančias bendruomenes konkuruoti ir mokytis kartu.",
        "Mūsų vertybės yra įtrauktis, kūrybiškumas ir smalsumas.",
        "Prisijunkite prie „QuizTeam“ bendruomenės ir pradėkite dalintis savo viktorinomis su draugais!"
    ];
    return (
        <Box sx={{ padding: 4, textAlign: 'center', color: 'white' }}>
        <Typography variant="h4" gutterBottom>Apie mus – QuizTeam</Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 600, margin: '0 auto' }}>
            Sveiki atvykę į „QuizTeam“ – geriausią platformą viktorinoms kurti, dalytis ir žaisti! Mūsų misija paprasta: viktorinų galia leidžia sklandžiai sujungti mokymąsi ir pramogą. Nesvarbu, ar norite mesti iššūkį draugams, patobulinti savo žinias, ar tiesiog smagiai praleisti laiką, „QuizTeam“ turi ką pasiūlyti kiekvienam.
        </Typography>

            { }
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                centered
                sx={{
                    marginBottom: 3,
                    '& .MuiTab-root': { color: 'white', fontWeight: 'bold' },
                    '& .Mui-selected': { color: '#0A6972 !important' },
                    '& .MuiTabs-indicator': { backgroundColor: '#0A6972' }
                }}
            >
            <Tab label="Kas mes?" />
            <Tab label="Ką darome?" />
            <Tab label="Mūsų vertybės" />
            <Tab label="Prisijunkite!" />
        </Tabs>

            {/* Контент вкладок */}
            <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <CardContent>
                    <Typography variant="body1">{tabContent[tabIndex]}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}