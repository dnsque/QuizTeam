import React from 'react';
import useForm from '../hooks/useForm';
import logo from '../assets/images/logo.png';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useNavigate } from 'react-router-dom';

const getFreshModel = () => ({
    email: '',
    password: ''
});

export default function Login({ setIsLoggedIn, setUserName }) {
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
                    setIsLoggedIn(true);
                    setUserName(res.data.name);
                    navigate('/profile');
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <div className="flex flex-col items-center text-center mb-6">
                    <img src={logo} alt="logo" className="mb-6 w-20" />
                    <h2 className="text-2xl font-semibold text-gray-700">Prisijungimas</h2>
                </div>
                <form noValidate autoComplete="off" onSubmit={login} className="w-full">
                    <div className="mb-5">
                        <label className="block text-left text-sm font-medium text-gray-600">El. paštas</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            className={`mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Įveskite el. paštą"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="block text-left text-sm font-medium text-gray-600">Slaptažodis</label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            className={`mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Įveskite slaptažodį"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    {errors.apiError && <p className="text-red-500 text-sm mb-4">{errors.apiError}</p>}
                    <div className="flex justify-between items-center mt-6">
                        <a href='/register' className="text-blue-500 hover:underline text-sm">Užsiregistruoti</a>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200"
                        >
                            Prisijungti
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
