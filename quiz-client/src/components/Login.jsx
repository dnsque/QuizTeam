import React from "react";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

// Default form model
const getFreshModel = () => ({
  email: "",
  password: "",
});

export default function Login({ setIsLoggedIn, setUserName }) {
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(getFreshModel);
  const navigate = useNavigate();

  // Login function
  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.auth + "/login")
        .post(values)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
          setIsLoggedIn(true);
          setUserName(res.data.name);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
          setErrors({ apiError: "Prisijungti nepavyko. Bandykite dar kartą." });
        });
    }
  };

  // Validation function
  const validate = () => {
    let temp = {};
    temp.email = values.email
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ? ""
        : "Neteisingas el. pašto formatas."
      : "Šis laukas yra privalomas.";
    temp.password = values.password ? "" : "Šis laukas yra privalomas.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="w-4/12 items-center"></div>
      <div className="bg-white shadow-lg rounded-s-3xl p-36 min-h-screen w-8/12 space-y-40">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-semibold text-gray-700">
            Prisijungti prie paskyros
          </h2>
        </div>
        <form noValidate autoComplete="off" onSubmit={login} className="w-full">
          <div className="mb-5">
            <InputField
              label="El. paštas"
              name="email"
              type="email"
              placeholder="Įveskite el. paštą"
              value={values.email}
              onChange={handleInputChange}
              errorMessage={errors.email}
            />
          </div>
          <div className="mb-5">
            <InputField
              label="Slaptažodis"
              name="password"
              type="password"
              placeholder="Įveskite slaptažodį"
              value={values.password}
              onChange={handleInputChange}
              errorMessage={errors.password}
            />
          </div>
          {errors.apiError && (
            <p className="text-red-500 text-sm mb-4">{errors.apiError}</p>
          )}
          <div className="flex justify-between items-center mt-12">
            <button
              type="submit"
              className="bg-orange-400 text-white font-semibold py-2 p-12 rounded-lg transition duration-200 w-full"
            >
              Prisijungti prie paskyros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
