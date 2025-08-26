// src/api/adminApi.js

const BASE_URL ="http://localhost:3000/api";

// Admin login API
export async function loginAdmin(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data; // should contain token or user info
  } catch (err) {
    throw err;
  }
}
