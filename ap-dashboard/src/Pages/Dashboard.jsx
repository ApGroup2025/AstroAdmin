import React, { useEffect, useState } from "react";
import { getAllAstrologers, getAllAstrologerStatuses, getAllUsers, getAllWalletTransactions } from "../constants/api";
import { FaStar, FaPhoneAlt, FaExclamationTriangle } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

export default function Astrologers() {
  const [astrologers, setAstrologers] = useState([]);
  const [users, setUsers] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState(null);
  const [loadingAstros, setLoadingAstros] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorAstros, setErrorAstros] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorWallets, setErrorWallets] = useState(null);
  const [expandedExpertise, setExpandedExpertise] = useState({});
  const [expandedLanguages, setExpandedLanguages] = useState({});
  const [showAstroAll, setShowAstroAll] = useState(false);
  const [showWalletsAll, setShowWalletsAll] = useState(false);
  const [statuses, setStatuses] = useState([]);

const [showStatusAll, setShowStatusAll] = useState(false);


  const fetchStatuses = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await getAllAstrologerStatuses();
      console.log("Astrologer status",data)
      if (data.astrologers && Array.isArray(data.astrologers)) {
        setStatuses(data.astrologers);
        // setFilteredStatuses(data.astrologers);
      } else {
        setStatuses([]);
        setFilteredStatuses([]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);
  useEffect(() => {
    const fetchAstros = async () => {
      try {
        setLoadingAstros(true);
        const data = await getAllAstrologers();
        console.log("Best performaing",data)
        setAstrologers(data);
      } catch (err) {
        setErrorAstros("Failed to load astrologers.");
      } finally {
        setLoadingAstros(false);
      }
    };
    fetchAstros();
  }, []);


  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoadingUsers(true);
        const res = await getAllUsers();
        setUsers(res?.data || []);
      } catch (err) {
        setErrorUsers("Failed to load users.");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsersData();
  }, []);

  
  useEffect(() => {
    const fetchWalletsData = async () => {
      try {
        setLoadingWallets(true);
        const data = await getAllWalletTransactions();
        console.log(data,"Wallet balnce")
        setWallets(data);
      } catch (err) {
        setErrorWallets("Failed to load wallets.");
      } finally {
        setLoadingWallets(false);
      }
    };
    fetchWalletsData();
  }, []);

  if (loadingAstros && loadingUsers && loadingWallets) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (errorAstros || errorUsers || errorWallets) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-2" />
        <p>{errorAstros || errorUsers || errorWallets}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-green-700 text-white rounded"
        >
          <MdRefresh className="inline mr-1" /> Reload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8"
          style={{ color: "#006d4d" }}
        >
          Summary Statistics
        </h1>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: "rgba(239, 188, 85, 0.2)" }}
          >
            <h3 className="font-medium text-sm mb-2" style={{ color: "#006d4d" }}>
              Total Astrologers
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-orange-500">
              {astrologers.length}+
            </p>
          </div>

          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: "rgba(239, 188, 85, 0.2)" }}
          >
            <h3 className="font-medium text-sm mb-2" style={{ color: "#006d4d" }}>
              Verified Experts
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-orange-500">
              {astrologers.filter((a) => a.isVerified).length}+
            </p>
          </div>

          <div
            className="p-4 rounded-2xl sm:col-span-2 lg:col-span-1"
            style={{ backgroundColor: "rgba(239, 188, 85, 0.2)" }}
          >
            <h3 className="font-medium text-sm mb-2" style={{ color: "#006d4d" }}>
              Total number of Users
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-orange-500">
              {users.length}+
            </p>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      
  <div
  className="p-4 rounded-2xl shadow"
  style={{ backgroundColor: "rgba(252, 195, 14, 0.4)" }}
