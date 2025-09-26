import React, { useEffect, useState } from "react";
import { getAllPoojas } from "../constants/api";

export default function AllPoojas() {
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); 

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllPoojas();
        console.log("Fetched poojas data:", data);
        setPoojas(data);
      } catch (err) {
        setError(err.message || "Something went wrong while loading poojas.");
      } finally {
        setLoading(false);
      }
    };

    fetchPoojas();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading poojas...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 8); // show 8 more
  };

  const handleSeeLess = () => {
    setVisibleCount(8); // reset to initial 8
  };

  const poojasToShow = poojas.slice(0, visibleCount);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">All Poojas</h1>

      {poojas.length === 0 ? (
        <p className="text-gray-500 text-center">No poojas found.</p>
      ) : (
        <>
          <div className="space-y-4">
            {poojasToShow.map((pooja) => (
              <div
                key={pooja._id || pooja.id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col md:flex-row items-start md:items-center"
              >
                {pooja.image && (
                  <img
                    src={pooja.image}
                    alt={pooja.heading || "Pooja"}
                    className="w-full md:w-40 h-32 object-cover rounded-lg mb-3 md:mb-0 md:mr-4"
                  />
                )}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-green-800 mb-1">
                    {pooja.heading || "Unnamed Pooja"}
                  </h2>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {pooja.introduction || "No introduction available"}
                  </p>

                  {pooja.rate && (
                    <p className="text-lg text-green-700 font-semibold mt-1">
                      ₹ {pooja.rate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* See More / See Less buttons */}
          <div className="text-center mt-6 flex justify-center gap-4">
            {visibleCount < poojas.length && (
              <button
                onClick={handleSeeMore}
                className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition"
              >
                See More
              </button>
            )}

            {visibleCount > 8 && (
              <button
                onClick={handleSeeLess}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                See Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
