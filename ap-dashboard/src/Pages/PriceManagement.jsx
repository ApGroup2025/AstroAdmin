import React, { useEffect, useState } from "react";
import { FaWallet, FaUsers, FaChartLine, FaSpinner, FaExclamationCircle, FaChevronDown } from "react-icons/fa";

import { getAllWalletTransactions ,getAllUsers} from "../constants/api";

export default function PriceManagement() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
    const [data, setData] = useState([]);
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
    const fetchWallets = async () => {
      try {
        const data = await getAllWalletTransactions();
        setWallets(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };



  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaSpinner className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Loading Wallet Data</h3>
            <p className="text-gray-500">Please wait while we fetch your information...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-100 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FaExclamationCircle className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Oops! Something went wrong</h3>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-left mb-12">
      
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Price Management
          </h1>
       
        </div>

        {/* Stats Cards */}
        {wallets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{data.length}</p>
                </div>
                {/* <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
               
                </div> */}
              </div>
            </div>


         
          </div>
        )}

        {/* Wallet Cards */}
        {wallets.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mb-6 opacity-60">
              <FaWallet className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Wallet Data Available</h3>
            <p className="text-gray-500">There are currently no wallet transactions to display.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {wallets.slice(0, visibleCount).map((wallet, index) => {
                const balance = wallet.walletBalance ?? wallet.balance ?? 0;
                const balanceColor = balance > 20000 ? 'text-emerald-600' : balance > 10000 ? 'text-blue-600' : 'text-amber-600';
                const bgGradient = balance > 20000 ? 'from-emerald-400 to-teal-500' : balance > 10000 ? 'from-blue-400 to-indigo-500' : 'from-amber-400 to-orange-500';
                
                return (
                  <div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: `fadeInUp 0.6s ease-out forwards`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${bgGradient} shadow-lg`}></div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-8 h-8 bg-gradient-to-r ${bgGradient} rounded-lg flex items-center justify-center shadow-lg`}>
                          <FaWallet className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {wallet.fullName || wallet.name }
                    </h3>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 font-medium">Wallet Balance</p>
                      <p className={`text-2xl font-bold ${balanceColor} group-hover:scale-105 transition-transform duration-300`}>
                        ₹{balance.toLocaleString()}
                      </p>
                    </div>
                    
                    {/* <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>ID: {String(index + 1).padStart(3, '0')}</span>
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          Active
                        </span>
                      </div>
                    </div> */}
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
       {visibleCount < wallets.length && (
  <div className="text-center">
    <button
      onClick={loadMore}
      className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl hover:from-orange-600 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50"
    >
      <span className="mr-3 font-semibold">Load More Wallets</span>
      <FaChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
      <div className="ml-3 px-2 py-1 bg-white/20 rounded-lg text-sm">
        {wallets.length - visibleCount} remaining
      </div>
    </button>
  </div>
)}

          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
