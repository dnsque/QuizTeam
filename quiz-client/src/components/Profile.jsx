import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id } = useParams();  // ID from URL
    const [userData, setUserData] = useState({});
    const [avatar, setAvatar] = useState(null);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Card sx={{ width: '80%', maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Profilis
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            src={avatar || userData.avatar}
                            sx={{ width: 100, height: 100, mb: 2 }}
                        />
                        <input
                            accept="image/*"
                            id="upload-avatar"
                            type="file"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload-avatar">
                            <Button variant="outlined" component="span">
                                Keisti Avatarą
                            </Button>
                        </label>
                    </Box>
                    <Box mt={3}>
                        <Typography variant="h5">Profilio Quiz’ai:</Typography>
                        {userData.quizzes?.length > 0 ? (
                            userData.quizzes.map((quiz) => (
                                <Typography key={quiz.id} variant="body1">
                                    {quiz.title}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2">Nėra Quiz’ų</Typography>
                        )}
                    </Box>
                    <Box mt={3}>
                        <Typography variant="h5">Atsakyti Quiz’ai:</Typography>
                        {userData.answeredQuizzes?.length > 0 ? (
                            userData.answeredQuizzes.map((quiz) => (
                                <Typography key={quiz.id} variant="body1">
                                    {quiz.title}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2">Nėra atsakytų Quiz’ų</Typography>
                        )}
                    </Box>
                    </CardContent>
                    </Card >
                    </Box>
    );}
