import React, { useEffect, useState } from "react";
import { FaSearch, FaUsers, FaWifi, FaExclamationCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAllAstrologerStatuses, getAllAstrologers } from "../constants/api";

export default function AstrologerStatusPage() {
  const [statuses, setStatuses] = useState([]);
  const [astrologers, setAstrologers] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterActive, setFilterActive] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatuses = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await getAllAstrologerStatuses();
      console.log("Astrologer status",data)
      if (data.astrologers && Array.isArray(data.astrologers)) {
        setStatuses(data.astrologers);
        setFilteredStatuses(data.astrologers);
      } else {
        setStatuses([]);
        setFilteredStatuses([]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllAstrologers();
        console.log("Astrologers API Response:", data);
        setAstrologers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching astrologers:", err);
        setError("Failed to load astrologers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = statuses;
    
    // Filter by live status
    if (filterStatus === "live") filtered = filtered.filter(a => a.isLive);
    else if (filterStatus === "offline") filtered = filtered.filter(a => !a.isLive);
    
    // Filter by active status
    if (filterActive === "active") filtered = filtered.filter(a => a.isActive);
    else if (filterActive === "inactive") filtered = filtered.filter(a => !a.isActive);
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(a => a.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    setFilteredStatuses(filtered);
  }, [statuses, searchTerm, filterStatus, filterActive]);

  const liveCount = statuses.filter(a => a.isLive).length;
  const offlineCount = statuses.filter(a => !a.isLive).length;
  const activeCount = statuses.filter(a => a.isActive).length;
  const inactiveCount = statuses.filter(a => !a.isActive).length;

  return (
    <div className="min-h-screen bg-white-50">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold flex items-center gap-3"
                style={{ color: "#006d4d" }}
              >
                Astrologer Status
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <FaUsers className="h-8 w-8" style={{ color: '#006d4d' }} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Astrologers</p>
                <p className="text-2xl font-bold text-gray-900">{astrologers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <FaWifi className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Currently Live</p>
                <p className="text-2xl font-bold text-green-600">{liveCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <FaWifi className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-red-600">{offlineCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <FaCheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <FaTimesCircle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-orange-600">{inactiveCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search astrologers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
              />
            </div>

            {/* Live Status Filter */}
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
              >
                <option value="all">All Live Status</option>
                <option value="live">Live Only</option>
                <option value="offline">Offline Only</option>
              </select>
            </div>

            {/* Active Status Filter */}
            <div className="sm:w-48">
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors duration-200"
              >
                <option value="all">All Active Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div>
          {filteredStatuses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No astrologers found</h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== "all" || filterActive !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No astrologer data available at the moment."
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Live Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStatuses.map((astrologer, index) => (
                    <tr key={astrologer._id || astrologer.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                              {astrologer.profilePic ? (
                                <img
                                  src={astrologer.profilePic}
                                  alt={astrologer.fullName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div
                                  className="h-10 w-10 flex items-center justify-center"
                                  style={{
                                    background: "linear-gradient(45deg,rgb(234, 102, 8),rgb(214, 243, 234))"
                                  }}
                                >
                                  <span className="text-white font-semibold text-sm">
                                    {astrologer.fullName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {astrologer.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          astrologer.isLive
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${astrologer.isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                          {astrologer.isLive ? 'Live' : 'Offline'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          astrologer.isActive
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-orange-100 text-orange-800 border border-orange-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${astrologer.isActive ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                          {astrologer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}