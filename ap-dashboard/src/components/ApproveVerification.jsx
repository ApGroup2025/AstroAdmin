import React, { useState, useEffect } from "react";
import { approveVerification } from "../constants/api";

export default function VerificationList({ astrologers, refreshList }) {
  const [loadingId, setLoadingId] = useState(null);

  
  useEffect(() => {
    console.log("Astrologers data:", astrologers);
  }, [astrologers]);

  const handleApprove = async (id) => {
    try {
      setLoadingId(id);
      const res = await approveVerification(id);
      
      console.log("approveVerification response:", res);
      alert(res.message);
      refreshList();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Failed to approve verification");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {astrologers?.map((astro) => (
        <div
          key={astro._id}
          className="flex items-center justify-between border p-2"
        >
          <span>{astro.name}</span>
          <button
            onClick={() => handleApprove(astro._id)}
            disabled={loadingId === astro._id}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            {loadingId === astro._id ? "Approving..." : "Approve"}
          </button>
        </div>
      ))}
    </div>
  );
}
