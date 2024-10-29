import React from 'react';
import { Button, TextField, Box, Card, CardContent, Link } from '@mui/material';
import Center from './Center';
import useForm from '../hooks/useForm';
import logo from '../assets/images/logo.png';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const getFreshModel = () => ({
    email: '',
    password: ''
});

export default function Login({ setIsLoggedIn, setUserName }) { // Accept setUserName as a prop
    const { values, setValues, errors, setErrors, handleInputChange } = useForm(getFreshModel);
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.auth + '/login')
                .post(values)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("name", res.data.name);
                    setIsLoggedIn(true); // Update login state
                    setUserName(res.data.name); // Set the user's name
                    navigate('/profile'); // Redirect to /profile on successful login
                })
                .catch((err) => {
                    console.log(err);
                    setErrors({ apiError: "Prisijungti nepavyko. Bandykite dar kartą." });
                });
        }
    };

    const validate = () => {
        let temp = {};
        temp.email = values.email ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "" : "Neteisingas el. pašto formatas.") : "Šis laukas yra privalomas.";
        temp.password = values.password ? "" : "Šis laukas yra privalomas.";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    return (
        <Center>
            <Card sx={{ width: 300 }}>
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection={'column'}
                        textAlign={'center'}
                        sx={{
                            '& .MuiTextField-root': {
                                m: 1,
                                width: '90%'
                            }
                        }}>
                        <img src={logo} alt="logo" />
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="El. paštas"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="standard"
                                {...(errors.email && { error: true, helperText: errors.email })}
                            />
                            <TextField
                                label="Slaptažodis"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="standard"
                                {...(errors.password && { error: true, helperText: errors.password })}
                            />
                            {errors.apiError && <p style={{ color: 'red' }}>{errors.apiError}</p>}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
                                <Link href='/register' sx={{ marginRight: 1 }}>
                                    Užsiregistruoti
                                </Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="medium"
                                >
                                    Prisijungti
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}
