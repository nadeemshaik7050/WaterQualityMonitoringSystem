import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for icons

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER (fixed on top) */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-800">Rewards Portal</h1>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-sm">
        <Sidebar />
      </aside>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              User Management
            </Link>
            <Link
              to="/rewards"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rewards Management
            </Link>
            <Link
              to="/logout"
              className="block text-red-600 font-medium hover:text-red-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Logout
            </Link>
          </nav>
        </div>
      </div>

      {/* BACKDROP (for mobile menu) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 mt-16 p-6 transition-all duration-300">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <div className="md:ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
