
import axios from "axios";

const BASE_URL ="http://localhost:3000/api";


// export async function loginAdmin(email, password) {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Login failed");
//     }

//     return data; 
//   } catch (err) {
//     throw err;
//   }
// }
export async function loginAdmin(email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/login`,
      { email, password }, 
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    return response.data; 
  } catch (error) {

    const message =
      error.response?.data?.message || "Login failed, please try again";
    throw new Error(message);
  }
}



export const getAllUsers = async () => {
  const token = localStorage.getItem("auth");
  console.log("Token from localStorage:", token);

  if (!token) {
    console.error(" No token found in localStorage");
    throw new Error("No auth token found. Please login again.");
  }

  try {
    const res = await axios.get(`${BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(" Successfully fetched users:", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(" API Error Response:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.warn("401 - Invalid or expired token.Consider redirecting to login.");
        localStorage.removeItem("auth"); 
      }
    } else {
      console.error(" Network or other error:", error.message);
    }
    throw error;
  }
};
export const getAllAstrologers = async () => {
  try {
    const token = localStorage.getItem("auth"); 
    console.log("🔑 Token:", token);

    const res = await axios.get(`${BASE_URL}/admin/astrologers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;  // ✅ only return the array
  } catch (err) {
    console.error("❌ API Error:", err.response ? err.response.data : err.message);
    throw err;
  }
};
// src/constants/api.js
// export const getAllPoojas = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/admin/all-pooja`);
//     if (!res.ok) throw new Error("Failed to fetch poojas");
//     const data = await res.json();
//     console.log("API Response:", data); // Debug log
//     // Ensure we return an array
//     return Array.isArray(data) ? data : data.poojas || [];
//   } catch (err) {
//     console.error("API Error:", err);
//     throw err;
//   }
// };
export const getAllPoojas = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/all-pooja`);

    if (!res.ok) {
      throw new Error(`Failed to fetch poojas: ${res.status} ${res.statusText}`);
    }

    const apiResponse = await res.json();


    console.log("API Response:", apiResponse);


    const poojas = apiResponse.data;

    
    return Array.isArray(poojas) ? poojas : [];
  } catch (err) {
    console.error("API Error in getAllPoojas:", err);
    throw err; 
  }
};


export const getAllWalletTransactions = async () => {
  try {
    const token = localStorage.getItem("auth");
    console.log(" Token:", token);

    const res = await axios.get(`${BASE_URL}/admin/wallets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(" Full API Respondfdfse:", res);         
    console.log(" Response Data:", res.data);          

    return res.data; 
  } catch (err) {
    console.error(
      "Wallet API Error:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};
export const getAllAstrologerStatuses = async () => {
  try {
    const token = localStorage.getItem("auth");
    console.log("Token:", token);

    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("Login required to fetch astrologer statuses.");
    }

    const res = await axios.get(`${BASE_URL}/admin/astrologer/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Full API Response:", res);
    console.log("Response Data:", res.data);

    return res.data;
  } catch (err) {
    console.error(
      "Astrologer Status API Error:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};
export const getAllVerificationRequests = async () => {
  try {
    const token = localStorage.getItem("auth"); 
    const res = await axios.get(`${BASE_URL}/admin/verification-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching verification requests:", error);
    throw error;
  }
};
export const getAllBanners = async () => {
  try {
    const token = localStorage.getItem("auth"); 
    const res = await axios.get(`${BASE_URL}/admin/all-banners`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

export const uploadBanners = async (formData) => {
  try {
    const token = localStorage.getItem("auth");
    const res = await axios.post(`${BASE_URL}/admin/banners/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading banners:", error);
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const token = localStorage.getItem("auth");
    const res = await axios.post(
      `${BASE_URL}/admin/banner/delete`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};


export const uploadVideos = async (formData) => {
  try {
    const token = localStorage.getItem("auth"); 
    const res = await axios.post(`${BASE_URL}/admin/videos/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading videos:", error);
    throw error;
  }
};

export const addPooja = async (formData) => {
  try {
    const token = localStorage.getItem("auth"); 
    const res = await axios.post(`${BASE_URL}/admin/post/pooja`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};

export const approveVerification = async (id) => {
  try {
    const token = localStorage.getItem("auth");
    const res = await axios.post(
      `${BASE_URL}/admin/verification/approve`,
      { id }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error approving verification:", error);
    throw error;
  }
};
export const getAllBlogs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/blogs/all`);
    return res.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
export const rejectVerification = async ({ id, notes }) => {
  const token = localStorage.getItem("auth");
  const res = await axios.post(
    `${BASE_URL}/verification/reject`,
    { id, notes },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const approveOrRejectKYC = async (id, status, remarks = "") => {
  try {
    const token = localStorage.getItem("auth");

    const res = await axios.patch(
      `${BASE_URL}/admin/kyc/approve-or-reject`,
      { id, status, remarks },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (error) {
    console.error("KYC API Error:", error.response?.data || error.message);
    throw error;
  }
};
export const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem("auth"); 
    console.log("🟢 Using token:", token);
    console.log("🟢 Deleting blog ID:", id);

    const response = await axios.delete(`${BASE_URL}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(" Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error(" API deleteBlog error:", error.response?.data || error);
    throw error.response?.data || { message: "Error deleting blog" };
  }
};
export const createBlog = async (formData) => {
  try {
    const token = localStorage.getItem("auth");
    const res = await axios.post(`${BASE_URL}/blogs/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};