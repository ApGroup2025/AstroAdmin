// AdminTickets.jsx
import React, { useEffect, useState } from "react";
import { fetchAllTickets, updateTicketStatus } from "../constants/api";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingTicketId, setUpdatingTicketId] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    try {
      const res = await fetchAllTickets();
      console.log(res, "tickets");
      setTickets(res);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ticket) => {
    setUpdatingTicketId(ticket.ticketId);
    setUpdateMessage("");
    setError("");

    try {
      // Send ticketId (not _id) to match backend route parameter
      const data = await updateTicketStatus(ticket.ticketId, ticket.status);
      console.log("update tickets", data);

      // Update the tickets list with the returned ticket data
      setTickets((prev) =>
        prev.map((t) =>
          t.ticketId === ticket.ticketId ? data.ticket : t
        )
      );

      setUpdateMessage(`Ticket ${ticket.ticketId} updated successfully.`);

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (err) {
      setError(err.message || `Failed to update ticket ${ticket.ticketId}`);
    } finally {
      setUpdatingTicketId(null);
    }
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  if (loading) return <p className="text-center mt-5">Loading tickets...</p>;
  if (error && tickets.length === 0) {
    return <p className="text-center text-red-600 mt-5">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#006d4d]">
        Support Tickets
      </h1>

      {updateMessage && (
        <p className="text-center text-green-600 mb-5 font-semibold">
          {updateMessage}
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 mb-5 font-semibold">{error}</p>
      )}

      {tickets.length === 0 ? (
        <p className="text-center text-gray-600">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Ticket ID:{" "}
                  <span className="font-semibold text-gray-800">
                    {ticket.ticketId}
                  </span>
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {ticket.astrologerId?.fullName }
                </h2>

                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {ticket.astrologerId?.email }
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Phone:</span>{" "}
                  {ticket.astrologerId?.phone}
                </p>

                <div className="bg-gray-100 p-3 rounded-xl mb-3">
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-medium">Category:</span>{" "}
                    {ticket.category}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Description:</span>{" "}
                    {ticket.description}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket.ticketId, e.target.value)
                    }
                    disabled={updatingTicketId === ticket.ticketId}
                    className={`flex-1 px-3 py-1 text-sm font-semibold rounded-full border-2 cursor-pointer ${
                      ticket.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : ticket.status === "Resolved"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-blue-100 text-blue-700 border-blue-300"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => handleStatusUpdate(ticket)}
                    disabled={updatingTicketId === ticket.ticketId}
                    className="px-4 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {updatingTicketId === ticket.ticketId
                      ? "Updating..."
                      : "Update"}
                  </button>
                </div>

                <span className="text-xs text-gray-500 block text-right">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTickets;