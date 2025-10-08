import React, { useState } from "react";
import { createNotice } from "../constants/api";

const NoticeCreate = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!title || !message) {
      setErrorMsg("Title and Message are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    if (file) formData.append("file", file);

    try {
      const data = await createNotice(formData);

      if (data.success) {
        setSuccessMsg(data.message);
        setTitle("");
        setMessage("");
        setFile(null);
      } else {
        setErrorMsg(data.message || "Failed to create notice");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#006d4d]">
        Create Notice
      </h2>

      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded h-32 resize-none"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-[#006d4d] text-white p-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Notice"}
        </button>
      </form>
    </div>
  );
};

export default NoticeCreate;
