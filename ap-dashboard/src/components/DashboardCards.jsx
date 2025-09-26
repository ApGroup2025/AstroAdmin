import React from "react";
import { FaStar, FaPhone, FaCommentDots } from "react-icons/fa";

export default function DashboardCards() {
  const stats = [
    { title: "Total number of users", value: "1000 +" },
    { title: "Total number of Astrologers", value: "100 +" },
    { title: "Total Consultations", value: "10,000 +" },
    { title: "Revenue Insights", value: "₹ 1,00,000 +" },
  ];

  const astrologers = [
    { name: "Astro Rajesh", skills: "Tarot, Psychic", rating: 5, chats: 2800, calls: 2800 },
    { name: "Astro Rajesh", skills: "Tarot, Psychic", rating: 5, chats: 2800, calls: 2800 },
    { name: "Astro Rajesh", skills: "Tarot, Psychic", rating: 5, chats: 2800, calls: 2800 },
  ];

  const tickets = [
    { id: "#11001", issue: "Issue With Payment", time: "2 hours ago" },
    { id: "#11001", issue: "Issue With Payment", time: "2 hours ago" },
    { id: "#11001", issue: "Issue With Payment", time: "2 hours ago" },
  ];

  const refunds = [
    { id: "#11001", amount: "₹ 100", time: "2 hours ago" },
    { id: "#11001", amount: "₹ 100", time: "2 hours ago" },
    { id: "#11001", amount: "₹ 100", time: "2 hours ago" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Stats */}
      <h2 className="text-2xl font-semibold text-gray-800">Summary Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-yellow-50 p-4 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {/* Best Performing Astrologers */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Best Performing Astrologers</h3>
          {astrologers.map((astro, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt={astro.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{astro.name}</p>
                  <p className="text-xs text-gray-500">{astro.skills}</p>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: astro.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-gray-600 flex gap-4">
                <div className="flex items-center gap-1">
                  <FaCommentDots /> {astro.chats}
                </div>
                <div className="flex items-center gap-1">
                  <FaPhone /> {astro.calls}
                </div>
              </div>
            </div>
          ))}
          <button className="text-sm text-blue-600 mt-2">View All</button>
        </div>

        {/* Recent Support Tickets */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Support Tickets</h3>
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-lg shadow mb-3 flex justify-between"
            >
              <div>
                <p className="text-sm font-semibold">
                  Ticket {ticket.id}
                </p>
                <p className="text-xs text-gray-600">{ticket.issue}</p>
              </div>
              <span className="text-xs text-gray-500">{ticket.time}</span>
            </div>
          ))}
        </div>

        {/* Refund Requests */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Refund Requests</h3>
          {refunds.map((refund, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-lg shadow mb-3 flex justify-between"
            >
              <div>
                <p className="text-sm font-semibold">
                  Ticket {refund.id}
                </p>
                <p className="text-xs text-gray-600">{refund.amount}</p>
              </div>
              <span className="text-xs text-gray-500">{refund.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
