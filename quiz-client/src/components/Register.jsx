import React, { useState } from 'react';
import { Button, TextField, Box, Card, CardContent, Link, Typography } from '@mui/material';
import Center from './Center';
import useForm from '../hooks/useForm';
import logo from '../assets/images/logo.png';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const getFreshModel = () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

export default function Register() {
    const { context, setContext } = useStateContext();
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const register = (e) => {
        e.preventDefault();
        setServerError(""); // Clear previous server error
    
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.auth)
                .post(values)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    setContext({ Id: res.data.Id });
                    navigate(`/profile`);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        const message = err.response.data.message;
                        if (message === "Email jau yra naudojamas.") {
                            setErrors(prevErrors => ({ ...prevErrors, email: message }));
                        } else if (message === "Vardas jau yra naudojamas.") {
                            setErrors(prevErrors => ({ ...prevErrors, name: message }));
                        } else {
                            setServerError("Netinkamas prašymas. Patikrinkite įvesties duomenis.");
                        }
                    } else {
                        console.error("Klaida registruojantis:", err);
                        setServerError("Nepavyko užsiregistruoti. Bandykite dar kartą.");
                    }
                });
        }
    };
    
    const validate = () => {
        let temp = {};
        temp.email = values.email
            ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
                ? ""
                : "Neteisingas el. pašto formatas."
            : "Šis laukas yra privalomas.";
        temp.name = values.name ? "" : "Šis laukas yra privalomas.";
        temp.password = values.password ? "" : "Šis laukas yra privalomas.";
        temp.confirmPassword = values.confirmPassword ? "" : "Slaptažodžio patvirtinimas yra būtinas.";

        if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
            temp.confirmPassword = "Slaptažodžiai nesutampa";
        }

        setErrors(temp);
        return Object.values(temp).every((x) => x === "");
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
                        <form noValidate autoComplete="on" onSubmit={register}>
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
                                label="Vardas"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                variant="standard"
                                {...(errors.name && { error: true, helperText: errors.name })}
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
                            <TextField
                                label="Patvirtinkite slaptažodį"
                                name="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleInputChange}
                                variant="standard"
                                {...(errors.confirmPassword && { error: true, helperText: errors.confirmPassword })}
                            />
                            {serverError && (
                                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                    {serverError}
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
                                <Link href='/' sx={{ marginRight: 1 }}>
                                    Atgal
                                </Link>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="medium"
                                >
                                    Užsiregistruoti
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    );
}
