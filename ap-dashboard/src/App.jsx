import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Astrologers from "./Pages/Astrologers";
import Categories from "./Pages/Categories";
import Revenue from "./Pages/Revenue";
import Products from "./Pages/Products";
import Login from "./Pages/Login";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("auth");
  return auth ? children : <Navigate to="/login" />;
}

// Layout wrapper for all private routes
function Layout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet /> {/* 👈 Renders nested routes */}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} /> {/* default = "/" */}
        <Route path="users" element={<Users />} />
        <Route path="astrologers" element={<Astrologers />} />
        <Route path="categories" element={<Categories />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}
