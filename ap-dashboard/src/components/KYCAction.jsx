
import React, { useState, useEffect } from "react";
import { approveOrRejectKYC } from "../constants/api";

const KYCAction = ({ astrologer }) => {
  const astrologerId =
    astrologer?._id || astrologer?.astrologerId || astrologer?.astrologerId?._id;

  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔍 KYCAction Mounted — astrologerId:", astrologerId);
  }, [astrologerId]);

  const handleAction = async (status) => {
    console.log("⚡ Action triggered:", status);
    console.log("🆔 Astrologer ID:", astrologerId);
    console.log("🗒️ Remarks:", remarks);

    if (!astrologerId) {
      console.error("❌ Aborting action: astrologer ID is missing.");
      alert("Astrologer ID is missing! Cannot proceed.");
      return;
    }

    try {
      setLoading(true);
      const data = await approveOrRejectKYC(astrologerId, status, remarks);
      console.log("✅ API Response:", data);
      alert(data.message);
    } catch (err) {
      console.error(
        "❌ API Error:",
        err.response?.data?.error || err.message || "Something went wrong!"
      );
      alert(err.response?.data?.error || "Failed to update KYC");
    } finally {
      setLoading(false);
      console.log("✅ Action completed for:", status);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <textarea
        placeholder="Add remarks (optional)"
        value={remarks}
        onChange={(e) => {
          setRemarks(e.target.value);
          console.log("Remarks updated:", e.target.value);
        }}
        style={{
          width: "100%",
          minHeight: "60px",
          borderRadius: "8px",
          padding: "8px",
        }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => handleAction("approved")}
          disabled={loading}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Approve"}
        </button>
        <button
          onClick={() => handleAction("rejected")}
          disabled={loading}
          style={{
            backgroundColor: "#F44336",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default KYCAction;

