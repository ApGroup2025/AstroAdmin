export default function DashboardCards() {
    const stats = [
      { title: "Total number of users", value: "1000 +" },
      { title: "Total number of Astrologers", value: "100 +" },
      { title: "Total Consultations", value: "10,000 +" },
      { title: "Revenue Insights", value: "₹ 1,00,000 +" },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-yellow-100 p-4 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  }
  