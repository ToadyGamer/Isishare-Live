"use client";
import { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const apiUrl = localStorage.getItem("api");
      if (!apiUrl) {
        throw new Error(
          "L'URL de l'API n'est pas définie dans le stockage local."
        );
      }
      // hash password
      const hash = require("object-hash");
      const hashedPassword = hash(password);

      // Construct the URL for the request
      const url = `${apiUrl}users/insert/name,email,password/"${encodeURIComponent(
        name
      )}","${encodeURIComponent(email)}","${encodeURIComponent(
        hashedPassword
      )}"`;

      // Perform the fetch request
      const response = await fetch(url, {
        method: "GET", // Use GET as per your URL format
      });

      if (!response.ok) {
        // Display response text in case of error for more details
        const errorText = await response.text();
        throw new Error(
          `Erreur de réseau: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Utilisateur ajouté :", data);
      toast.success("Inscription réussie !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mx-auto max-w-lg">
        <a href="/">
          <Image
            src="/isishare.png"
            className="w-full max-w-lg lg:mx-auto"
            width={300}
            height={300}
            alt="Logo"
          />
        </a>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-xl font-medium">Inscrivez-vous !</p>

          <div>
            <label htmlFor="name" className="sr-only">
              Nom
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Nom"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Adresse mail"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Mot de passe"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmer mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Confirmer mot de passe"
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white bg-dark-blue"
          >
            Inscription
          </button>

          <p className="text-center text-sm text-dark-gray">
            Déjà un compte ?{" "}
            <a className="underline" href="/login">
              Connexion
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}