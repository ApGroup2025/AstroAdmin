import React, { useState } from "react";
import { approveOrRejectKYC } from "../constants/api";

const KYCAction = ({ astrologerId, refreshList }) => {
  const [loading, setLoading] = useState(false);

  const handleKYC = async (status, remarks = "") => {
    try {
      setLoading(true);
      const res = await approveOrRejectKYC(astrologerId, status, remarks);
      console.log("KYC Response:", res);
      alert(res.message);
      refreshList();
    } catch (err) {
      console.error("KYC Action Error:", err);
      alert("Failed to update KYC");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleKYC("approved")}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Approve
      </button>
      <button
        onClick={() => handleKYC("rejected", "Documents not clear")}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Reject
      </button>
    </div>
  );
};

export default KYCAction;
