import React, { useEffect, useState } from "react";
import { getAllAstrologers } from "../constants/api";
import { FaStar, FaComments, FaPhone, FaCheckCircle, FaExclamationTriangle, FaVideo, FaClock, FaCircle ,  FaPhoneAlt, } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

export default function Astrologers() {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedExpertise, setExpandedExpertise] = useState({});
  const [expandedLanguages, setExpandedLanguages] = useState({});


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


  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-32 h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
<h1 className="text-2xl font-semibold mb-8" style={{ color: "#006d4d" }}>
  Our Expert Astrologers
</h1>


          <div className="bg-yellow-100 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
<h1 className="text-2xl font-semibold mb-8" style={{ color: "#006d4d" }}>
  Our Expert Astrologers
</h1>

          <div className="bg-yellow-100 rounded-xl p-6">
            <div className="text-center py-16">
              <FaExclamationTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2" style={{ color: "#006d4d" }}>Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto hover:opacity-90"
                style={{ backgroundColor: "#006d4d" }}
              >
                <MdRefresh className="w-4 h-4 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
  
        <h1 className="text-2xl font-semibold mb-8" style={{ color: "#006d4d" }}>Our Expert Astrologers</h1>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-medium text-sm mb-2" style={{ color: "#006d4d" }}>Total Astrologers</h3>
            <p className="text-2xl font-bold text-orange-500">{astrologers.length}</p>
          </div>
      
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="font-medium text-sm mb-2" style={{ color: "#006d4d" }}>Verified Experts</h3>
            <p className="text-2xl font-bold text-orange-500">
              {astrologers.filter(a => a.isVerified).length}
            </p>
          </div>
        </div>

        {/* Astrologers Section */}
        <div className="bg-yellow-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
  <h2 className="font-semibold text-lg" style={{ color: "#006d4d" }}>
  All Astrologers
