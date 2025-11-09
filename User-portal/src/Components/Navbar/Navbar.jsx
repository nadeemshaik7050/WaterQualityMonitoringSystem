import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Global/Button";

const Navbar = () => {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
      isActive
        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo / Title */}
      <h2
        className="text-xl font-bold text-blue-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Water Quality Monitoring
      </h2>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/rankings" className={navLinkClass}>
          Rankings
        </NavLink>
        <NavLink to="/user-profile" className={navLinkClass}>
          Profile
        </NavLink>
      </div>

      {/* Actions (Buttons) */}
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={() => navigate("/make-review")}>
          Make Review
        </Button>

        <Button variant="" onClick={() => navigate("/user-profile")}>
          <FaUser size={18} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
