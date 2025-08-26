import { FaBell, FaSearch } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow rounded-xl">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-1/3">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none flex-1"
        />
      </div>

      {/* Profile + Notification */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Aditya Pareek</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
