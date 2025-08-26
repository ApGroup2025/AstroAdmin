import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdPerson, MdCategory, MdAttachMoney, MdInventory, MdLogout } from "react-icons/md";
import { GiCrystalBall } from "react-icons/gi"; 
import logo from "../assets/logo.webp"; 

const navItems = [
  { path: "/", label: "Dashboard", icon: <MdDashboard /> },
  { path: "/users", label: "Users", icon: <MdPerson /> },
  { path: "/astrologers", label: "Astrologers", icon: <GiCrystalBall /> },
  { path: "/categories", label: "Categories", icon: <MdCategory /> },
  { path: "/revenue", label: "Revenue", icon: <MdAttachMoney /> },
  { path: "/products", label: "Products", icon: <MdInventory /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // clear admin token
    navigate("/login"); // redirect to login page
  };

  return (
    <aside className="w-64 bg-amber-100 h-screen p-4 flex flex-col shadow-lg">
      {/* Header Section */}
      <h1 className="text-xl font-bold text-gray-800">Astro Admin</h1>
      
      {/* Logo below the title */}
      <div className="my-4">
        <img src={logo} alt="Astro Admin Logo" className="w-[200px] h-[200px] object-contain mx-auto" />
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-3 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded ${
                    isActive ? "bg-emerald-700 font-bold text-white" : "hover:bg-yellow-200"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 mt-6 p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        <MdLogout className="text-lg" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
