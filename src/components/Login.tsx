"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Login() {
  interface UserInfo {
    id: string;
    email: string;
    password: string;
  }

  const [idUser, setIdUser] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [infoLogin, setInfoLogin] = useState<UserInfo[]>([]);

  useEffect(() => {
    localStorage.setItem("api", "http://localhost:3001/api/");

    fetch(`${localStorage.getItem("api")}users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInfoLogin(data);
      })
      .catch((error) => {
        console.error("Error fetching login:", error);
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    for (let i = 0; i < infoLogin.length; i++) {
      if (infoLogin[i].email === email && infoLogin[i].password === password) {
        document.location.href = "/home";
        setIdUser(infoLogin[i].id);
        localStorage.setItem("idActualUser", infoLogin[i].id.toString());
        break;
      } else {
        alert("Email ou mot de passe incorrect");
        break;
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <a href="/">
        <Image
            className="w-full max-w-lg lg:mx-auto"
            src="/isishare.png"
            width={300}
            height={300}
            alt=""
          />
        </a>
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-xl font-medium">Connectez-vous !</p>

          <div>
            <label className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Adresse mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label className="sr-only">Mot de passe</label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white bg-dark-blue"
          >
            Connexion
          </button>

          <p className="text-center text-sm text-dark-gray">
            Pas de compte ?{" "}
            <a className="underline" href="/signup">
              Inscription
            </a>
          </p>
        </form>
        <h2 className="color-red"></h2>
      </div>
    </div>
  );
}
