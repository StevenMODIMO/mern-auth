import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "motion"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setEmail("");
      setPassword("");
      setLoading(false);
    } else {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/");
    }
  };

  return (
    <main className="mx-auto w-[50%]">
      <h1 className="text-center font-bold text-4xl">Get started now</h1>
      <form
        className="flex flex-col w-[80%] mx-auto mt-28 gap-4"
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
      >
        <label className="font-bold">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="outline-none bg-gray-100 p-2 text-xl"
          placeholder="johndoe@gmail.com"
        />
        <label className="font-bold">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="outline-none bg-gray-100 p-2 text-xl"
          placeholder="Red$%3d9jf"
        />
        <button className="font-semibold text-lg bg-purple-300 w-fit mx-auto rounded p-2">
          Sign Up
        </button>
        {error && (
          <div className="text-center text-red-500 font-semibold p-4 bg-purple-200 rounded absolute top-28 right-8">
            {error}
          </div>
        )}
        {!loading && (
          <div className="bg-purple-300 text-purple-900 animate-spin w-fit mx-auto"></div>
        )}
      </form>
    </main>
  );
}
