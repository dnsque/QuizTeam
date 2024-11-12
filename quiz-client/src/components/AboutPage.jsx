import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent } from '@mui/material';

export default function AboutPage() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => setTabIndex(newValue);

    const tabContent = [
        "QuizTeam was founded by a group of quiz enthusiasts who believe that knowledge should be accessible, interactive, and engaging.",
        "We create quizzes on various topics, bringing communities together to compete and learn.",
        "Our values focus on inclusivity, creativity, and curiosity.",
        "Join the QuizTeam Community and start sharing your quizzes with friends!"
    ];

    return (
        <Box sx={{ padding: 4, textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(45deg, #ff8a00, #e52e71)', color: 'white' }}>
            <Typography variant="h4" gutterBottom>About Us – QuizTeam</Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: 600, margin: '0 auto' }}>
                Welcome to QuizTeam – your ultimate platform for creating, sharing, and playing quizzes!
                Our mission is simple: to make learning and entertainment seamlessly blend through the power of quizzes.
            </Typography>

            { }
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                centered
                sx={{
                    marginBottom: 3,
                    '& .MuiTab-root': { color: 'white', fontWeight: 'bold' },
                    '& .Mui-selected': { color: '#ff8a00' }
                }}
            >
                <Tab label="Who We Are" />
                <Tab label="What We Do" />
                <Tab label="Our Values" />
                <Tab label="Join Us" />
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