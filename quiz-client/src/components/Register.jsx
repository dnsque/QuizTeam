import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import InputField from './InputField';

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
    setServerError("");

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
    <div className="flex justify-center items-start min-h-screen">
    <div className="w-4/12 items-center"></div>
    <div className="bg-white shadow-lg rounded-s-3xl p-36 min-h-screen w-8/12 space-y-40">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-4xl font-semibold text-gray-700">
        Sukurti paskyrą
        </h2>
      </div>
      <form noValidate autoComplete="off" onSubmit={register} className="w-full">
        <div className="mb-5">
          <InputField
            label="El. paštas"
            name="email"
            type="email"
            placeholder="El. paštas"
            value={values.email}
            onChange={handleInputChange}
            errorMessage={errors.email}
          />
          </div>
          <div className="mb-5">
          <InputField
            label="Vardas"
            name="name"
            type="text"
            placeholder="Vardas"
            value={values.name}
            onChange={handleInputChange}
            errorMessage={errors.name}
          />
          </div>
          <InputField
            label="Slaptažodis"
            name="password"
            type="password"
            placeholder="Slaptažodis"
            value={values.password}
            onChange={handleInputChange}
            errorMessage={errors.password}
          />
          <InputField
            label="Patvirtinkite slaptažodį"
            name="confirmPassword"
            type="password"
            placeholder="Patvirtinkite slaptažodį"
            value={values.confirmPassword}
            onChange={handleInputChange}
            errorMessage={errors.confirmPassword}
          />
          {serverError && (
            <p className="text-red-500 text-xs mb-4">{serverError}</p>
          )}
           <div className="flex justify-between items-center mt-12">
            <button
              type="submit"
              className="bg-orange-400 text-white font-semibold py-2 p-12 rounded-lg transition duration-200 w-full"
            >
              Užsiregistruoti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
