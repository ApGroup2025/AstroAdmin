import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { loginAdmin } from "../constants/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const data = await loginAdmin(email, password);
  
      if (data?.token) {
        // Save only admin token
        localStorage.setItem("auth", data.token);
  
        // Redirect to dashboard
        navigate("/");
      } else {
        throw new Error("Login failed: No token received");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* Logo + text at the top */}
      <div className="flex flex-col items-center mt-8">
        <img src={logo} alt="Astro Admin Logo" className="w-40 h-60 mb-2" />
        <p className="text-gray-600">प्रार्थना से परामर्श तक ✨</p>
      </div>

      {/* Centered Login Box */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Admin
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
