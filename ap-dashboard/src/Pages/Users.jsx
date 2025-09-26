import React, { useEffect, useState } from "react";
import { getAllUsers } from "../constants/api";
import { FaEye, FaTrash } from "react-icons/fa";

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleRows, setVisibleRows] = useState(10);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getAllUsers();
        setData(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setVisibleRows((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const loadMore = () => {
    setIsScrolling(true);
    setTimeout(() => {
      setVisibleRows((prev) => prev + 10);
      setIsScrolling(false);
    }, 100);
  };

  // 🔁 filteredData must be declared BEFORE it's used below
  const filteredData = data.filter((user) => {
    const matchesSearch = searchTerm === ""
      ? true
      : user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toString().includes(searchTerm);

    const userDate = new Date(user.createdAt);
    const startDate = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
    const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

    const matchesDate =
      (!startDate && !endDate) ||
      (startDate && !endDate && userDate >= startDate) ||
      (!startDate && endDate && userDate <= endDate) ||
      (startDate && endDate && userDate >= startDate && userDate <= endDate);

    return matchesSearch && matchesDate;
  });

  // Handle individual checkbox toggle
  const toggleUser = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredData.slice(0, visibleRows).length) {
      setSelectedUsers(new Set());
    } else {
      const allIds = filteredData.slice(0, visibleRows).map((user) => user._id);
      setSelectedUsers(new Set(allIds));
    }
  };

  // Check if all visible rows are selected
  const allVisibleSelected =
    filteredData.slice(0, visibleRows).length > 0 &&
    filteredData.slice(0, visibleRows).every((user) => selectedUsers.has(user._id));

  // Export data to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Registration Date"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((user) => {
        const name = `"${(user.fullName || user.name || "").replace(/"/g, '""')}"`;
        const email = `"${(user.email || "").replace(/"/g, '""')}"`;
        const phone = `"${(user.phone || "").toString().replace(/"/g, '""')}"`;
        const date = `"${new Date(user.createdAt).toLocaleDateString()}"`;
        return [name, email, phone, date].join(",");
      }),
    ].join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `users-export-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Search Bar and Export Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Users List</h2>

        {/* Search & Export Row */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

       {/* Export Button */}
<button
  onClick={exportToCSV}
  className="px-4 py-3 text-white rounded-lg transition whitespace-nowrap hover:opacity-90"
  style={{ backgroundColor: "#006d4d" }}
>
  Export to CSV
</button>

        </div>
      </div>

      {!loading && !error && (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md bg-yellow-100 border border-yellow-300">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-[#FCC30E] text-white text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAll}
                      className="w-5 h-5 text-[#FCC30E] border-gray-300 rounded focus:ring-[#FCC30E]"
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Reg. Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, visibleRows).map((user, index) => {
                  const isSelected = selectedUsers.has(user._id);
                  return (
                    <tr
                      key={user._id || index}
                      className={`${
                        index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                      } border-t hover:bg-yellow-100 transition-all cursor-pointer ${
                        isSelected ? "bg-[#FCC30E1A] hover:bg-[#FCC30E25]" : ""
                      }`}
                      onClick={() => toggleUser(user._id)}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleUser(user._id)}
                          className="w-4 h-4 text-[#FCC30E] border-gray-300 rounded focus:ring-[#FCC30E]"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-4 py-3 text-left">{user.fullName || user.name}</td>
                      <td className="px-4 py-3 text-left">{user.email}</td>
                      <td className="px-4 py-3 text-left">{user.phone}</td>
                      <td className="px-4 py-3 text-left">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {visibleRows < filteredData.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMore}
                disabled={isScrolling}
                className="px-6 py-2 bg-[#FCC30E] text-white rounded-lg hover:bg-[#e6b00d] disabled:opacity-50 transition"
              >
                {isScrolling ? "Loading..." : "View all"}
              </button>
            </div>
          )}

          {selectedUsers.size > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: <strong>{selectedUsers.size}</strong> user(s)
            </div>
          )}
        </>
      )}

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCC30E]"></div>
          <span className="ml-2 text-gray-700">Loading users...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-500 text-center py-8">No users found.</p>
      )}
    </div>
  );
}