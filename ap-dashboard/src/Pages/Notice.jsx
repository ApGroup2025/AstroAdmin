import React, { useEffect, useState } from "react";
import { fetchNotices, deleteNotice } from "../constants/api";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getNotices();
  }, []);

  const getNotices = async () => {
    try {
      const res = await fetchNotices();
      if (res.success) {
        setNotices(res.data);
      } else {
        setError("Failed to load notices");
      }
    } catch (err) {
      setError("Failed to fetch notices from server");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await deleteNotice(id);
      if (res.success) {
        setSuccess("Notice deleted successfully");
        setNotices((prev) => prev.filter((n) => n._id !== id));
      } else {
        setError(res.message || "Failed to delete notice");
      }
    } catch (err) {
      setError("Unauthorized or server error");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading notices...</p>;
  if (error) return <p className="text-center text-red-600 mt-5">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1
        className="text-3xl font-bold text-center mb-10"
        style={{ color: "#006d4d" }}
      >
        Notices
      </h1>

      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      {notices.length === 0 ? (
        <p className="text-center text-gray-600">No notices available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col bg-white"
            >
              {notice.image && (
                <img
                  src={notice.image}
                  alt={notice.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-800">
                {notice.title}
              </h2>
              <p className="text-gray-600 mt-2 flex-grow">{notice.message}</p>

              <button
                onClick={() => handleDelete(notice._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition mt-4 self-end"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notice;