>
  <h3
    className="text-base sm:text-lg font-semibold mb-4"
    style={{ color: "#006d4d" }}
  >
    Best Performing Astrologers
  </h3>
  <div className="space-y-3">
    {(showAstroAll ? astrologers : astrologers.slice(0, 3)).map((astro) => {
      const expertiseList = astro.expertise || [];
      const languageList = astro.languages || [];

      return (
        <div key={astro._id} className="bg-white p-3 rounded shadow">
          <p className="font-medium" style={{ color: "#006d4d" }}>
            {astro.fullName}
          </p>

         
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
         
            <p className="text-xs" style={{ color: "#006d4d", opacity: 0.7 }}>
              <strong>Expertise:</strong>{" "}
              {expandedExpertise[astro._id]
                ? expertiseList.join(", ")
                : expertiseList.slice(0, 2).join(", ")}
              {expertiseList.length > 2 && !expandedExpertise[astro._id] && (
                <button
                  onClick={() =>
                    setExpandedExpertise((prev) => ({
                      ...prev,
                      [astro._id]: true,
                    }))
                  }
                  className="ml-1 text-[11px] font-medium"
                  style={{ color: "#006d4d" }}
                >
                  +{expertiseList.length - 2} more
                </button>
              )}
            </p>

          
            <p className="text-xs" style={{ color: "#006d4d", opacity: 0.7 }}>
              <strong>Languages:</strong>{" "}
              {expandedLanguages[astro._id]
                ? languageList.join(", ")
                : languageList.slice(0, 2).join(", ")}
              {languageList.length > 2 && !expandedLanguages[astro._id] && (
                <button
                  onClick={() =>
                    setExpandedLanguages((prev) => ({
                      ...prev,
                      [astro._id]: true,
                    }))
                  }
                  className="ml-1 text-[11px] font-medium"
                  style={{ color: "#006d4d" }}
                >
                  +{languageList.length - 2} more
                </button>
              )}
            </p>

    
            <p className="text-xs" style={{ color: "#006d4d", opacity: 0.7 }}>
              <strong>Gender:</strong> {astro.gender}
            </p>

            
            <p className="text-xs" style={{ color: "#006d4d", opacity: 0.7 }}>
              <strong>Experience:</strong> {astro.experience}
            </p>
          </div>
        </div>
      );
    })}
  </div>

  {astrologers.length > 3 && (
    <button
      onClick={() => setShowAstroAll(!showAstroAll)}
      className="mt-3 text-sm hover:underline"
      style={{ color: "#006d4d" }}
    >
      {showAstroAll ? "View Less" : "View All"}
    </button>
  )}
</div>


       
          <div
            className="p-4 rounded-2xl shadow"
            style={{ backgroundColor: "rgba(252, 195, 14, 0.4)" }}
          >
            <h3
              className="text-base sm:text-lg font-semibold mb-4"
              style={{ color: "#006d4d" }}
            >
              Recent Wallet Balances
            </h3>
            <div className="space-y-3">
              {(showWalletsAll ? wallets : wallets.slice(0, 4)).map((wallet) => (
                <div key={wallet._id} className="bg-white p-3 rounded shadow">
                  <p
                    className="font-medium text-sm"
                    style={{ color: "#006d4d" }}
                  >
                    {wallet.fullName}
                  </p>
               <p className="text-xs" style={{ color: "#006d4d" }}>
  Wallet Balance: ₹{wallet.walletBalance?.toFixed(2)}
</p>

                </div>
              ))}
            </div>
            {wallets.length > 4 && (
              <button
                onClick={() => setShowWalletsAll(!showWalletsAll)}
                className="mt-3 text-sm hover:underline"
                style={{ color: "#006d4d" }}
              >
                {showWalletsAll ? "View Less" : "View All"}
              </button>
            )}
          </div>



<div
  className="p-4 rounded-2xl shadow"
  style={{ backgroundColor: "rgba(252, 195, 14, 0.4)" }}
>
  <h3
    className="text-base sm:text-lg font-semibold mb-4"
    style={{ color: "#006d4d" }}
  >
    Astrologer Status
  </h3>

  {loading ? (
    <p className="text-sm" style={{ color: "#006d4d" }}>Loading...</p>
  ) : error ? (
    <p className="text-sm text-red-600">{error}</p>
  ) : statuses.length === 0 ? (
    <p className="text-sm" style={{ color: "#006d4d" }}>No astrologers found</p>
  ) : (
    <div className="space-y-3">
      {(showStatusAll ? statuses : statuses.slice(0, 4)).map((status, i) => (
        <div key={i} className="bg-white p-3 rounded shadow flex items-center space-x-3">
          <img
            src={status.profilePic}
            alt={status.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: "#006d4d" }}>
              {status.fullName}
            </p>
            <p className="text-xs" style={{ color: "#006d4d" }}>
              <strong>Active:</strong> {status.isActive ? "Yes" : "No"}
            </p>
            <p className="text-xs" style={{ color: "#006d4d" }}>
              <strong>Live:</strong> {status.isLive ? "Yes" : "No"}
            </p>
          </div>
        </div>
      ))}

      {/* View All Button */}
{statuses.length > 4 && (
  <button
    onClick={() => setShowStatusAll(!showStatusAll)}
    className="mt-3 text-sm font-semibold text-[#006d4d]"
  >
    {showStatusAll ? "View Less" : "View All"}
  </button>
)}


    </div>
  )}
</div>





        </div>
      </div>
    </div>
  );
}
