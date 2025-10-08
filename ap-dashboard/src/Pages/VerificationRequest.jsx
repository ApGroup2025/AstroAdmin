


import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";
import {
  getAllVerificationRequests,
  approveVerification,
  rejectVerification, 
} from "../constants/api";

export default function VerificationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loadingId, setLoadingId] = useState(null);

  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");
  const [rejectAstroId, setRejectAstroId] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await getAllVerificationRequests();
      console.log("Verification API Response:", response);
      setRequests(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load verification requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

 
  const handleApprove = async (astroId) => {
    try {
      setLoadingId(astroId);
      await approveVerification(astroId);
      console.log("Verification approved!");
      fetchRequests();
    } catch (err) {
      console.error("Approval error:", err);
    } finally {
      setLoadingId(null);
    }
  };

 
  const handleReject = async () => {
    if (!rejectAstroId) return;
    try {
      setLoadingId(rejectAstroId);
      await rejectVerification({
        id: rejectAstroId,
        notes: rejectNotes,
      });
      console.log("Verification rejected!");
      setShowRejectModal(false);
      setRejectNotes("");
      setRejectAstroId(null);
      fetchRequests();
    } catch (err) {
      console.error("Rejection error:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FaClock className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "approved":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-orange-100 text-orange-800`;
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true;
    return request.verificationStatus === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
   
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#006d4d" }}>
              Verification Requests
            </h1>
            <p className="text-gray-600 mt-1">
              Manage astrologer verification requests
            </p>
          </div>

         
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[ "pending", "approved", "rejected","all",].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === "all"
                  ? ` (${requests.length})`
                  : ` (${
                      requests.filter((r) => r.verificationStatus === status)
                        .length
                    })`}
              </button>
            ))}
          </div>
        </div>
      </div>

     
      <div className="grid gap-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center text-gray-500">
            No requests found
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                   
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                        {request.astrologerId?.profilePic ? (
                          <img
                            src={request.astrologerId.profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <span className="text-gray-800 font-medium">
                        {request.astrologerId?.fullName || "Astrologer"}
                      </span>
                    </div>

                  
                    {request.astrologerId && (
                      <div className="grid grid-cols-1 gap-2 mb-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaEnvelope className="w-4 h-4" />
                          <span className="text-sm">
                            {request.astrologerId.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaPhoneAlt className="w-4 h-4" />
                          <span className="text-sm">
                            {request.astrologerId.phone}
                          </span>
                        </div>
                      </div>
                    )}

                
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>
                          Requested: {formatDate(request.requestedAt)}
                        </span>
                      </div>
                      {request.reviewedAt && (
                        <div className="flex items-center gap-1">
                          <FaCheckCircle className="w-4 h-4" />
                          <span>
                            Reviewed: {formatDate(request.reviewedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                 
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.verificationStatus)}
                      <span
                        className={getStatusBadge(request.verificationStatus)}
                      >
                        {request.verificationStatus.toUpperCase()}
                      </span>
                    </div>

                 
                    <div className="flex gap-2">
                      {request.verificationStatus === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(request.astrologerId?._id)
                            }
                            disabled={loadingId === request.astrologerId?._id}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            {loadingId === request.astrologerId?._id
                              ? "Approving..."
                              : "Approve"}
                          </button>
                          <button
                            onClick={() => {
                              setRejectAstroId(request.astrologerId?._id);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

            
                {request.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Notes:</span>{" "}
                      {request.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Reject Verification</h2>
            <textarea
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              placeholder="Enter rejection notes..."
              className="w-full border rounded-md p-2 mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={loadingId === rejectAstroId}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                {loadingId === rejectAstroId ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

