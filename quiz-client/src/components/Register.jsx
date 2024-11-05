import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import logo from '../assets/images/logo.png';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';

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
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
                <img src={logo} alt="logo" className="w-20 mb-4" />
                <form noValidate autoComplete="on" onSubmit={register} className="w-full">
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="El. paštas"
                            value={values.email}
                            onChange={handleInputChange}
                            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Vardas"
                            value={values.name}
                            onChange={handleInputChange}
                            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Slaptažodis"
                            value={values.password}
                            onChange={handleInputChange}
                            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Patvirtinkite slaptažodį"
                            value={values.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    {serverError && (
                        <p className="text-red-500 text-xs mb-4">{serverError}</p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <Link to="/" className="text-blue-500 text-sm">Atgal</Link>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Užsiregistruoti
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
