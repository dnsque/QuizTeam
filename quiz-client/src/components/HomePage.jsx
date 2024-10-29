import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api';

export default function HomePage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await createAPIEndpoint(ENDPOINTS.quizzes).fetchAll();
                setQuizzes(res.data);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError("Nepavyko gauti quiz'ų. Bandykite dar kartą vėliau.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) return <Typography variant="h6">Kraunama...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Quiz’ai
            </Typography>
            {quizzes.length === 0 ? (
                <Typography variant="h6" align="center">
                    Nėra quiz’ų
                </Typography>
            ) : (
                quizzes.map((quiz) => (
                    <Card key={quiz.id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{quiz.title}</Typography>
                            <Typography variant="body2">{quiz.description}</Typography>
                            <Link to={`/quizzes/${quiz.id}`}>
                                <Button variant="contained" sx={{ marginTop: 1 }}>
                                    Pradėti
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}
