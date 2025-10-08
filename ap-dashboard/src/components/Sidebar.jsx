import { NavLink, useNavigate, Outlet } from "react-router-dom";
import {
  MdDashboard, MdPerson, MdImage, MdLogout, MdVerified,
  MdApproval, MdAttachMoney, MdInventory, MdArticle,MdCreate,MdCloudUpload,MdNotifications,MdConfirmationNumber,MdChecklist
} from "react-icons/md";
import { GiCrystalBall ,GiPrayer} from "react-icons/gi";
import logo from "../assets/logo.webp";
import { FaBell, FaRupeeSign } from "react-icons/fa";

const navItems = [
  { path: "/", label: "Dashboard", icon: <MdDashboard /> },
  { path: "/users", label: "Users", icon: <MdPerson /> },
  { path: "/astrologers", label: "Astrologers", icon: <GiCrystalBall /> },
{ path: "/blog-create", label: "Blog Create", icon: <MdCreate /> },

  { path: "/revenue", label: "Revenue", icon: <MdAttachMoney /> },
  { path: "/blog", label: "Blogs", icon: <MdArticle /> },
  { path: "/products", label: "Products", icon: <MdInventory /> },
  { path: "/pooja-listing", label: "Pooja-Listing", icon: <FaBell /> },
{ path: "/pooja-form", label: "Pooja Form", icon: <GiPrayer /> },

  { path: "/price-management", label: "Price Management", icon: <FaRupeeSign /> },
  { path: "/astrologer-status", label: "Astrologer Status", icon: <MdVerified /> },
  { path: "/verification-request", label: "Verification Request", icon: <MdApproval /> },
  { path: "/banner-listing", label: "Banner Listing", icon: <MdImage /> },
 { path: "/upload-banner", label: "Banner Upload", icon: <MdCloudUpload /> },
{ path: "/notice", label: "Notice", icon: <MdNotifications /> },
{ path: "/notice-create", label: "Notice-Create", icon: <MdNotifications /> },
{ path: "/admin-tickets", label: "Admin-Tickets", icon: <MdConfirmationNumber /> },
{ path: "/notification", label: "Notification", icon: <MdNotifications /> },


   
];


function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-amber-100 flex flex-col shadow-lg z-50 overflow-y-auto
      [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
     
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Astro Admin</h1>
      </div>

   
      <div className="px-4 mb-4">
        <img src={logo} alt="Astro Admin Logo" className="w-[150px] h-[150px] object-contain mx-auto" />
      </div>

 
      <nav className="flex-1 px-2">
        <ul className="space-y-2 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 mx-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? "bg-emerald-700 font-bold text-white shadow-md" 
                      : "hover:bg-yellow-200 hover:shadow-sm"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

   
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 shadow-md"
        >
          <MdLogout className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}


export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <Sidebar />
      
 
      <main className="flex-1 ml-64 overflow-auto" style={{ marginLeft: '13rem' }}>
        <div className="p-6">
         
        </div>
      </main>
    </div>
  );
}


export function LayoutWrapper() {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <Sidebar />
      
  
      <main className="flex-1 ml-64 overflow-auto" style={{ marginLeft: '13rem' }}>
        <div className="p-6">
   
      
        </div>
      </main>
    </div>
  );
}