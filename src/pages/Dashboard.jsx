import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar (Always visible on medium+ screens) */}
      <div className="hidden md:block w-60 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (Overlay Design) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-4 transition-transform duration-300">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Mobile Menu Button (V to open, ^ to close) */}
      <button
        className={`fixed left-4 z-50 p-2 text-gray-600 md:hidden rounded shadow flex items-center 
          ${isSidebarOpen ? "top-2 left-48" : "top-16"}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <AiOutlineUp size={28} /> : <AiOutlineDown size={28} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
