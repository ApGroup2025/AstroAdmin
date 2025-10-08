import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Astrologers from "./Pages/Astrologers";
import Categories from "./Pages/Categories";
import Revenue from "./Pages/Revenue";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import DashboardCards from "./components/DashboardCards";
import PoojaListing from "./Pages/PoojaListing";
import PriceManagement from "./Pages/PriceManagement";
import AstrologerStatus from "./Pages/AstrologerStatus";
import VerificationRequest from "./Pages/VerificationRequest";
import BannerListing from "./Pages/BannerListing";
import UploadBanner from "./components/UploadBanner";
import UploadVideos from "./components/UploadVideos";
import PoojaForm from "./components/PoojaForm";
import BlogList from "./Pages/BlogList";
import ApproveVerification from "./components/ApproveVerification";
import KYCAction from "./components/KYCAction";
import BlogCreate from "./Pages/BlogCreate";
import NoticePage from "./Pages/Notice";
import Notice from "./Pages/Notice";
import NoticeCreate from "./Pages/NoticeCreate";
import AdminTickets from "./Pages/AdminTickets";
import Notification from "./Pages/Notification";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("auth");
  return auth ? children : <Navigate to="/login" />;
}


function Layout() {
  return (
    <div className="flex">
    
      <Sidebar />


      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet /> 
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

    
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} /> 
        <Route path="users" element={<Users />} />
        <Route path="astrologers" element={<Astrologers />} />
        <Route path="categories" element={<Categories />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="products" element={<Products />} />
        <Route path="pooja-listing" element={<PoojaListing />} />
        <Route path="price-management" element={<PriceManagement />} />
        <Route path="astrologer-status" element={<AstrologerStatus />} />
        <Route path="verification-request" element={<VerificationRequest />} />
        <Route path="banner-listing" element={<BannerListing />} />
        <Route path="upload-banner" element={<UploadBanner />} />
        <Route path="upload-videos" element={<UploadVideos />} />
        <Route path="pooja-form" element={<PoojaForm />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="approve-verification" element={<ApproveVerification />} />
  
       <Route path="blog-create" element={<BlogCreate />} />
      <Route path="notice" element={<Notice />} />
      <Route path="notice-create" element={<NoticeCreate />} />
      <Route path="admin-tickets" element={<AdminTickets />} />
      <Route path="notification" element={<Notification />} />
       <Route path="Kyc" element={<KYCAction />} />
      </Route>
    </Routes>
  );
}
