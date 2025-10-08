import React, { useState } from "react";
import { createNotification } from "../constants/api";

const Notification = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseColor, setResponseColor] = useState("red"); 

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResponseMsg("");

  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      setResponseMsg("Admin not logged in. Please login first.");
      setResponseColor("red");
      setLoading(false);
      return;
    }

  
    const payload = {
      title,
      message,
      all: allUsers, 
    };
    if (!allUsers) {
      payload.userId = userId;
    }

    const data = await createNotification(payload);
    console.log("data", data);
     setResponseMsg(`${data.message}`);
    setResponseColor("green");

    setTitle("");
    setMessage("");
    setUserId("");
    setAllUsers(false);
  } catch (err) {
    console.error(err);
    setResponseMsg(err.response?.data?.message || err.message || "Something went wrong");
    setResponseColor("red");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Send Notification</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={allUsers}
            onChange={(e) => setAllUsers(e.target.checked)}
            style={styles.checkbox}
          />
          Send to all users
        </label>

        {!allUsers && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              required
              style={styles.input}
            />
          </div>
        )}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            required
            style={styles.textarea}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>

      {responseMsg && (
        <p style={{ ...styles.response, color: responseColor }}>{responseMsg}</p>
      )}
    </div>
  );
};

const styles = {
  container: {

    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#006d4d",
    fontSize:'25px',
    fontWeight:600

  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxLabel: {
    marginBottom: "15px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#555",
  },
  checkbox: {
    width: "18px",
    height: "18px",
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  },
  button: {
    padding: "12px",
    backgroundColor: "#006d4d",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  response: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "600",
  },
};

export default Notification;