</h2>

           
          </div>

          {astrologers.length === 0 ? (
            <div className="text-center py-16">
              <FaExclamationTriangle className="w-24 h-24 mx-auto mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#006d4d" }}>No Astrologers Available</h3>
              <p className="text-gray-600">Please check back later or contact support.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {astrologers.map((astro) => (
                <div key={astro._id} className="bg-white rounded-lg p-5 relative hover:shadow-lg transition-all duration-300">
                  
                
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    {astro.isVerified && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  
                  </div>
                  
                  <div className="flex items-start space-x-4 mb-4">
                  
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100">
                        <img 
                          src={astro.profilePic} 
                          alt={astro.fullName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(astro.fullName)}&background=006d4d&color=fff&size=64`;
                          }}
                        />
                      </div>
                 
                    </div>
                    
                    <div className="flex-1 min-w-0">
                
                      <h3 className="font-semibold text-lg truncate" style={{ color: "#006d4d" }}>{astro.fullName}</h3>
                      <p className="text-xs text-gray-500 truncate">{astro.email}</p>
                      
                  
                
                    </div>
                  </div>
                  
      
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      {/* <FaClock className="w-3 h-3 mr-1" /> */}
                      <span className="font-medium">Experience: {astro.experience}</span>
                    </div>
                    <div className="text-gray-600 capitalize font-medium">
                      {astro.gender}
                    </div>
                  </div>
                  
              
                  {astro.bio && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {astro.bio}
                      </p>
                    </div>
                  )}
                  
                
<div className="mb-4">
  <h4 className="text-xs font-semibold text-gray-700 mb-2">Expertise</h4>
  <div className="flex flex-wrap gap-1">
    {(() => {
      const expertiseArray = Array.isArray(astro.expertise)
        ? astro.expertise
        : typeof astro.expertise === "string"
        ? astro.expertise.split(",").map(e => e.trim())
        : [];

      const isExpanded = expandedExpertise[astro._id];

      return (
        <>
          {(isExpanded ? expertiseArray : expertiseArray.slice(0, 4)).map(
            (exp, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md"
                style={{ backgroundColor: "rgba(0, 109, 77, 0.1)", color: "#006d4d" }}
              >
                {exp}
              </span>
            )
          )}

          {expertiseArray.length > 4 && (
            <button
              onClick={() =>
                setExpandedExpertise(prev => ({
                  ...prev,
                  [astro._id]: !prev[astro._id],
                }))
              }
              className="text-xs text-gray-500 px-2 py-1 cursor-pointer"
            >
              {isExpanded
                ? "Show less"
                : `+${expertiseArray.length - 4} more`}
            </button>
          )}
        </>
      );
    })()}
  </div>
</div>



                  
                  {/* Languages */}
            {/* Languages */}
<div className="mb-4">
  <h4 className="text-xs font-semibold text-gray-700 mb-2">Languages</h4>
  <div className="flex flex-wrap gap-1">
    {(() => {
      const languagesArray = Array.isArray(astro.languages)
        ? astro.languages
        : typeof astro.languages === "string"
        ? astro.languages.split(",").map(l => l.trim())
        : [];

      const isExpanded = expandedLanguages[astro._id];

      return (
        <>
          {(isExpanded ? languagesArray : languagesArray.slice(0, 3)).map(
            (lang, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
              >
                {lang}
              </span>
            )
          )}

          {languagesArray.length > 3 && (
            <button
              onClick={() =>
                setExpandedLanguages(prev => ({
                  ...prev,
                  [astro._id]: !prev[astro._id],
                }))
              }
              className="text-xs text-gray-500 px-2 py-1 cursor-pointer"
            >
              {isExpanded
                ? "Show less"
                : `+${languagesArray.length - 3} more`}
            </button>
          )}
        </>
      );
    })()}
  </div>
</div>

                
           
             <div className="space-y-2">
  <div className="grid grid-cols-3 gap-2">

    <button 
      className={`flex flex-col items-center justify-center text-xs font-medium py-2 px-2 rounded-md transition-colors ${
        astro.available 
          ? 'hover:opacity-90' 
          : 'text-gray-400 bg-gray-100 cursor-not-allowed'
      }`}
      style={astro.available ? { color: "#006d4d", backgroundColor: "rgba(0, 109, 77, 0.1)" } : {}}
      disabled={!astro.available}
    >
      <FaComments className="w-4 h-4 mb-1" />
      <span>₹{astro.ratePerMinuteChat || 'N/A'}</span>
      <span className="text-[10px]">Chat</span>
    </button>


    <button 
      className={`flex flex-col items-center justify-center text-xs font-medium py-2 px-2 rounded-md transition-colors ${
        astro.available 
          ? 'hover:opacity-90' 
          : 'text-gray-400 bg-gray-100 cursor-not-allowed'
      }`}
      style={astro.available ? { color: "#006d4d", backgroundColor: "rgba(0, 109, 77, 0.1)" } : {}}
      disabled={!astro.available}
    >
      {/* <FaPhone className="w-4 h-4 mb-1" /> */}
        <FaPhoneAlt className="w-4 h-4 mb-1" /> 
      <span>₹{astro.ratePerMinuteCall || 'N/A'}</span>
      <span className="text-[10px]">Call</span>
    </button>

    {/* Video Button */}
    <button 
      className={`flex flex-col items-center justify-center text-xs font-medium py-2 px-2 rounded-md transition-colors ${
        astro.available 
          ? 'hover:opacity-90' 
          : 'text-gray-400 bg-gray-100 cursor-not-allowed'
      }`}
      style={astro.available ? { color: "#006d4d", backgroundColor: "rgba(0, 109, 77, 0.1)" } : {}}
      disabled={!astro.available}
    >
      <FaVideo className="w-4 h-4 mb-1" />
      <span>₹{astro.ratePerMinuteVideo || 'N/A'}</span>
      <span className="text-[10px]">Video</span>
    </button>
  </div>
</div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}